import { getReferralStatusHistory } from "@/lib/crm";
import InitialsAvatar from "@/components/dashboard/InitialsAvatar";
import { STATUS_LABELS } from "@/components/dashboard/StatusBadge";

function statusLabel(value: string | null) {
    if (!value) return "—";
    return STATUS_LABELS[value] ?? value;
}

function formatDate(value: string) {
    return new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
    }).format(new Date(value));
}

interface PageProps {
    searchParams: Promise<{ usuario?: string }>;
}

export default async function AuditoriaPage({ searchParams }: PageProps) {
    const { usuario } = await searchParams;
    const { items, warning } = await getReferralStatusHistory(200, usuario);

    return (
        <section className="space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-azul-principal">
                        Auditoria
                    </p>
                    <h2 className="font-primaria mt-1 text-2xl font-bold text-crm-ink sm:text-3xl">
                        Histórico de alterações de status
                    </h2>
                </div>
                <p className="max-w-md text-sm leading-6 text-crm-ink-soft">
                    Toda mudança de status fica registrada aqui, com identificação de quem realizou a ação.
                </p>
            </div>

            {warning && (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-300">
                    {warning}
                </div>
            )}

            <form method="get" className="flex flex-wrap items-center gap-3">
                <div className="relative w-full sm:max-w-xs">
                    <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-crm-ink-faint"
                    >
                        <circle cx="11" cy="11" r="7" />
                        <path strokeLinecap="round" d="m20 20-3.5-3.5" />
                    </svg>
                    <input
                        type="email"
                        name="usuario"
                        defaultValue={usuario ?? ""}
                        placeholder="Filtrar por e-mail do usuário..."
                        className="w-full rounded-xl border border-crm-line bg-crm-surface-alt py-2.5 pl-10 pr-3 text-sm text-crm-ink placeholder:text-crm-ink-faint focus:outline-none focus:ring-2 focus:ring-azul-principal/30"
                    />
                </div>
                <button
                    type="submit"
                    className="rounded-full bg-azul-escuro px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-azul-principal"
                >
                    Filtrar
                </button>
                {usuario && (
                    <a
                        href="/dashboard/auditoria"
                        className="rounded-full border border-crm-line px-4 py-2.5 text-sm text-crm-ink-soft transition-colors hover:border-azul-principal/40 hover:text-azul-principal"
                    >
                        Limpar
                    </a>
                )}
            </form>

            <div className="overflow-hidden rounded-2xl border border-crm-line bg-crm-surface-alt">
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="border-b border-crm-line bg-crm-surface-raised text-left text-xs uppercase tracking-wide text-crm-ink-faint">
                                <th className="px-5 py-3.5 font-semibold">Usuário</th>
                                <th className="px-5 py-3.5 font-semibold">Indicação</th>
                                <th className="px-5 py-3.5 font-semibold">Alteração</th>
                                <th className="px-5 py-3.5 font-semibold">Nota</th>
                                <th className="px-5 py-3.5 font-semibold">Data</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-crm-line-soft">
                            {items.length === 0 && (
                                <tr>
                                    <td className="px-5 py-10 text-center text-sm text-crm-ink-faint" colSpan={5}>
                                        {usuario
                                            ? `Nenhuma alteração encontrada para "${usuario}".`
                                            : "Nenhuma alteração de status registrada ainda."}
                                    </td>
                                </tr>
                            )}

                            {items.map((item) => (
                                <tr key={item.id} className="text-sm transition-colors hover:bg-crm-surface-raised">
                                    <td className="px-5 py-3.5">
                                        <div className="flex items-center gap-3">
                                            <InitialsAvatar name={item.changed_by_email ?? item.changed_by} size="sm" />
                                            <p className="truncate font-medium text-crm-ink">
                                                {item.changed_by_email ?? item.changed_by}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5 font-mono text-xs text-crm-ink-faint">
                                        {item.referral_id.slice(0, 8)}…
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <div className="flex items-center gap-2">
                                            <span className="rounded-full bg-crm-surface-raised px-3 py-1 text-xs font-semibold text-crm-ink-soft">
                                                {statusLabel(item.old_status)}
                                            </span>
                                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-crm-ink-faint">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                                            </svg>
                                            <span className="rounded-full bg-azul-principal/10 px-3 py-1 text-xs font-semibold text-azul-principal">
                                                {statusLabel(item.new_status)}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5 italic text-crm-ink-faint">{item.note ?? "—"}</td>
                                    <td className="whitespace-nowrap px-5 py-3.5 text-crm-ink-soft">
                                        {formatDate(item.changed_at)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
