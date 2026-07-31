import {
    canManageUsers,
    canViewAllReferrals,
    canViewReferralHistory,
    getAuthContext,
    getRoleLabel,
} from "@/lib/auth";
import type { AppRole } from "@/lib/auth";
import { getSupabaseConfigMessage } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export interface ReferralRecord {
    id: string;
    affiliate_name: string;
    affiliate_email: string;
    referred_name: string;
    referred_email: string | null;
    referred_phone: string;
    status: string;
    created_at: string;
    comercial_profile_id: string | null;
    comercial_name: string | null;
    comercial_email: string | null;
}

export interface ProfileRecord {
    id: string;
    full_name: string | null;
    email: string;
    role: string;
    is_active: boolean;
    created_at: string;
}

export interface DashboardSnapshot {
    warning?: string;
    role: AppRole | null;
    roleLabel: string;
    userEmail?: string;
    totalReferrals: number;
    pendingReferrals: number;
    contactedReferrals: number;
    convertedReferrals: number;
    rejectedReferrals: number;
    usersCount: number;
    recentReferrals: ReferralRecord[];
}

export interface ReferralStatusHistoryRecord {
    id: string;
    referral_id: string;
    old_status: string | null;
    new_status: string;
    note: string | null;
    changed_by: string;
    changed_by_email: string | null;
    changed_at: string;
}

function sortByCreatedAt(items: ReferralRecord[]): ReferralRecord[] {
    return [...items].sort(
        (current, next) =>
            new Date(next.created_at).getTime() -
            new Date(current.created_at).getTime(),
    );
}

export async function getDashboardSnapshot(): Promise<DashboardSnapshot> {
    const auth = await getAuthContext();

    if (!auth.isConfigured) {
        return {
            warning: auth.warning || getSupabaseConfigMessage(),
            role: auth.role,
            roleLabel: "Modo preparação",
            totalReferrals: 0,
            pendingReferrals: 0,
            contactedReferrals: 0,
            convertedReferrals: 0,
            rejectedReferrals: 0,
            usersCount: 0,
            recentReferrals: [],
        };
    }

    if (!auth.user) {
        return {
            warning: "Faça login para visualizar o CRM.",
            role: auth.role,
            roleLabel: "Não autenticado",
            totalReferrals: 0,
            pendingReferrals: 0,
            contactedReferrals: 0,
            convertedReferrals: 0,
            rejectedReferrals: 0,
            usersCount: 0,
            recentReferrals: [],
        };
    }

    const supabase = await createServerSupabaseClient();
    let referralsQuery = supabase
        .from("referrals")
        .select(
            `id, affiliate_name, affiliate_email, referred_name, referred_email, referred_phone, status, created_at, comercial_profile_id,
            comercial:profiles!comercial_profile_id(full_name, email)`,
        )
        .order("created_at", { ascending: false })
        .limit(50);

    if (!canViewAllReferrals(auth.role) && auth.user.email) {
        referralsQuery = referralsQuery.eq("affiliate_email", auth.user.email);
    }

    const { data: referrals, error: referralsError } = await referralsQuery;

    if (referralsError) {
        return {
            warning: referralsError.message,
            role: auth.role,
            roleLabel: getRoleLabel(auth.role),
            userEmail: auth.user.email,
            totalReferrals: 0,
            pendingReferrals: 0,
            contactedReferrals: 0,
            convertedReferrals: 0,
            rejectedReferrals: 0,
            usersCount: 0,
            recentReferrals: [],
        };
    }

    // Transformar dados para incluir comercial_name e comercial_email
    const transformedReferrals = (referrals ?? []).map((item) => {
        const comercial = item.comercial as { full_name: string | null; email: string } | null;
        return {
            id: item.id,
            affiliate_name: item.affiliate_name,
            affiliate_email: item.affiliate_email,
            referred_name: item.referred_name,
            referred_email: item.referred_email,
            referred_phone: item.referred_phone,
            status: item.status,
            created_at: item.created_at,
            comercial_profile_id: item.comercial_profile_id,
            comercial_name: comercial?.full_name ?? null,
            comercial_email: comercial?.email ?? null,
        };
    });

    const records = sortByCreatedAt(transformedReferrals);
    const pendingReferrals = records.filter(
        (referral) => referral.status === "pending",
    ).length;
    const contactedReferrals = records.filter(
        (referral) => referral.status === "contacted",
    ).length;
    const convertedReferrals = records.filter(
        (referral) => referral.status === "converted",
    ).length;
    const rejectedReferrals = records.filter(
        (referral) => referral.status === "rejected",
    ).length;

    let usersCount = 0;

    if (canManageUsers(auth.role)) {
        const { count } = await supabase
            .from("profiles")
            .select("id", { count: "exact", head: true });

        usersCount = count ?? 0;
    }

    return {
        role: auth.role,
        roleLabel: getRoleLabel(auth.role),
        userEmail: auth.user.email,
        totalReferrals: records.length,
        pendingReferrals,
        contactedReferrals,
        convertedReferrals,
        rejectedReferrals,
        usersCount,
        recentReferrals: records.slice(0, 5),
    };
}

