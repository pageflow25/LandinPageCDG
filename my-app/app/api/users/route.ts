import { NextRequest, NextResponse } from "next/server";
import { canManageUsers, getAuthContext } from "@/lib/auth";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { createUserSchema } from "@/schemas/user-management.schema";
import { logAdminUserAction } from "@/services/admin-user-audit.service";

export const runtime = "nodejs";

export async function GET() {
    const auth = await getAuthContext();

    if (!auth.user || !canManageUsers(auth.role)) {
        return NextResponse.json({ error: "Sem permissão para listar usuários." }, { status: 403 });
    }

    const admin = createAdminSupabaseClient();
    const { data, error } = await admin
        .from("profiles")
        .select("id, full_name, email, role, is_active, created_at")
        .order("created_at", { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ items: data ?? [] });
}

export async function POST(request: NextRequest) {
    const auth = await getAuthContext();

    if (!auth.user || !canManageUsers(auth.role)) {
        return NextResponse.json({ error: "Sem permissão para cadastrar usuários." }, { status: 403 });
    }

    const body = await request.json().catch(() => null);
    const parsed = createUserSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json(
            { error: "Payload inválido.", details: parsed.error.flatten() },
            { status: 400 },
        );
    }

    const admin = createAdminSupabaseClient();
    const { email, password, fullName, role } = parsed.data;

    const { data: created, error: createError } = await admin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        app_metadata: { role },
        user_metadata: { full_name: fullName, role },
    });

    if (createError || !created.user) {
        return NextResponse.json(
            { error: createError?.message || "Falha ao criar usuário." },
            { status: 500 },
        );
    }

    const { error: profileError } = await admin.from("profiles").upsert({
        id: created.user.id,
        full_name: fullName,
        email,
        role,
        is_active: true,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    if (profileError) {
        return NextResponse.json(
            { error: `Usuário criado, mas profile falhou: ${profileError.message}` },
            { status: 500 },
        );
    }

    await logAdminUserAction({
        targetUserId: created.user.id,
        actionType: "create_user",
        performedBy: auth.user.id,
        performedByEmail: auth.user.email,
        payload: {
            email,
            role,
            fullName,
        },
    });

    return NextResponse.json({
        success: true,
        user: {
            id: created.user.id,
            email,
            role,
            fullName,
            isActive: true,
        },
    });
}
