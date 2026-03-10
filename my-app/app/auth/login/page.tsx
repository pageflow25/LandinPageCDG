import Link from "next/link";
import type { Metadata } from "next";
import { signInAction } from "@/app/auth/login/actions";
import { getSupabaseConfigMessage, isSupabaseConfigured } from "@/lib/env";

export const metadata: Metadata = {
    title: "Login | CRM Educação ComVida",
    description: "Acesso ao micro CRM da campanha Educação ComVida.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function getParam(
    value: string | string[] | undefined,
    fallback = "",
): string {
    if (Array.isArray(value)) {
        return value[0] || fallback;
    }

    return value || fallback;
}

export default async function LoginPage({
    searchParams,
}: {
    searchParams: SearchParams;
}) {
    const params = await searchParams;
    const errorMessage = getParam(params.error);
    const nextPath = getParam(params.next, "/dashboard");
    const isConfigured = isSupabaseConfigured();

    return (
        <main className="min-h-screen bg-azul-escuro bg-pattern-logo px-6 py-10 text-white">
            <div className="mx-auto flex min-h-[80vh] max-w-5xl items-center justify-center">
                <div className="grid w-full gap-6 rounded-[2rem] bg-white/10 p-4 backdrop-blur md:grid-cols-[1.15fr_0.85fr] md:p-6">
                    <section className="rounded-[1.75rem] bg-[linear-gradient(140deg,#0B284F_0%,#145E86_55%,#F0B45A_100%)] p-8 shadow-2xl">
                        <p className="font-secundaria text-sm uppercase tracking-[0.24em] text-white/70">
                            CRM da campanha
                        </p>
                        <h1 className="font-primaria mt-4 text-3xl font-bold md:text-5xl">
                            Gestão de indicações com visão por perfil.
                        </h1>
                        <p className="mt-4 max-w-xl text-base leading-7 text-white/85 md:text-lg">
                            A área privada foi preparada para equipe interna e indicadores.
                            Enquanto o Supabase estiver com placeholders, esta tela funciona em modo
                            de preparação.
                        </p>

                        <div className="mt-8 grid gap-4 md:grid-cols-2">
                            <div className="rounded-3xl border border-white/20 bg-white/10 p-4">
                                <p className="text-sm text-white/70">Indicadores</p>
                                <p className="mt-2 font-primaria text-xl font-semibold">
                                    acompanham apenas suas indicações
                                </p>
                            </div>
                            <div className="rounded-3xl border border-white/20 bg-white/10 p-4">
                                <p className="text-sm text-white/70">Equipe interna</p>
                                <p className="mt-2 font-primaria text-xl font-semibold">
                                    vê a operação completa da campanha
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/80">
                            <Link
                                href="/dashboard"
                                className="rounded-full border border-white/30 px-5 py-3 transition-colors hover:bg-white hover:text-azul-escuro"
                            >
                                Ver estrutura do CRM
                            </Link>
                            <Link
                                href="/"
                                className="rounded-full bg-white px-5 py-3 font-semibold text-azul-escuro transition-colors hover:bg-fundo-claro"
                            >
                                Voltar para a landing page
                            </Link>
                        </div>
                    </section>

                    <section className="rounded-[1.75rem] bg-white p-8 text-azul-escuro shadow-2xl">
                        <div className="mb-6">
                            <p className="text-sm uppercase tracking-[0.24em] text-azul-principal/70">
                                Acesso
                            </p>
                            <h2 className="font-primaria mt-3 text-3xl font-bold">
                                Entrar no micro CRM
                            </h2>
                            <p className="mt-3 text-sm leading-6 text-slate-600">
                                Use um usuário criado pelo Supabase ou pelo script local de seed.
                            </p>
                        </div>

                        {!isConfigured && (
                            <div className="mb-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                                {getSupabaseConfigMessage()}
                            </div>
                        )}

                        {errorMessage && (
                            <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                                {errorMessage}
                            </div>
                        )}

                        <form action={signInAction} className="space-y-4">
                            <input type="hidden" name="next" value={nextPath} />

                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-1 block text-sm font-medium text-slate-700"
                                >
                                    E-mail
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="voce@empresa.com"
                                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition-colors focus:border-azul-principal"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-1 block text-sm font-medium text-slate-700"
                                >
                                    Senha
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    placeholder="Sua senha"
                                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition-colors focus:border-azul-principal"
                                />
                            </div>

                            <button
                                type="submit"
                                className="font-primaria w-full rounded-full bg-azul-destaque px-5 py-3 text-lg font-semibold text-azul-escuro transition-colors hover:bg-azul-principal hover:text-white"
                            >
                                Entrar
                            </button>
                        </form>

                        <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                            <p className="font-semibold text-slate-800">Sequência de implantação</p>
                            <p className="mt-2 leading-6">
                                Primeiro configure as variáveis reais do Supabase, depois rode a seed
                                de usuários e por fim aplique a migration final.
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}