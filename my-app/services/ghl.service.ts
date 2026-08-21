import { env, isGhlConfigured } from "@/lib/env";
export { isGhlConfigured } from "@/lib/env";

/**
 * Service — GoHighLevel (GHL / LeadConnector)
 *
 * Responsabilidade única: criar/atualizar o contato do indicado no GHL
 * e abrir uma oportunidade no pipeline "Funil Indicação", estágio
 * "Nova indicação".
 */

const GHL_API_BASE = "https://services.leadconnectorhq.com";
const GHL_API_VERSION = "2021-07-28";

const GHL_PIPELINE_ID = "u2A2h2HrPH3p31Gqn6qm";
const GHL_STAGE_NOVA_INDICACAO = "24e55c28-db85-4e0e-9af6-12dd4fd3c96f";

const GHL_CUSTOM_FIELD_IDS = {
    pessoaQueIndicouNome: "7iPCUqH056Gkr30jhlWV",
    pessoaQueIndicouEmail: "BnmdvaEgHutqWHSmOErx",
    pessoaQueIndicouVendedor: "8SVVtGQDtSowEksX9fW2",
} as const;

function ghlHeaders() {
    return {
        Authorization: `Bearer ${env.ghlApiKey}`,
        Version: GHL_API_VERSION,
        "Content-Type": "application/json",
        Accept: "application/json",
    };
}

function splitName(fullName: string): { firstName: string; lastName: string } {
    const parts = fullName.trim().split(/\s+/);
    const firstName = parts[0] ?? fullName;
    const lastName = parts.slice(1).join(" ");
    return { firstName, lastName };
}

function toE164BR(phone: string): string {
    const digits = phone.replace(/\D/g, "");
    if (digits.startsWith("55")) {
        return `+${digits}`;
    }
    return `+55${digits}`;
}

export interface GhlSyncInput {
    referredName: string;
    referredPhone: string;
    affiliateName: string;
    affiliateEmail: string;
    comercialName: string | null;
}

export interface GhlSyncResult {
    contactId: string;
    opportunityId: string;
}

async function upsertContact(input: GhlSyncInput): Promise<string> {
    const { firstName, lastName } = splitName(input.referredName);

    const response = await fetch(`${GHL_API_BASE}/contacts/upsert`, {
        method: "POST",
        headers: ghlHeaders(),
        body: JSON.stringify({
            locationId: env.ghlLocationId,
            firstName,
            lastName,
            phone: toE164BR(input.referredPhone),
            source: "landing-page",
            customFields: [
                {
                    id: GHL_CUSTOM_FIELD_IDS.pessoaQueIndicouNome,
                    value: input.affiliateName,
                },
                {
                    id: GHL_CUSTOM_FIELD_IDS.pessoaQueIndicouEmail,
                    value: input.affiliateEmail,
                },
                {
                    id: GHL_CUSTOM_FIELD_IDS.pessoaQueIndicouVendedor,
                    value: input.comercialName ?? "",
                },
            ],
        }),
    });

    if (!response.ok) {
        const body = await response.text();
        throw new Error(`GHL contacts/upsert respondeu ${response.status}: ${body}`);
    }

    const data = (await response.json()) as { contact: { id: string } };
    return data.contact.id;
}

async function createOpportunity(
    contactId: string,
    referredName: string,
): Promise<string> {
    const response = await fetch(`${GHL_API_BASE}/opportunities/`, {
        method: "POST",
        headers: ghlHeaders(),
        body: JSON.stringify({
            locationId: env.ghlLocationId,
            pipelineId: GHL_PIPELINE_ID,
            pipelineStageId: GHL_STAGE_NOVA_INDICACAO,
            name: `Indicação - ${referredName}`,
            status: "open",
            contactId,
        }),
    });

    if (!response.ok) {
        const body = await response.text();
        throw new Error(`GHL opportunities respondeu ${response.status}: ${body}`);
    }

    const data = (await response.json()) as { opportunity: { id: string } };
    return data.opportunity.id;
}

export async function syncReferralToGhl(
    input: GhlSyncInput,
): Promise<GhlSyncResult> {
    const contactId = await upsertContact(input);
    const opportunityId = await createOpportunity(contactId, input.referredName);

    return { contactId, opportunityId };
}
