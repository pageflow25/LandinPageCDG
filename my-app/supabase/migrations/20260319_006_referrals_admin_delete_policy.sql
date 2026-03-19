-- Migration: Adicionar policy de DELETE na tabela referrals para admin
-- Permite que usuários com role admin excluam indicações via RLS.

CREATE POLICY "referrals_admin_delete"
ON public.referrals
FOR DELETE
USING (
    public.is_admin()
);
