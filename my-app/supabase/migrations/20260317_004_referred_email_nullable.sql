-- Migration: Tornar referred_email opcional
-- O campo de e-mail do indicado foi removido do formulário.
-- Agora apenas quem indica precisa fornecer e-mail.

ALTER TABLE referrals
    ALTER COLUMN referred_email DROP NOT NULL;

COMMENT ON COLUMN referrals.referred_email IS 'E-mail do indicado (opcional desde março/2026)';
