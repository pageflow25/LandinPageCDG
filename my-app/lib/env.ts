const PLACEHOLDER_SUPABASE_URL = "https://your-project.supabase.co";
const PLACEHOLDER_SUPABASE_ANON_KEY = "your-anon-key";
const PLACEHOLDER_SUPABASE_SERVICE_ROLE_KEY = "your-service-role-key";

function readEnv(name: string, fallback = ""): string {
    return process.env[name]?.trim() || fallback;
}

function readCsvEnv(name: string): string[] {
    const value = readEnv(name);

    if (!value) {
        return [];
    }

    return value
        .split(",")
        .map((item) => item.trim().toLowerCase())
        .filter(Boolean);
}

export const env = {
    appUrl: readEnv("NEXT_PUBLIC_APP_URL", "http://localhost:3000"),
    supabaseUrl: readEnv("NEXT_PUBLIC_SUPABASE_URL", PLACEHOLDER_SUPABASE_URL),
    supabaseAnonKey: readEnv(
        "NEXT_PUBLIC_SUPABASE_ANON_KEY",
        PLACEHOLDER_SUPABASE_ANON_KEY,
    ),
    supabaseServiceRoleKey: readEnv(
        "SUPABASE_SERVICE_ROLE_KEY",
        PLACEHOLDER_SUPABASE_SERVICE_ROLE_KEY,
    ),
    defaultCampaignSlug: readEnv(
        "DEFAULT_CAMPAIGN_SLUG",
        "educacao-comvida-2026",
    ),
    defaultAdminEmails: readCsvEnv("DEFAULT_ADMIN_EMAILS"),
};

export function isSupabaseConfigured(): boolean {
    return (
        env.supabaseUrl !== PLACEHOLDER_SUPABASE_URL &&
        env.supabaseAnonKey !== PLACEHOLDER_SUPABASE_ANON_KEY &&
        env.supabaseServiceRoleKey !== PLACEHOLDER_SUPABASE_SERVICE_ROLE_KEY
    );
}

export function getSupabaseConfigMessage(): string {
    return "Supabase ainda não foi configurado. Atualize NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY e SUPABASE_SERVICE_ROLE_KEY.";
}
