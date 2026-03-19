import { cache } from "react";
import type { User } from "@supabase/supabase-js";
import { env, getSupabaseConfigMessage, isSupabaseConfigured } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type AppRole = "admin" | "comercial" | "supervisor" | "indicator";

export interface AuthContext {
    user: User | null;
    role: AppRole | null;
    isConfigured: boolean;
    warning?: string;
}

function normalizeRole(value: unknown): AppRole | null {
    if (value === "admin") {
        return "admin";
    }

    if (value === "comercial") {
        return "comercial";
    }

    if (value === "supervisor") {
        return "supervisor";
    }

    if (value === "indicator") {
        return "indicator";
    }

    return null;
}

export function getRoleLabel(role: AppRole | null): string {
    if (role === "admin") {
        return "Administrador";
    }

    if (role === "comercial") {
        return "Comercial";
    }

    if (role === "supervisor") {
        return "Supervisor";
    }

    if (role === "indicator") {
        return "Indicador";
    }

    return "Não autenticado";
}

export function canViewAllReferrals(role: AppRole | null): boolean {
    return role === "admin" || role === "comercial" || role === "supervisor";
}

export function canManageUsers(role: AppRole | null): boolean {
    return role === "admin";
}

export function canUpdateReferralStatus(role: AppRole | null): boolean {
    return role === "admin" || role === "comercial";
}

export function canViewReferralHistory(role: AppRole | null): boolean {
    return role === "admin";
}

export function canDeleteReferral(role: AppRole | null): boolean {
    return role === "admin";
}

export function resolveUserRole(user: User | null): AppRole | null {
    if (!user) {
        return null;
    }

    const metadataRole =
        normalizeRole(user.app_metadata?.role) ||
        normalizeRole(user.user_metadata?.role);

    if (metadataRole) {
        return metadataRole;
    }

    const email = user.email?.toLowerCase();

    if (email && env.defaultAdminEmails.includes(email)) {
        return "admin";
    }

    return "indicator";
}

export const getAuthContext = cache(async (): Promise<AuthContext> => {
    if (!isSupabaseConfigured()) {
        return {
            user: null,
            role: null,
            isConfigured: false,
            warning: getSupabaseConfigMessage(),
        };
    }

    const supabase = await createServerSupabaseClient();
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error) {
        return {
            user: null,
            role: null,
            isConfigured: true,
            warning: error.message,
        };
    }

    return {
        user,
        role: resolveUserRole(user),
        isConfigured: true,
    };
});
