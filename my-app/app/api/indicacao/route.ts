import { after, NextRequest, NextResponse } from "next/server";
import { indicacaoSchema } from "@/schemas/indicacao.schema";
// import { enviarIndicacao } from "@/services/google-sheets.service";
import { enviarEmailsIndicacao } from "@/services/email.service";
import { isGhlConfigured, syncReferralToGhl } from "@/services/ghl.service";
import { persistReferral } from "@/services/referral-persistence.service";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

/**
 * API Route - Indicação
 *
 * POST /api/indicacao
 *
 * Responsabilidades:
 * - Validar payload com Zod
 * - Persistir a indicação no Supabase
 * - Disparar e-mails de agradecimento e notificação via SMTP
 * - Retornar sucesso ou erro
 *
 * Espelho para o Google Sheets fica desativado por padrão — ver nota abaixo.
 */

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validação com schema Zod
        const result = indicacaoSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { error: "Dados inválidos", details: result.error.flatten() },
                { status: 400 },
            );
        }

        const persistence = await persistReferral(result.data).catch((error) => {
            console.error("[SUPABASE] Erro ao persistir indicação:", error);

            return {
                mode: "failed" as const,
                warning:
                    error instanceof Error
                        ? error.message
                        : "Falha ao persistir a indicação no CRM.",
            };
        });

        // Espelho para o Google Sheets DESATIVADO em 2026 — parceria que consumia
        // esses dados foi encerrada. Código mantido em services/google-sheets.service.ts
        // para reativação futura; basta descomentar a linha abaixo (e o import no topo).
        // await enviarIndicacao(result.data);

        // Agenda o envio após a resposta, sem depender de promise solta.
        after(async () => {
            try {
                await enviarEmailsIndicacao(result.data);
            } catch (error) {
                console.error("[EMAIL] Erro ao disparar e-mails:", error);
            }
        });

        if (persistence.mode === "supabase" && isGhlConfigured()) {
            const referralId = persistence.referralId;

            after(async () => {
                try {
                    const { contactId, opportunityId } = await syncReferralToGhl({
                        referredName: result.data.indicado.nome,
                        referredPhone: result.data.indicado.telefone,
                        affiliateName: result.data.afiliado.nome,
                        affiliateEmail: result.data.afiliado.email,
                        comercialName: result.data.comercialNome ?? null,
                    });

                    const admin = createAdminSupabaseClient();
                    await admin
                        .from("referrals")
                        .update({
                            ghl_contact_id: contactId,
                            ghl_opportunity_id: opportunityId,
                            ghl_synced_at: new Date().toISOString(),
                        })
                        .eq("id", referralId);
                } catch (error) {
                    console.error("[GHL] Erro ao enviar indicação:", error);
                }
            });
        }

        return NextResponse.json({
            success: true,
            message: "Indicação registrada com sucesso",
            persistence,
        });
    } catch (error) {
        console.error("[INDICAÇÃO] Erro ao processar:", error);

        return NextResponse.json(
            { error: "Erro interno ao processar indicação" },
            { status: 500 },
        );
    }
}
