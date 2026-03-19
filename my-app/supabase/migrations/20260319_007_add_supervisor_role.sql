-- Migration: Adicionar role "supervisor" ao sistema
-- Supervisor pode visualizar todas as indicações mas não pode alterar nada.

-- 1. Atualizar CHECK constraint para aceitar "supervisor"
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_role_check
    CHECK (role IN ('admin', 'comercial', 'supervisor', 'indicator'));

-- 2. Criar função is_supervisor()
CREATE OR REPLACE FUNCTION public.is_supervisor()
RETURNS boolean LANGUAGE sql STABLE AS $$
    SELECT coalesce(
        auth.jwt() -> 'app_metadata' ->> 'role',
        auth.jwt() -> 'user_metadata' ->> 'role', ''
    ) = 'supervisor';
$$;

-- 3. Atualizar policy de SELECT para incluir supervisor
DROP POLICY IF EXISTS "referrals_select_own_or_admin" ON public.referrals;
CREATE POLICY "referrals_select_own_or_admin"
ON public.referrals
FOR SELECT
USING (
    affiliate_profile_id = auth.uid()
    OR lower(affiliate_email) = lower(coalesce(auth.email(), ''))
    OR public.can_manage_referrals()
    OR public.is_supervisor()
);
