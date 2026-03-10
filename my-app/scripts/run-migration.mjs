import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import dotenv from "dotenv";
import { Client } from "pg";

dotenv.config({ path: resolve(process.cwd(), ".env.local") });

const migrationPath =
  process.argv[2] ||
  resolve(process.cwd(), "supabase", "migrations", "20260309_001_initial_crm.sql");
const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DIRECT_URL ou DATABASE_URL não foi configurada.");
  process.exit(1);
}

const sql = await readFile(migrationPath, "utf8");
const client = new Client({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

try {
  await client.connect();
  await client.query(sql);
  console.log(`Migration executada com sucesso: ${migrationPath}`);
} catch (error) {
  console.error("Falha ao executar migration:", error.message);
  process.exitCode = 1;
} finally {
  await client.end().catch(() => undefined);
}
