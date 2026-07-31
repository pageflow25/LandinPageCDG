import { redirect } from "next/navigation";
import { signOutAction } from "@/app/auth/login/actions";
import Sidebar, { type SidebarNavItem } from "@/components/dashboard/Sidebar";
import ThemeToggle from "@/components/dashboard/ThemeToggle";
import InitialsAvatar from "@/components/dashboard/InitialsAvatar";
import { canManageUsers, canViewAllReferrals, canViewReferralHistory, getAuthContext, getRoleLabel } from "@/lib/auth";

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const auth = await getAuthContext();

    if (auth.isConfigured && !auth.user) {
        redirect("/auth/login?next=/dashboard");
    }

    const roleLabel = auth.role ? getRoleLabel(auth.role) : auth.warning || "Supabase pendente de configuração";

    const navigation: SidebarNavItem[] = [
        { href: "/dashboard", label: "Resumo", icon: "resumo" },
        {
            href: "/dashboard/indicacoes",
            label: canViewAllReferrals(auth.role) ? "Indicações (Global)" : "Suas indicações",
            icon: "indicacoes",
        },
        ...(canManageUsers(auth.role)
            ? [{ href: "/dashboard/usuarios", label: "Usuários", icon: "usuarios" as const }]
            : []),
        ...(canViewReferralHistory(auth.role)
            ? [{ href: "/dashboard/auditoria", label: "Auditoria", icon: "auditoria" as const }]
            : []),
    ];

    return (
        <main className="min-h-screen bg-crm-surface text-crm-ink transition-colors">
            <div className="mx-auto flex min-h-screen max-w-[1800px] flex-col gap-5 px-4 py-5 lg:flex-row lg:px-8">
                <Sidebar
                    navigation={navigation}
                    userEmail={auth.user?.email}
                    roleLabel={roleLabel}
                    signOutAction={signOutAction}
                />

                <div className="min-w-0 flex-1">
                    <header className="mb-5 flex items-center justify-between gap-4">
                        <div className="hidden lg:block">
                            <p className="text-xs uppercase tracking-[0.2em] text-crm-ink-faint">
                                Micro CRM · Educação ComVida
                            </p>
                        </div>
                        <div className="ml-auto flex items-center gap-3">
                            <ThemeToggle />
                            {auth.user?.email && (
                                <div className="flex items-center gap-2.5 rounded-full border border-crm-line bg-crm-surface-alt py-1.5 pl-1.5 pr-4">
                                    <InitialsAvatar name={auth.user.email} size="sm" />
                                    <div className="hidden sm:block">
                                        <p className="text-xs font-semibold leading-tight text-crm-ink">
                                            {roleLabel}
                                        </p>
                                        <p className="max-w-[160px] truncate text-[11px] leading-tight text-crm-ink-faint">
                                            {auth.user.email}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </header>

                    {children}
                </div>
            </div>
        </main>
    );
}