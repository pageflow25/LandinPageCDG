import { getProfilesList } from "@/lib/crm";
import UsersManager from "@/components/dashboard/UsersManager";

export default async function UsuariosPage() {
    const { items, warning } = await getProfilesList();

    return (
        <section className="space-y-6 py-2">
            <div className="rounded-[2rem] bg-white p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.24em] text-azul-principal/60">
                    Usuários
                </p>
                <h2 className="font-primaria mt-2 text-3xl font-bold text-azul-escuro">
                    Gestão de acesso ao CRM
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                    Cadastre, edite, redefina senhas e ative ou desative o acesso de cada membro
                    da equipe ao micro CRM.
                </p>

                {warning && (
                    <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                        {warning}
                    </div>
                )}
            </div>

            <UsersManager items={items} />
        </section>
    );
}