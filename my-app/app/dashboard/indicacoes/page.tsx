import { canUpdateReferralStatus, canViewAllReferrals } from "@/lib/auth";
import ReferralStatusEditor from "@/components/dashboard/ReferralStatusEditor";
import { getReferralList } from "@/lib/crm";

const STATUS_LABELS: Record<string, string> = {
    pending: "Pendente",
    contacted: "Contactado",
    converted: "Convertido",
    rejected: "Rejeitado",
};

const STATUS_CLASSES: Record<string, string> = {
    pending: "bg-amber-100 text-amber-800",
    contacted: "bg-blue-100 text-blue-800",
    converted: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
};

function StatusBadge({ status }: { status: string }) {
    const label = STATUS_LABELS[status] ?? status;
    const cls = STATUS_CLASSES[status] ?? "bg-slate-100 text-slate-700";
    return (
        <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${cls}`}>
            {label}
        </span>
    );
}

function formatDate(value: string) {
    return new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
    }).format(new Date(value));
}

export default async function IndicacoesPage() {
    const { items, warning, role } = await getReferralList();

    return (
        <section className="space-y-6 py-2">
            <div className="rounded-[2rem] bg-white p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.24em] text-azul-principal/60">
                    Indicações
                </p>
                <h2 className="font-primaria mt-2 text-3xl font-bold text-azul-escuro">
                    {canViewAllReferrals(role)
                        ? "Base operacional da campanha"
                        : "Suas indicações registradas"}
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                    Esta tela foi preparada para listar os leads capturados pela landing page. Com
                    a migration aplicada, o filtro por role passa a refletir a política definitiva
                    do banco.
                </p>

                {warning && (
                    <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                        {warning}
                    </div>
                )}
            </div>

            <div className="overflow-hidden rounded-[2rem] bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50 text-left text-sm text-slate-500">
                                <th className="px-5 py-4 font-medium">Indicado</th>
                                <th className="px-5 py-4 font-medium">Contato</th>
                                <th className="px-5 py-4 font-medium">Indicador</th>
                                <th className="px-5 py-4 font-medium">Status</th>
                                <th className="px-5 py-4 font-medium">Criado em</th>
                                {canUpdateReferralStatus(role) && (
                                    <th className="px-5 py-4 font-medium">Ações</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {items.length === 0 && (
                                <tr>
                                    <td className="px-5 py-8 text-sm text-slate-500" colSpan={canUpdateReferralStatus(role) ? 6 : 5}>
                                        Nenhuma indicação disponível ainda.
                                    </td>
                                </tr>
                            )}

                            {items.map((item) => (
                                <tr key={item.id} className="border-b border-slate-100 text-sm">
                                    <td className="px-5 py-4">
                                        <p className="font-semibold text-azul-escuro">
                                            {item.referred_name}
                                        </p>
                                        <p className="text-slate-500">{item.referred_email}</p>
                                    </td>
                                    <td className="px-5 py-4 text-slate-600">
                                        {item.referred_phone}
                                    </td>
                                    <td className="px-5 py-4">
                                        <p className="font-medium text-azul-escuro">
                                            {item.affiliate_name}
                                        </p>
                                        <p className="text-slate-500">{item.affiliate_email}</p>
                                    </td>
                                    <td className="px-5 py-4 text-slate-600">
                                        <StatusBadge status={item.status} />
                                    </td>
                                    <td className="px-5 py-4 text-slate-600">
                                        {formatDate(item.created_at)}
                                    </td>
                                    {canUpdateReferralStatus(role) && (
                                        <td className="px-5 py-4">
                                            <ReferralStatusEditor
                                                referralId={item.id}
                                                currentStatus={item.status}
                                            />
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}