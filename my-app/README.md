## Educação ComVida

Landing page em Next.js para captação de leads por indicação, com persistência preparada para Supabase, espelhamento em Google Sheets e notificações por e-mail.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment

Copie `.env.example` para `.env.local` e ajuste quando tiver o projeto Supabase real.

Enquanto as variáveis do Supabase estiverem com placeholders, o app:

- mantém o formulário público funcionando
- continua enviando para Google Sheets e e-mail
- exibe a estrutura do micro CRM em modo de preparação
- não autentica usuários de verdade

### Variáveis principais

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `DEFAULT_ADMIN_EMAILS`
- `DEFAULT_CAMPAIGN_SLUG`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM_NAME`

## Micro CRM

Rotas preparadas:

- `/auth/login`
- `/dashboard`
- `/dashboard/indicacoes`
- `/dashboard/usuarios`

O fluxo foi preparado para duas roles:

- `admin`
- `indicator`

Antes da migration final, a role pode ser resolvida por `app_metadata.role`, `user_metadata.role` ou pela lista de e-mails em `DEFAULT_ADMIN_EMAILS`.

## Seed local de usuários

Quando o Supabase estiver disponível, você poderá criar usuários locais por terminal com:

```bash
npm run seed:user -- email@dominio.com senha-forte "Nome da Pessoa" admin
```

Roles suportadas pelo script:

- `admin`
- `indicator`

## Migration

A migration inicial foi deixada para o final da implementação, em `supabase/migrations`.
