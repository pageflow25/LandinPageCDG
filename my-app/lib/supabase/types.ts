/**
 * Minimal hand-written Supabase Database type.
 * Replace with the generated output of `supabase gen types typescript` when available.
 */
export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export type Database = {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string;
                    full_name: string | null;
                    email: string;
                    role: "admin" | "comercial" | "indicator";
                    is_active: boolean;
                    created_at: string;
                };
                Insert: {
                    id: string;
                    full_name?: string | null;
                    email: string;
                    role: "admin" | "comercial" | "indicator";
                    is_active?: boolean;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    full_name?: string | null;
                    email?: string;
                    role?: "admin" | "comercial" | "indicator";
                    is_active?: boolean;
                    created_at?: string;
                };
            };
            referrals: {
                Row: {
                    id: string;
                    campaign_slug: string;
                    source: string;
                    status: string;
                    affiliate_name: string;
                    affiliate_email: string;
                    affiliate_phone: string;
                    referred_name: string;
                    referred_email: string;
                    referred_phone: string;
                    payload_snapshot: Json | null;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    campaign_slug: string;
                    source: string;
                    status: string;
                    affiliate_name: string;
                    affiliate_email: string;
                    affiliate_phone: string;
                    referred_name: string;
                    referred_email: string;
                    referred_phone: string;
                    payload_snapshot?: Json | null;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    campaign_slug?: string;
                    source?: string;
                    status?: string;
                    affiliate_name?: string;
                    affiliate_email?: string;
                    affiliate_phone?: string;
                    referred_name?: string;
                    referred_email?: string;
                    referred_phone?: string;
                    payload_snapshot?: Json | null;
                    created_at?: string;
                };
            };
            referral_events: {
                Row: {
                    id: string;
                    referral_id: string;
                    event_type: string;
                    payload: Json | null;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    referral_id: string;
                    event_type: string;
                    payload?: Json | null;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    referral_id?: string;
                    event_type?: string;
                    payload?: Json | null;
                    created_at?: string;
                };
            };
            referral_status_history: {
                Row: {
                    id: string;
                    referral_id: string;
                    old_status: string | null;
                    new_status: string;
                    note: string | null;
                    changed_by: string;
                    changed_by_email: string | null;
                    changed_at: string;
                };
                Insert: {
                    id?: string;
                    referral_id: string;
                    old_status?: string | null;
                    new_status: string;
                    note?: string | null;
                    changed_by: string;
                    changed_by_email?: string | null;
                    changed_at?: string;
                };
                Update: {
                    id?: string;
                    referral_id?: string;
                    old_status?: string | null;
                    new_status?: string;
                    note?: string | null;
                    changed_by?: string;
                    changed_by_email?: string | null;
                    changed_at?: string;
                };
            };
            admin_user_actions: {
                Row: {
                    id: string;
                    target_user_id: string;
                    action_type: string;
                    payload: Json | null;
                    performed_by: string;
                    performed_by_email: string | null;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    target_user_id: string;
                    action_type: string;
                    payload?: Json | null;
                    performed_by: string;
                    performed_by_email?: string | null;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    target_user_id?: string;
                    action_type?: string;
                    payload?: Json | null;
                    performed_by?: string;
                    performed_by_email?: string | null;
                    created_at?: string;
                };
            };
        };
        Views: Record<string, never>;
        Functions: Record<string, never>;
        Enums: Record<string, never>;
    };
};
