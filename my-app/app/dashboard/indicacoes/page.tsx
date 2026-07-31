import { canUpdateReferralStatus, canDeleteReferral, canManageUsers, canViewAllReferrals, getAuthContext } from "@/lib/auth";
import ReferralsTable from "@/components/dashboard/ReferralsTable";
import { getReferralList } from "@/lib/crm";

export default async function IndicacoesPage() {
    const auth = await getAuthContext();
    const { items, warning, role } = await getReferralList();

    return (
        <section className="space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-azul-principal">
                        Indicações
                    </p>
                    <h2 className="font-primaria mt-1 text-2xl font-bold text-crm-ink sm:text-3xl">
                        {canViewAllReferrals(role) ? "Base operacional da campanha" : "Suas indicações registradas"}
                    </h2>
                </div>
                <p className="max-w-md text-sm leading-6 text-crm-ink-soft">
                    Leads capturados pela landing page, com filtro por perfil de acesso conforme a política do banco.
                </p>
            </div>

            {warning && (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-300">
                    {warning}
                </div>
            )}

            <ReferralsTable
                items={items}
                canUpdateStatus={canUpdateReferralStatus(auth.role)}
                canDelete={canDeleteReferral(auth.role)}
                canAssignComercial={canManageUsers(auth.role)}
            />
        </section>
    );
}
