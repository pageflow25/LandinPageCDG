import Link from "next/link";
import { getDashboardSnapshot } from "@/lib/crm";
import { canManageUsers } from "@/lib/auth";
import InitialsAvatar from "@/components/dashboard/InitialsAvatar";
import { StatusBadge, STATUS_DOT_CLASSES, STATUS_LABELS } from "@/components/dashboard/StatusBadge";

function formatDate(value: string) {
    return new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
    }).format(new Date(value));
}

const ICON_PATHS: Record<string, React.ReactNode> = {
    total: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 6h12M8 12h12M8 18h12M3.5 6h.01M3.5 12h.01M3.5 18h.01" />
    ),
    pending: <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3.2 1.9M21 12a9 9 0 1 1-9-9" />,
    converted: <path strokeLinecap="round" strokeLinejoin="round" d="m5 12.5 4.5 4.5L20 6" />,
    users: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 19v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 17.5V19M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM18 19v-1.5a3.5 3.5 0 0 0-2.3-3.29M14.5 5.1a3 3 0 0 1 0 5.8" />
    ),
};

export default async function DashboardPage() {
    const snapshot = await getDashboardSnapshot();
    const showUsersCard = canManageUsers(snapshot.role);

    const cards = [
        { label: "Indicações totais", value: snapshot.totalReferrals, icon: "total", accent: "text-azul-principal bg-azul-principal/10" },
        { label: "Pendentes", value: snapshot.pendingReferrals, icon: "pending", accent: "text-amber-600 bg-amber-500/10" },
        { label: "Convertidas", value: snapshot.convertedReferrals, icon: "converted", accent: "text-emerald-600 bg-emerald-500/10" },
        ...(showUsersCard
            ? [{ label: "Usuários", value: snapshot.usersCount, icon: "users", accent: "text-indigo-600 bg-indigo-500/10" }]
            : []),
    ];

    const statusBreakdown = [
        { key: "pending", value: snapshot.pendingReferrals },
        { key: "contacted", value: snapshot.contactedReferrals },
        { key: "converted", value: snapshot.convertedReferrals },
        { key: "rejected", value: snapshot.rejectedReferrals },
    ];
    const breakdownTotal = statusBreakdown.reduce((sum, item) => sum + item.value, 0) || 1;

    return (
        <section className="space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-azul-principal">
                        Visão geral
                    </p>
                    <h2 className="font-primaria mt-1 text-2xl font-bold text-crm-ink sm:text-3xl">
                        {showUsersCard ? "Painel da campanha" : "Seu painel de indicações"}
                    </h2>
                </div>
                <p className="max-w-md text-sm leading-6 text-crm-ink-soft">
                    {showUsersCard
                        ? "Base conectada à landing page, com Supabase como fonte principal e Google Sheets como espelho."
                        : "Acompanhe suas indicações e veja os registros mais recentes."}
                </p>
            </div>

            {snapshot.warning && (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-300">
                    {snapshot.warning}
                </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {cards.map((card) => (
                    <article
                        key={card.label}
                        className="rounded-2xl border border-crm-line bg-crm-surface-alt p-5 transition-colors"
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-crm-ink-soft">{card.label}</p>
                            <span className={`flex h-9 w-9 items-center justify-center rounded-full ${card.accent}`}>
                                <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8">
                                    {ICON_PATHS[card.icon]}
                                </svg>
                            </span>
                        </div>
                        <p className="font-primaria mt-4 text-3xl font-bold text-crm-ink">{card.value}</p>
                    </article>
                ))}
            </div>

            <div className="grid gap-5 xl:grid-cols-3">
                <section className="rounded-2xl border border-crm-line bg-crm-surface-alt p-5 xl:col-span-2">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-azul-principal">
                                Fila recente
                            </p>
                            <h3 className="font-primaria mt-1 text-lg font-bold text-crm-ink">
                                Últimas indicações
                            </h3>
                        </div>
                        <Link
                            href="/dashboard/indicacoes"
                            className="shrink-0 rounded-full border border-crm-line px-4 py-2 text-xs font-semibold text-crm-ink-soft transition-colors hover:border-azul-principal/40 hover:text-azul-principal"
                        >
                            Ver todas
                        </Link>
                    </div>

                    <div className="mt-4 divide-y divide-crm-line-soft">
                        {snapshot.recentReferrals.length === 0 && (
                            <div className="rounded-xl border border-dashed border-crm-line p-6 text-sm text-crm-ink-faint">
                                Nenhuma indicação disponível ainda.
                            </div>
                        )}

                        {snapshot.recentReferrals.map((referral) => (
                            <div key={referral.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                                <InitialsAvatar name={referral.referred_name} size="sm" />
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-semibold text-crm-ink">
                                        {referral.referred_name}
                                    </p>
                                    <p className="truncate text-xs text-crm-ink-faint">
                                        Indicado por {referral.affiliate_name}
                                    </p>
                                </div>
                                <div className="hidden shrink-0 text-xs text-crm-ink-faint sm:block">
                                    {formatDate(referral.created_at)}
                                </div>
                                <StatusBadge status={referral.status} />
                            </div>
                        ))}
                    </div>
                </section>

                <section className="rounded-2xl border border-crm-line bg-crm-surface-alt p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-azul-principal">
                        Distribuição
                    </p>
                    <h3 className="font-primaria mt-1 text-lg font-bold text-crm-ink">Status das indicações</h3>

                    <div className="mt-5 flex h-2.5 overflow-hidden rounded-full bg-crm-surface-raised">
                        {statusBreakdown.map((item) => {
                            const pct = (item.value / breakdownTotal) * 100;
                            if (pct === 0) return null;
                            return (
                                <div
                                    key={item.key}
                                    className={STATUS_DOT_CLASSES[item.key]}
                                    style={{ width: `${pct}%` }}
                                    title={`${STATUS_LABELS[item.key]}: ${item.value}`}
                                />
                            );
                        })}
                    </div>

                    <ul className="mt-5 space-y-3">
                        {statusBreakdown.map((item) => (
                            <li key={item.key} className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-2 text-crm-ink-soft">
                                    <span className={`h-2 w-2 rounded-full ${STATUS_DOT_CLASSES[item.key]}`} />
                                    {STATUS_LABELS[item.key]}
                                </span>
                                <span className="font-semibold text-crm-ink">{item.value}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </section>
    );
}
