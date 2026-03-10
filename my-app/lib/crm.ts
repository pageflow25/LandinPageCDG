import { getAuthContext } from "@/lib/auth";
import { getSupabaseConfigMessage } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export interface ReferralRecord {
    id: string;
    affiliate_name: string;
    affiliate_email: string;
    referred_name: string;
    referred_email: string;
    referred_phone: string;
    status: string;
    created_at: string;
}

export interface ProfileRecord {
    id: string;
    full_name: string | null;
    email: string;
    role: string;
    created_at: string;
}

export interface DashboardSnapshot {
    warning?: string;
    roleLabel: string;
    userEmail?: string;
    totalReferrals: number;
    pendingReferrals: number;
    convertedReferrals: number;
    usersCount: number;
    recentReferrals: ReferralRecord[];
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
            roleLabel: "Modo preparação",
            totalReferrals: 0,
            pendingReferrals: 0,
            convertedReferrals: 0,
            usersCount: 0,
            recentReferrals: [],
        };
    }

    if (!auth.user) {
        return {
            warning: "Faça login para visualizar o CRM.",
            roleLabel: "Não autenticado",
            totalReferrals: 0,
            pendingReferrals: 0,
            convertedReferrals: 0,
            usersCount: 0,
            recentReferrals: [],
        };
    }

    const supabase = await createServerSupabaseClient();
    let referralsQuery = supabase
        .from("referrals")
        .select(
            "id, affiliate_name, affiliate_email, referred_name, referred_email, referred_phone, status, created_at",
        )
        .order("created_at", { ascending: false })
        .limit(50);

    if (auth.role !== "admin" && auth.user.email) {
        referralsQuery = referralsQuery.eq("affiliate_email", auth.user.email);
    }

    const { data: referrals, error: referralsError } = await referralsQuery;

    if (referralsError) {
        return {
            warning: referralsError.message,
            roleLabel: auth.role === "admin" ? "Administrador" : "Indicador",
            userEmail: auth.user.email,
            totalReferrals: 0,
            pendingReferrals: 0,
            convertedReferrals: 0,
            usersCount: 0,
            recentReferrals: [],
        };
    }

    const records = sortByCreatedAt((referrals ?? []) as ReferralRecord[]);
    const pendingReferrals = records.filter(
        (referral) => referral.status === "pending",
    ).length;
    const convertedReferrals = records.filter(
        (referral) => referral.status === "converted",
    ).length;

    let usersCount = 0;

    if (auth.role === "admin") {
        const { count } = await supabase
            .from("profiles")
            .select("id", { count: "exact", head: true });

        usersCount = count ?? 0;
    }

    return {
        roleLabel: auth.role === "admin" ? "Administrador" : "Indicador",
        userEmail: auth.user.email,
        totalReferrals: records.length,
        pendingReferrals,
        convertedReferrals,
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
            "id, affiliate_name, affiliate_email, referred_name, referred_email, referred_phone, status, created_at",
        )
        .order("created_at", { ascending: false })
        .limit(limit);

    if (auth.role !== "admin" && auth.user.email) {
        query = query.eq("affiliate_email", auth.user.email);
    }

    const { data, error } = await query;

    return {
        items: (data ?? []) as ReferralRecord[],
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

    if (auth.role !== "admin") {
        return {
            items: [] as ProfileRecord[],
            warning: "Apenas administradores podem visualizar usuários.",
        };
    }

    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, email, role, created_at")
        .order("created_at", { ascending: false })
        .limit(limit);

    return {
        items: (data ?? []) as ProfileRecord[],
        warning: error?.message,
    };
}