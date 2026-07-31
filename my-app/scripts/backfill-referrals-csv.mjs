import { resolve } from "node:path";
import dotenv from "dotenv";
import { Client } from "pg";

/**
 * Backfill pontual — insere indicações que existem na planilha (Google Sheets)
 * mas não foram persistidas no Supabase (falha silenciosa histórica do
 * envio para o CRM). Cada linha grava em `referrals` + um evento de auditoria
 * em `referral_events` com event_type = "backfill_csv_import".
 *
 * Uso: node scripts/backfill-referrals-csv.mjs [--dry-run]
 */

dotenv.config({ path: resolve(process.cwd(), ".env.local") });

const CAMPAIGN_SLUG = "educacao-comvida-2026";

const rows = [
    {
        createdAtUtc: "2026-07-31T13:16:00Z",
        afiliado: { nome: "João Henrique Demarque Lima", email: "logusidiomas1@gmail.com", telefone: "65993612351" },
        indicado: { nome: "Eliel Oliveira", telefone: "65996858351" },
    },
    {
        createdAtUtc: "2026-07-20T13:40:00Z",
        afiliado: { nome: "Rafael de Souza Moreira", email: "rafael@evoluna.com.br", telefone: "21964245160" },
        indicado: { nome: "Alquimistas do Propósito", telefone: "11930997208" },
    },
    {
        createdAtUtc: "2026-07-16T23:23:00Z",
        afiliado: { nome: "Ernesto Santana", email: "santana2k19@gmail.com", telefone: "85998522179" },
        indicado: { nome: "Thais Maria", telefone: "85992283562" },
    },
    {
        createdAtUtc: "2026-07-16T14:57:00Z",
        afiliado: { nome: "Editora Aquinate LTDA", email: "editoraaquinate@gmail.com", telefone: "(11) 99323-1004" },
        indicado: { nome: "Colégio Monte Alvo", telefone: "(27) 99789-2744" },
    },
    {
        createdAtUtc: "2026-07-11T01:55:00Z",
        afiliado: { nome: "Keiciane Canabarro Drehmer Marques", email: "keicibio@gmail.com", telefone: "51995670240" },
        indicado: { nome: "Anelize Camila Stallbaum", telefone: "49 9975-7357" },
    },
];

const dryRun = process.argv.includes("--dry-run");
const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;

if (!connectionString) {
    console.error("DIRECT_URL ou DATABASE_URL não configurada.");
    process.exit(1);
}

const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });

try {
    await client.connect();
    await client.query("begin");

    const insertedIds = [];

    for (const row of rows) {
        const payloadSnapshot = {
            afiliado: row.afiliado,
            indicado: row.indicado,
            comercialId: null,
            comercialNome: null,
        };

        const { rows: inserted } = await client.query(
            `insert into public.referrals
                (campaign_slug, source, status, affiliate_name, affiliate_email, affiliate_phone,
                 referred_name, referred_email, referred_phone, comercial_profile_id,
                 payload_snapshot, created_at, updated_at)
             values ($1, 'landing-page', 'pending', $2, $3, $4, $5, null, $6, null, $7, $8, $8)
             returning id`,
            [
                CAMPAIGN_SLUG,
                row.afiliado.nome,
                row.afiliado.email,
                row.afiliado.telefone,
                row.indicado.nome,
                row.indicado.telefone,
                payloadSnapshot,
                row.createdAtUtc,
            ],
        );

        const referralId = inserted[0].id;
        insertedIds.push(referralId);

        await client.query(
            `insert into public.referral_events (referral_id, event_type, payload, created_at)
             values ($1, 'backfill_csv_import', $2, now())`,
            [referralId, { source: "planilha-google-sheets", note: "Backfill manual — indicação ausente do Supabase" }],
        );

        console.log(`✔ Inserido: ${row.afiliado.nome} → ${row.indicado.nome} (id=${referralId})`);
    }

    if (dryRun) {
        await client.query("rollback");
        console.log(`\n[DRY RUN] ${insertedIds.length} linhas seriam inseridas. Nada foi persistido (rollback).`);
    } else {
        await client.query("commit");
        console.log(`\n${insertedIds.length} indicações inseridas com sucesso.`);
    }
} catch (error) {
    await client.query("rollback").catch(() => undefined);
    console.error("Falha no backfill:", error.message);
    process.exitCode = 1;
} finally {
    await client.end().catch(() => undefined);
}
