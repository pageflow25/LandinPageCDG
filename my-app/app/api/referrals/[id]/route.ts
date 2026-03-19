import { NextRequest, NextResponse } from "next/server";
import { canUpdateReferralStatus, canDeleteReferral, canManageUsers, getAuthContext } from "@/lib/auth";
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

    if (!auth.user) {
        return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
    }

    const { id } = await context.params;
    const body = await request.json().catch(() => null);

    if (!body) {
        return NextResponse.json({ error: "Payload inválido." }, { status: 400 });
    }

    const supabase = await createServerSupabaseClient();

    // Atualizar comercial (admin only)
    if ("comercialId" in body) {
        if (!canManageUsers(auth.role)) {
            return NextResponse.json({ error: "Sem permissão para alterar o comercial." }, { status: 403 });
        }

        const { data: referral, error: findError } = await supabase
            .from("referrals")
            .select("id")
            .eq("id", id)
            .single();

        if (findError || !referral) {
            return NextResponse.json({ error: "Indicação não encontrada." }, { status: 404 });
        }

        const { error: updateError } = await supabase
            .from("referrals")
            .update({ comercial_profile_id: body.comercialId ?? null })
            .eq("id", id);

        if (updateError) {
            return NextResponse.json(
                { error: "Falha ao atualizar comercial.", details: updateError.message },
                { status: 500 },
            );
        }

        return NextResponse.json({
            success: true,
            message: "Comercial atualizado com sucesso.",
        });
    }

    // Atualizar status (admin + comercial)
    if (!canUpdateReferralStatus(auth.role)) {
        return NextResponse.json({ error: "Sem permissão para atualizar status da indicação." }, { status: 403 });
    }

    const parsed = updateReferralStatusSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json(
            { error: "Payload inválido.", details: parsed.error.flatten() },
            { status: 400 },
        );
    }

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

export async function DELETE(
    _request: NextRequest,
    context: { params: Promise<{ id: string }> },
) {
    const auth = await getAuthContext();

    if (!auth.isConfigured) {
        return NextResponse.json({ error: auth.warning || "Supabase não configurado." }, { status: 503 });
    }

    if (!auth.user || !canDeleteReferral(auth.role)) {
        return NextResponse.json({ error: "Sem permissão para excluir indicações." }, { status: 403 });
    }

    const { id } = await context.params;
    const supabase = await createServerSupabaseClient();

    const { data: referral, error: findError } = await supabase
        .from("referrals")
        .select("id")
        .eq("id", id)
        .single();

    if (findError || !referral) {
        return NextResponse.json({ error: "Indicação não encontrada." }, { status: 404 });
    }

    const { error: deleteError } = await supabase
        .from("referrals")
        .delete()
        .eq("id", id);

    if (deleteError) {
        return NextResponse.json(
            { error: "Falha ao excluir indicação.", details: deleteError.message },
            { status: 500 },
        );
    }

    return NextResponse.json({
        success: true,
        message: "Indicação excluída com sucesso.",
    });
}
