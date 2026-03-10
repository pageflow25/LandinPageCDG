import { NextRequest, NextResponse } from "next/server";
import { canUpdateReferralStatus, getAuthContext } from "@/lib/auth";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { updateReferralStatusSchema } from "@/schemas/referral-status.schema";

export const runtime = "nodejs";

export async function PATCH(
    request: NextRequest,
    context: { params: Promise<{ id: string }> },
) {
    const auth = await getAuthContext();

    if (!auth.isConfigured) {
        return NextResponse.json({ error: auth.warning || "Supabase não configurado." }, { status: 503 });
    }

    if (!auth.user || !canUpdateReferralStatus(auth.role)) {
        return NextResponse.json({ error: "Sem permissão para atualizar status da indicação." }, { status: 403 });
    }

    const { id } = await context.params;
    const body = await request.json().catch(() => null);
    const parsed = updateReferralStatusSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json(
            { error: "Payload inválido.", details: parsed.error.flatten() },
            { status: 400 },
        );
    }

    const supabase = await createServerSupabaseClient();
    const { data: currentReferral, error: currentReferralError } = await supabase
        .from("referrals")
        .select("id, status")
        .eq("id", id)
        .single();

    if (currentReferralError || !currentReferral) {
        return NextResponse.json({ error: "Indicação não encontrada." }, { status: 404 });
    }

    if (currentReferral.status === parsed.data.status) {
        return NextResponse.json({
            success: true,
            message: "Status já estava atualizado.",
            referral: currentReferral,
        });
    }

    const { data: updatedReferral, error: updateError } = await supabase
        .from("referrals")
        .update({ status: parsed.data.status })
        .eq("id", id)
        .select("id, status, updated_at")
        .single();

    if (updateError) {
        return NextResponse.json(
            { error: "Falha ao atualizar status da indicação.", details: updateError.message },
            { status: 500 },
        );
    }

    const { error: historyError } = await supabase.from("referral_status_history").insert({
        referral_id: id,
        old_status: currentReferral.status,
        new_status: parsed.data.status,
        note: parsed.data.note,
        changed_by: auth.user.id,
        changed_by_email: auth.user.email?.toLowerCase() || null,
    });

    if (historyError) {
        console.error("[REFERRAL_STATUS_HISTORY] Falha ao registrar histórico:", historyError);
    }

    return NextResponse.json({
        success: true,
        message: "Status atualizado com sucesso.",
        referral: updatedReferral,
    });
}
