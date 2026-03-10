"use server";

import { redirect } from "next/navigation";
import { getSupabaseConfigMessage, isSupabaseConfigured } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";

function buildLoginUrl(message: string, nextPath: string) {
    const searchParams = new URLSearchParams({
        error: message,
        next: nextPath,
    });

    return `/auth/login?${searchParams.toString()}`;
}

export async function signInAction(formData: FormData) {
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");
    const nextPath = String(formData.get("next") || "/dashboard");

    if (!isSupabaseConfigured()) {
        redirect(buildLoginUrl(getSupabaseConfigMessage(), nextPath));
    }

    if (!email || !password) {
        redirect(buildLoginUrl("Informe e-mail e senha para continuar.", nextPath));
    }

    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        redirect(buildLoginUrl(error.message, nextPath));
    }

    redirect(nextPath);
}

export async function signOutAction() {
    if (isSupabaseConfigured()) {
        const supabase = await createServerSupabaseClient();
        await supabase.auth.signOut();
    }

    redirect("/auth/login");
}