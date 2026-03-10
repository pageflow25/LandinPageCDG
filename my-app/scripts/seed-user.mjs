import { resolve } from "node:path";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { Client } from "pg";

dotenv.config({ path: resolve(process.cwd(), ".env.local") });

const [emailArg, passwordArg, fullNameArg, roleArg] = process.argv.slice(2);

const email = emailArg || process.env.DEFAULT_ADMIN_SEED_EMAIL || process.env.SMTP_USER;
const password = passwordArg || process.env.DEFAULT_ADMIN_SEED_PASSWORD;
const fullName = fullNameArg || process.env.DEFAULT_ADMIN_SEED_NAME || "Admin Educacao ComVida";
const role = roleArg || "admin";
const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!email || !password) {
  console.error("Uso: npm run seed:user -- email senha \"Nome\" admin|comercial|indicator");
  console.error("Ou configure DEFAULT_ADMIN_SEED_EMAIL e DEFAULT_ADMIN_SEED_PASSWORD em .env.local.");
  process.exit(1);
}

if (!["admin", "comercial", "indicator"].includes(role)) {
  console.error("Role inválida. Use admin, comercial ou indicator.");
  process.exit(1);
}

async function seedWithAdminApi() {
  if (!supabaseUrl || !serviceRoleKey) {
    return false;
  }

  if (supabaseUrl.includes("your-project") || serviceRoleKey === "your-service-role-key") {
    return false;
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const { data: existingUsers, error: listError } = await supabase.auth.admin.listUsers();

  if (listError) {
    throw new Error(`Falha ao listar usuários no Auth: ${listError.message}`);
  }

  const existingUser = existingUsers.users.find(
    (user) => user.email?.toLowerCase() === email.toLowerCase(),
  );

  if (existingUser) {
    console.log(`Usuário já existe: ${email}`);
    return true;
  }

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      full_name: fullName,
      role,
    },
    app_metadata: {
      role,
    },
  });

  if (error) {
    throw new Error(`Falha ao criar usuário via Auth Admin API: ${error.message}`);
  }

  const { error: profileError } = await supabase.from("profiles").upsert({
    id: data.user.id,
    full_name: fullName,
    email,
    role,
  });

  if (profileError) {
    throw new Error(`Usuário criado, mas houve falha ao salvar profile: ${profileError.message}`);
  }

  console.log("Usuário seeded com sucesso via Auth Admin API.");
  console.log(`ID: ${data.user.id}`);
  console.log(`E-mail: ${email}`);
  console.log(`Senha: ${password}`);
  console.log(`Role: ${role}`);
  return true;
}

async function seedWithDirectSql() {
  if (!connectionString) {
    throw new Error("DIRECT_URL ou DATABASE_URL não foi configurada.");
  }

  const client = new Client({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();
    await client.query("begin");

    const existingUser = await client.query(
      "select id from auth.users where lower(email) = lower($1) limit 1",
      [email],
    );

    if (existingUser.rowCount) {
      await client.query("rollback");
      console.log(`Usuário já existe: ${email}`);
      return;
    }

    await client.query(
      `with inserted_user as (
          insert into auth.users (
              instance_id,
              id,
              aud,
              role,
              email,
              encrypted_password,
              email_confirmed_at,
              raw_app_meta_data,
              raw_user_meta_data,
              is_super_admin,
              created_at,
              updated_at,
              is_sso_user,
              is_anonymous
          ) values (
              '00000000-0000-0000-0000-000000000000',
              gen_random_uuid(),
              'authenticated',
              'authenticated',
              $1,
              crypt($2, gen_salt('bf')),
              timezone('utc', now()),
              jsonb_build_object('provider', 'email', 'providers', jsonb_build_array('email'), 'role', $3::text),
              jsonb_build_object('full_name', $4::text, 'role', $3::text),
              false,
              timezone('utc', now()),
              timezone('utc', now()),
              false,
              false
          )
          returning id, email
      )
      insert into auth.identities (
          user_id,
          identity_data,
          provider,
          provider_id,
          last_sign_in_at,
          created_at,
          updated_at,
          email
      )
      select
          id,
          jsonb_build_object('sub', id::text, 'email', email),
          'email',
          email,
          timezone('utc', now()),
          timezone('utc', now()),
          timezone('utc', now()),
          email
      from inserted_user`,
      [email, password, role, fullName],
    );

    await client.query("commit");
    console.log("Usuário seeded com sucesso via SQL direto.");
    console.log(`E-mail: ${email}`);
    console.log(`Senha: ${password}`);
    console.log(`Role: ${role}`);
  } catch (error) {
    await client.query("rollback").catch(() => undefined);
    throw error;
  } finally {
    await client.end().catch(() => undefined);
  }
}

try {
  const seededWithApi = await seedWithAdminApi();

  if (!seededWithApi) {
    await seedWithDirectSql();
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error);

  try {
    await seedWithDirectSql();
  } catch (fallbackError) {
    console.error(
      "Falha ao criar usuário por seed SQL:",
      fallbackError instanceof Error ? fallbackError.message : fallbackError,
    );
    process.exit(1);
  }
}
