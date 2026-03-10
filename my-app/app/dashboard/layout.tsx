import Link from "next/link";
import { redirect } from "next/navigation";
import { signOutAction } from "@/app/auth/login/actions";
import { getAuthContext } from "@/lib/auth";

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const auth = await getAuthContext();

    if (auth.isConfigured && !auth.user) {
        redirect("/auth/login?next=/dashboard");
    }

    const navigation = [
        { href: "/dashboard", label: "Resumo" },
        { href: "/dashboard/indicacoes", label: "Indicações" },
        { href: "/dashboard/usuarios", label: "Usuários" },
    ];

    return (
        <main className="min-h-screen bg-[#F6F8FB] text-azul-escuro">
            <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-4 py-5 lg:flex-row lg:px-6">
                <aside className="w-full rounded-[2rem] bg-azul-escuro p-6 text-white shadow-xl lg:sticky lg:top-5 lg:h-[calc(100vh-2.5rem)] lg:w-80">
                    <p className="text-sm uppercase tracking-[0.24em] text-white/60">
                        Micro CRM
                    </p>
                    <h1 className="font-primaria mt-3 text-3xl font-bold">
                        Educação ComVida
                    </h1>
                    <p className="mt-3 text-sm leading-6 text-white/75">
                        Área preparada para equipe interna e indicadores acompanharem a campanha.
                    </p>

                    <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-4">
                        <p className="text-xs uppercase tracking-[0.24em] text-white/50">
                            Sessão
                        </p>
                        <p className="mt-3 text-sm font-semibold">
                            {auth.user?.email || "Modo preparação"}
                        </p>
                        <p className="mt-1 text-sm text-white/65">
                            {auth.role === "admin"
                                ? "Administrador"
                                : auth.role === "indicator"
                                  ? "Indicador"
                                  : auth.warning || "Supabase pendente de configuração"}
                        </p>
                    </div>

                    <nav className="mt-8 space-y-2">
                        {navigation.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="block rounded-2xl px-4 py-3 text-sm text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link
                            href="/"
                            className="rounded-full border border-white/20 px-4 py-2 text-sm transition-colors hover:bg-white hover:text-azul-escuro"
                        >
                            Landing page
                        </Link>
                        <form action={signOutAction}>
                            <button
                                type="submit"
                                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-azul-escuro transition-colors hover:bg-fundo-claro"
                            >
                                Sair
                            </button>
                        </form>
                    </div>
                </aside>

                <div className="flex-1">{children}</div>
            </div>
        </main>
    );
}