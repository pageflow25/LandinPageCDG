import Link from "next/link";
import { getDashboardSnapshot } from "@/lib/crm";

function formatDate(value: string) {
    return new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
    }).format(new Date(value));
}

export default async function DashboardPage() {
    const snapshot = await getDashboardSnapshot();
    const isIndicator = snapshot.role === "indicator";

    const cards = [
        {
            label: "Indicações totais",
            value: snapshot.totalReferrals,
        },
        {
            label: "Pendentes",
            value: snapshot.pendingReferrals,
        },
        {
            label: "Convertidas",
            value: snapshot.convertedReferrals,
        },
        ...(isIndicator
            ? []
            : [
                  {
                      label: "Usuários",
                      value: snapshot.usersCount,
                  },
              ]),
    ];

    return (
        <section className="space-y-6 py-2">
            <div className="rounded-[2rem] bg-white p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.24em] text-azul-principal/60">
                    Visão geral
                </p>
                <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <h2 className="font-primaria text-3xl font-bold text-azul-escuro">
                            {isIndicator ? "Seu painel de indicações" : "Painel da campanha"}
                        </h2>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                            {isIndicator
                                ? "Acompanhe o andamento das suas indicações e veja os registros mais recentes em um fluxo simples de leitura."
                                : "Estrutura inicial do CRM conectada à landing page, preparada para operar com Supabase como base principal e Google Sheets como espelho."}
                        </p>
                    </div>
                    <div className="rounded-3xl bg-slate-50 px-5 py-4 text-sm text-slate-600">
                        <p className="font-semibold text-slate-800">Perfil ativo</p>
                        <p className="mt-1">{snapshot.roleLabel}</p>
                        {snapshot.userEmail && <p className="mt-1">{snapshot.userEmail}</p>}
                    </div>
                </div>

                {snapshot.warning && (
                    <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                        {snapshot.warning}
                    </div>
                )}
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {cards.map((card) => (
                    <article key={card.label} className="rounded-[1.75rem] bg-white p-5 shadow-sm">
                        <p className="text-sm text-slate-500">{card.label}</p>
                        <p className="font-primaria mt-3 text-4xl font-bold text-azul-escuro">
                            {card.value}
                        </p>
                    </article>
                ))}
            </div>

            <div>
                <section className="rounded-[2rem] bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-sm uppercase tracking-[0.24em] text-azul-principal/60">
                                Últimas indicações
                            </p>
                            <h3 className="font-primaria mt-2 text-2xl font-bold text-azul-escuro">
                                Fila recente de leads
                            </h3>
                        </div>
                        <Link
                            href="/dashboard/indicacoes"
                            className="rounded-full border border-slate-200 px-4 py-2 text-sm transition-colors hover:bg-slate-50"
                        >
                            Ver todas
                        </Link>
                    </div>

                    <div className="mt-5 space-y-4">
                        {snapshot.recentReferrals.length === 0 && (
                            <div className="rounded-3xl border border-dashed border-slate-200 p-6 text-sm text-slate-500">
                                Nenhuma indicação disponível ainda. Assim que a migration e o banco
                                estiverem ativos, os registros aparecerão aqui.
                            </div>
                        )}

                        {snapshot.recentReferrals.map((referral) => (
                            <article
                                key={referral.id}
                                className="rounded-3xl border border-slate-100 p-4"
                            >
                                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <p className="font-semibold text-azul-escuro">
                                            {referral.referred_name}
                                        </p>
                                        <p className="text-sm text-slate-500">
                                            Indicador: {referral.affiliate_name}
                                        </p>
                                    </div>
                                    <div className="text-sm text-slate-500">
                                        {formatDate(referral.created_at)}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </section>
    );
}