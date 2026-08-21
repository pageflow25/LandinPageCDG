import { NextResponse } from "next/server";
import { canManageUsers, getAuthContext } from "@/lib/auth";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { isGhlConfigured, syncReferralToGhl } from "@/services/ghl.service";

export const runtime = "nodejs";

/**
 * POST /api/referrals/sync-ghl
 *
 * Sincroniza com o GHL todas as indicações ainda não integradas
 * (ghl_synced_at IS NULL). Uso administrativo, disparado pelo botão
 * "Sincronizar todos" no dashboard.
 */
export async function POST() {
    const auth = await getAuthContext();

    if (!auth.isConfigured) {
        return NextResponse.json({ error: auth.warning || "Supabase não configurado." }, { status: 503 });
    }

    if (!auth.user || !canManageUsers(auth.role)) {
        return NextResponse.json({ error: "Sem permissão para sincronizar com o CRM." }, { status: 403 });
    }

    if (!isGhlConfigured()) {
        return NextResponse.json({ error: "Integração com o GHL não está configurada." }, { status: 503 });
    }

    const admin = createAdminSupabaseClient();
    const { data: pending, error } = await admin
        .from("referrals")
        .select(
            `id, affiliate_name, affiliate_email, referred_name, referred_phone,
            comercial:profiles!comercial_profile_id(full_name)`,
        )
        .is("ghl_synced_at", null)
        .order("created_at", { ascending: true });

    if (error) {
        return NextResponse.json(
            { error: "Falha ao buscar indicações pendentes.", details: error.message },
            { status: 500 },
        );
    }

    const items = pending ?? [];
    let synced = 0;
    const failures: { id: string; error: string }[] = [];

    for (const item of items) {
        const comercial = item.comercial as { full_name: string | null } | null;

        try {
            const { contactId, opportunityId } = await syncReferralToGhl({
                referredName: item.referred_name,
                referredPhone: item.referred_phone,
                affiliateName: item.affiliate_name,
                affiliateEmail: item.affiliate_email,
                comercialName: comercial?.full_name ?? null,
            });

            await admin
                .from("referrals")
                .update({
                    ghl_contact_id: contactId,
                    ghl_opportunity_id: opportunityId,
                    ghl_synced_at: new Date().toISOString(),
                })
                .eq("id", item.id);

            synced += 1;
        } catch (syncError) {
            failures.push({
                id: item.id,
                error: syncError instanceof Error ? syncError.message : "Erro desconhecido",
            });
        }
    }

    return NextResponse.json({
        success: true,
        total: items.length,
        synced,
        failed: failures.length,
        failures,
    });
}