export async function getReferralList(limit = 50) {
    const auth = await getAuthContext();

    if (!auth.isConfigured) {
        return {
            items: [] as ReferralRecord[],
            warning: auth.warning || getSupabaseConfigMessage(),
            role: auth.role,
        };
    }

    if (!auth.user) {
        return {
            items: [] as ReferralRecord[],
            warning: "Faça login para visualizar as indicações.",
            role: auth.role,
        };
    }

    const supabase = await createServerSupabaseClient();
    let query = supabase
        .from("referrals")
        .select(
            `id, affiliate_name, affiliate_email, referred_name, referred_email, referred_phone, status, created_at, comercial_profile_id,
            comercial:profiles!comercial_profile_id(full_name, email)`,
        )
        .order("created_at", { ascending: false })
        .limit(limit);

    if (!canViewAllReferrals(auth.role) && auth.user.email) {
        query = query.eq("affiliate_email", auth.user.email);
    }

    const { data, error } = await query;

    // Transformar dados para incluir comercial_name e comercial_email
    const items = (data ?? []).map((item) => {
        const comercial = item.comercial as { full_name: string | null; email: string } | null;
        return {
            id: item.id,
            affiliate_name: item.affiliate_name,
            affiliate_email: item.affiliate_email,
            referred_name: item.referred_name,
            referred_email: item.referred_email,
            referred_phone: item.referred_phone,
            status: item.status,
            created_at: item.created_at,
            comercial_profile_id: item.comercial_profile_id,
            comercial_name: comercial?.full_name ?? null,
            comercial_email: comercial?.email ?? null,
        };
    });

    return {
        items,
        warning: error?.message,
        role: auth.role,
    };
}

export async function getProfilesList(limit = 50) {
    const auth = await getAuthContext();

    if (!auth.isConfigured) {
        return {
            items: [] as ProfileRecord[],
            warning: auth.warning || getSupabaseConfigMessage(),
        };
    }

    if (!canManageUsers(auth.role)) {
        return {
            items: [] as ProfileRecord[],
            warning: "Apenas administradores podem visualizar usuários.",
        };
    }

    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, email, role, is_active, created_at")
        .order("created_at", { ascending: false })
        .limit(limit);

    return {
        items: (data ?? []) as ProfileRecord[],
        warning: error?.message,
    };
}

export async function getReferralStatusHistory(
    limit = 100,
    changedBy?: string,
) {
    const auth = await getAuthContext();

    if (!auth.isConfigured) {
        return {
            items: [] as ReferralStatusHistoryRecord[],
            warning: auth.warning || getSupabaseConfigMessage(),
        };
    }

    if (!canViewReferralHistory(auth.role)) {
        return {
            items: [] as ReferralStatusHistoryRecord[],
            warning: "Apenas administradores podem visualizar o histórico.",
        };
    }

    const supabase = await createServerSupabaseClient();
    let query = supabase
        .from("referral_status_history")
        .select(
            "id, referral_id, old_status, new_status, note, changed_by, changed_by_email, changed_at",
        )
        .order("changed_at", { ascending: false })
        .limit(limit);

    if (changedBy) {
        query = query.eq("changed_by_email", changedBy);
    }

    const { data, error } = await query;

    return {
        items: (data ?? []) as ReferralStatusHistoryRecord[],
        warning: error?.message,
    };
}