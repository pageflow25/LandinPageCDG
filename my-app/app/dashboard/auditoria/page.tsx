import { getReferralStatusHistory } from "@/lib/crm";

const STATUS_LABELS: Record<string, string> = {
    pending: "Pendente",
    contacted: "Contactado",
    converted: "Convertido",
    rejected: "Rejeitado",
};

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
        <section className="space-y-6 py-2">
            <div className="rounded-[2rem] bg-white p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.24em] text-azul-principal/60">
                    Auditoria
                </p>
                <h2 className="font-primaria mt-2 text-3xl font-bold text-azul-escuro">
                    Histórico de alterações de status
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                    Todas as mudanças de status das indicações ficam registradas aqui, com
                    identificação de quem realizou cada ação.
                </p>

                {warning && (
                    <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                        {warning}
                    </div>
                )}

                <form method="get" className="mt-5 flex items-center gap-3">
                    <input
                        type="email"
                        name="usuario"
                        defaultValue={usuario ?? ""}
                        placeholder="Filtrar por e-mail do usuário..."
                        className="w-72 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-azul-escuro placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-azul-principal/30"
                    />
                    <button
                        type="submit"
                        className="rounded-full bg-azul-escuro px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-azul-principal"
                    >
                        Filtrar
                    </button>
                    {usuario && (
                        <a
                            href="/dashboard/auditoria"
                            className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-100"
                        >
                            Limpar
                        </a>
                    )}
                </form>
            </div>

            <div className="overflow-hidden rounded-[2rem] bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50 text-left text-sm text-slate-500">
                                <th className="px-5 py-4 font-medium">Data</th>
                                <th className="px-5 py-4 font-medium">Usuário</th>
                                <th className="px-5 py-4 font-medium">Indicação (ID)</th>
                                <th className="px-5 py-4 font-medium">De</th>
                                <th className="px-5 py-4 font-medium">Para</th>
                                <th className="px-5 py-4 font-medium">Nota</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.length === 0 && (
                                <tr>
                                    <td className="px-5 py-8 text-sm text-slate-500" colSpan={6}>
                                        {usuario
                                            ? `Nenhuma alteração encontrada para "${usuario}".`
                                            : "Nenhuma alteração de status registrada ainda."}
                                    </td>
                                </tr>
                            )}

                            {items.map((item) => (
                                <tr key={item.id} className="border-b border-slate-100 text-sm">
                                    <td className="px-5 py-4 text-slate-600">
                                        {formatDate(item.changed_at)}
                                    </td>
                                    <td className="px-5 py-4">
                                        <p className="font-medium text-azul-escuro">
                                            {item.changed_by_email ?? item.changed_by}
                                        </p>
                                    </td>
                                    <td className="px-5 py-4 font-mono text-xs text-slate-500">
                                        {item.referral_id.slice(0, 8)}…
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                                            {statusLabel(item.old_status)}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className="inline-block rounded-full bg-azul-principal/10 px-3 py-1 text-xs font-semibold text-azul-principal">
                                            {statusLabel(item.new_status)}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 text-slate-500 italic">
                                        {item.note ?? "—"}
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
