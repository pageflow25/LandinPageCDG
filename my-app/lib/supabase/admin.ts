import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";

let adminClient: ReturnType<typeof createClient> | undefined;

export function createAdminSupabaseClient() {
    if (!adminClient) {
        adminClient = createClient(
            env.supabaseUrl,
            env.supabaseServiceRoleKey,
            {
                auth: {
                    autoRefreshToken: false,
                    persistSession: false,
                },
            },
        );
    }

    return adminClient;
}
