import { getProfilesList } from "@/lib/crm";
import UsersManager from "@/components/dashboard/UsersManager";

export default async function UsuariosPage() {
    const { items, warning } = await getProfilesList();

    return (
        <section className="space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-azul-principal">
                        Usuários
                    </p>
                    <h2 className="font-primaria mt-1 text-2xl font-bold text-crm-ink sm:text-3xl">
                        Gestão de acesso ao CRM
                    </h2>
                </div>
                <p className="max-w-md text-sm leading-6 text-crm-ink-soft">
                    Cadastre, edite, redefina senhas e ative ou desative o acesso de cada membro da equipe.
                </p>
            </div>

            {warning && (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-300">
                    {warning}
                </div>
            )}

            <UsersManager items={items} />
        </section>
    );
}
