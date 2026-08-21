-- Migration: Campos de sincronização com o GoHighLevel (GHL)
-- ghl_synced_at NULL = ainda não integrado ao CRM.

ALTER TABLE public.referrals
    ADD COLUMN IF NOT EXISTS ghl_contact_id text,
    ADD COLUMN IF NOT EXISTS ghl_opportunity_id text,
    ADD COLUMN IF NOT EXISTS ghl_synced_at timestamptz;

CREATE INDEX IF NOT EXISTS referrals_ghl_synced_at_idx
    ON public.referrals (ghl_synced_at);
