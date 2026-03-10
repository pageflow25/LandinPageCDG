import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";
import type { Database } from "@/lib/supabase/types";

let adminClient: ReturnType<typeof createClient<Database>> | undefined;

export function createAdminSupabaseClient() {
    if (!adminClient) {
        adminClient = createClient<Database>(
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
