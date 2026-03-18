-- Migration: Adicionar comercial_profile_id à tabela referrals
-- Permite vincular indicações ao consultor comercial responsável

ALTER TABLE public.referrals
ADD COLUMN comercial_profile_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_referrals_comercial_profile_id
ON public.referrals (comercial_profile_id);

COMMENT ON COLUMN public.referrals.comercial_profile_id IS 'ID do consultor comercial responsável pela indicação';
