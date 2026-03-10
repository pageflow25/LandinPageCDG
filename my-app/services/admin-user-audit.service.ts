import { createAdminSupabaseClient } from "@/lib/supabase/admin";

interface LogAdminUserActionParams {
    targetUserId: string;
    actionType: "create_user" | "update_user" | "reset_password" | "deactivate_user" | "reactivate_user";
    payload?: Record<string, unknown>;
    performedBy: string;
    performedByEmail?: string | null;
}

export async function logAdminUserAction({
    targetUserId,
    actionType,
    payload,
    performedBy,
    performedByEmail,
}: LogAdminUserActionParams) {
    const admin = createAdminSupabaseClient();

    const { error } = await admin.from("admin_user_actions").insert({
        target_user_id: targetUserId,
        action_type: actionType,
        payload: payload || null,
        performed_by: performedBy,
        performed_by_email: performedByEmail?.toLowerCase() || null,
    });

    if (error) {
        console.error("[ADMIN_USER_AUDIT] Falha ao registrar auditoria:", error);
    }
}
