"use client";

import { createBrowserClient } from "@supabase/ssr";
import { env } from "@/lib/env";

let browserClient: ReturnType<typeof createBrowserClient> | undefined;

export function getBrowserSupabaseClient() {
    if (!browserClient) {
        browserClient = createBrowserClient(
            env.supabaseUrl,
            env.supabaseAnonKey,
        );
    }

    return browserClient;
}
