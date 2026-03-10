import { NextRequest, NextResponse } from "next/server";
import { canManageUsers, getAuthContext } from "@/lib/auth";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { updateUserSchema } from "@/schemas/user-management.schema";
import { logAdminUserAction } from "@/services/admin-user-audit.service";

export const runtime = "nodejs";

interface ProfileRow {
    id: string;
    full_name: string | null;
    email: string;
    role: string;
    is_active: boolean;
}

export async function PATCH(
    request: NextRequest,
    context: { params: Promise<{ id: string }> },
) {
    const auth = await getAuthContext();

    if (!auth.user || !canManageUsers(auth.role)) {
        return NextResponse.json({ error: "Sem permissão para editar usuários." }, { status: 403 });
    }

    const { id } = await context.params;
    const body = await request.json().catch(() => null);
    const parsed = updateUserSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json(
            { error: "Payload inválido.", details: parsed.error.flatten() },
            { status: 400 },
        );
    }

    const admin = createAdminSupabaseClient();
    const updates = parsed.data;

    const { data: previousProfile, error: previousProfileError } = await admin
        .from("profiles")
        .select("id, full_name, email, role, is_active")
        .eq("id", id)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .single() as unknown as { data: ProfileRow | null; error: any };

    if (previousProfileError || !previousProfile) {
        return NextResponse.json({ error: "Usuário não encontrado." }, { status: 404 });
    }

    const profilePayload: Record<string, unknown> = {};

    if (typeof updates.fullName === "string") {
        profilePayload.full_name = updates.fullName;
    }

    if (typeof updates.role === "string") {
        profilePayload.role = updates.role;
    }

    if (typeof updates.isActive === "boolean") {
        profilePayload.is_active = updates.isActive;
    }

    if (Object.keys(profilePayload).length > 0) {
        const { error: profileUpdateError } = await admin
            .from("profiles")
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .update(profilePayload as unknown as never)
            .eq("id", id);

        if (profileUpdateError) {
            return NextResponse.json({ error: profileUpdateError.message }, { status: 500 });
        }
    }

    if (updates.role || typeof updates.isActive === "boolean") {
        const { error: authUpdateError } = await admin.auth.admin.updateUserById(id, {
            app_metadata: {
                role: updates.role || previousProfile.role,
                disabled:
                    typeof updates.isActive === "boolean"
                        ? !updates.isActive
                        : !previousProfile.is_active,
            },
            user_metadata: {
                role: updates.role || previousProfile.role,
                full_name: updates.fullName || previousProfile.full_name,
            },
            ban_duration: updates.isActive === false ? "876000h" : "none",
        });

        if (authUpdateError) {
            return NextResponse.json({ error: authUpdateError.message }, { status: 500 });
        }
    }

    await logAdminUserAction({
        targetUserId: id,
        actionType:
            typeof updates.isActive === "boolean"
                ? updates.isActive
                    ? "reactivate_user"
                    : "deactivate_user"
                : "update_user",
        performedBy: auth.user.id,
        performedByEmail: auth.user.email,
        payload: {
            before: previousProfile,
            after: {
                ...previousProfile,
                full_name: updates.fullName ?? previousProfile.full_name,
                role: updates.role ?? previousProfile.role,
                is_active:
                    typeof updates.isActive === "boolean"
                        ? updates.isActive
                        : previousProfile.is_active,
            },
        },
    });

    return NextResponse.json({ success: true });
}
