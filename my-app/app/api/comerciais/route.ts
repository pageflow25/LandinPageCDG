import { NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/env";

export const runtime = "nodejs";

export interface ComercialOption {
    id: string;
    full_name: string | null;
    email: string;
}

/**
 * GET /api/comerciais
 *
 * Endpoint público para buscar comerciais ativos.
 * Usado pelo dropdown do formulário de indicação.
 */
export async function GET() {
    if (!isSupabaseConfigured()) {
        return NextResponse.json({ items: [] });
    }

    const admin = createAdminSupabaseClient();

    const { data, error } = await admin
        .from("profiles")
        .select("id, full_name, email")
        .eq("role", "comercial")
        .eq("is_active", true)
        .order("full_name", { ascending: true });

    if (error) {
        console.error("[COMERCIAIS] Erro ao buscar:", error);
        return NextResponse.json({ items: [] });
    }

    return NextResponse.json({
        items: (data ?? []) as ComercialOption[],
    });
}
