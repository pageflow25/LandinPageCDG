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
            campaigns: {
                Row: {
                    id: string;
                    slug: string;
                    name: string;
                    description: string | null;
                    active: boolean;
                    start_date: string | null;
                    end_date: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    slug: string;
                    name: string;
                    description?: string | null;
                    active?: boolean;
                    start_date?: string | null;
                    end_date?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    slug?: string;
                    name?: string;
                    description?: string | null;
                    active?: boolean;
                    start_date?: string | null;
                    end_date?: string | null;
                    created_at?: string;
                    updated_at?: string;
                };
                Relationships: [];
            };
            profiles: {
                Row: {
                    id: string;
                    full_name: string | null;
                    email: string;
                    role: "admin" | "comercial" | "indicator";
                    is_active: boolean;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id: string;
                    full_name?: string | null;
                    email: string;
                    role: "admin" | "comercial" | "indicator";
                    is_active?: boolean;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    full_name?: string | null;
                    email?: string;
                    role?: "admin" | "comercial" | "indicator";
                    is_active?: boolean;
                    created_at?: string;
                    updated_at?: string;
                };
                Relationships: [];
            };
            referrals: {
                Row: {
                    id: string;
                    campaign_id: string | null;
                    campaign_slug: string;
                    source: string;
                    status: string;
                    affiliate_profile_id: string | null;
                    affiliate_name: string;
                    affiliate_email: string;
                    affiliate_phone: string;
                    referred_name: string;
                    referred_email: string | null;
                    referred_phone: string;
                    comercial_profile_id: string | null;
                    payload_snapshot: Json | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    campaign_id?: string | null;
                    campaign_slug: string;
                    source: string;
                    status: string;
                    affiliate_profile_id?: string | null;
                    affiliate_name: string;
                    affiliate_email: string;
                    affiliate_phone: string;
                    referred_name: string;
                    referred_email: string | null;
                    referred_phone: string;
                    comercial_profile_id?: string | null;
                    payload_snapshot?: Json | null;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    campaign_id?: string | null;
                    campaign_slug?: string;
                    source?: string;
                    status?: string;
                    affiliate_profile_id?: string | null;
                    affiliate_name?: string;
                    affiliate_email?: string;
                    affiliate_phone?: string;
                    referred_name?: string;
                    referred_email?: string;
                    referred_phone?: string;
                    comercial_profile_id?: string | null;
                    payload_snapshot?: Json | null;
                    created_at?: string;
                    updated_at?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "referrals_affiliate_profile_id_fkey";
                        columns: ["affiliate_profile_id"];
                        isOneToOne: false;
                        referencedRelation: "profiles";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "referrals_campaign_id_fkey";
                        columns: ["campaign_id"];
                        isOneToOne: false;
                        referencedRelation: "campaigns";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "referrals_comercial_profile_id_fkey";
                        columns: ["comercial_profile_id"];
                        isOneToOne: false;
                        referencedRelation: "profiles";
                        referencedColumns: ["id"];
                    },
                ];
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
                Relationships: [
                    {
                        foreignKeyName: "referral_events_referral_id_fkey";
                        columns: ["referral_id"];
                        isOneToOne: false;
                        referencedRelation: "referrals";
                        referencedColumns: ["id"];
                    },
                ];
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
                Relationships: [
                    {
                        foreignKeyName: "referral_status_history_changed_by_fkey";
                        columns: ["changed_by"];
                        isOneToOne: false;
                        referencedRelation: "profiles";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "referral_status_history_referral_id_fkey";
                        columns: ["referral_id"];
                        isOneToOne: false;
                        referencedRelation: "referrals";
                        referencedColumns: ["id"];
                    },
                ];
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
                Relationships: [
                    {
                        foreignKeyName: "admin_user_actions_target_user_id_fkey";
                        columns: ["target_user_id"];
                        isOneToOne: false;
                        referencedRelation: "profiles";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "admin_user_actions_performed_by_fkey";
                        columns: ["performed_by"];
                        isOneToOne: false;
                        referencedRelation: "profiles";
                        referencedColumns: ["id"];
                    },
                ];
            };
        };
        Views: Record<string, never>;
        Functions: Record<string, never>;
        Enums: Record<string, never>;
    };
};
