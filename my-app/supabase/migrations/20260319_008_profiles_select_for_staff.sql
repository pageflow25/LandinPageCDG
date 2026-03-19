-- Migration: Permitir supervisor e comercial lerem profiles (necessário para JOIN do comercial)
-- e adicionar policy de UPDATE no comercial_profile_id para admin

-- 1. Supervisor e comercial podem ler profiles (para ver nome do comercial no JOIN)
DROP POLICY IF EXISTS "profiles_select_own_or_admin" ON public.profiles;
CREATE POLICY "profiles_select_own_or_admin"
ON public.profiles
FOR SELECT
USING (
    auth.uid() = id
    OR public.is_admin()
    OR public.is_comercial()
    OR public.is_supervisor()
);
