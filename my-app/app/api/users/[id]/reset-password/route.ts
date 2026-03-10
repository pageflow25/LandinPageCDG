import { NextRequest, NextResponse } from "next/server";
import { canManageUsers, getAuthContext } from "@/lib/auth";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { resetUserPasswordSchema } from "@/schemas/user-management.schema";
import { logAdminUserAction } from "@/services/admin-user-audit.service";

export const runtime = "nodejs";

export async function POST(
    request: NextRequest,
    context: { params: Promise<{ id: string }> },
) {
    const auth = await getAuthContext();

    if (!auth.user || !canManageUsers(auth.role)) {
        return NextResponse.json({ error: "Sem permissão para resetar senha." }, { status: 403 });
    }

    const { id } = await context.params;
    const body = await request.json().catch(() => null);
    const parsed = resetUserPasswordSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json(
            { error: "Payload inválido.", details: parsed.error.flatten() },
            { status: 400 },
        );
    }

    const admin = createAdminSupabaseClient();
    const { error } = await admin.auth.admin.updateUserById(id, {
        password: parsed.data.newPassword,
    });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await logAdminUserAction({
        targetUserId: id,
        actionType: "reset_password",
        performedBy: auth.user.id,
        performedByEmail: auth.user.email,
        payload: {
            changedAt: new Date().toISOString(),
        },
    });

    return NextResponse.json({ success: true });
}
