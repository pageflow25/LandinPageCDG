import { getProfilesList } from "@/lib/crm";

function formatDate(value: string) {
    return new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
    }).format(new Date(value));
}

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
                    A seed local cria usuários e perfis com role. Esta tela foi preparada para a
                    operação administrativa do micro CRM.
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
                                <th className="px-5 py-4 font-medium">Nome</th>
                                <th className="px-5 py-4 font-medium">E-mail</th>
                                <th className="px-5 py-4 font-medium">Role</th>
                                <th className="px-5 py-4 font-medium">Criado em</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.length === 0 && (
                                <tr>
                                    <td className="px-5 py-8 text-sm text-slate-500" colSpan={4}>
                                        Nenhum usuário disponível para exibição.
                                    </td>
                                </tr>
                            )}

                            {items.map((item) => (
                                <tr key={item.id} className="border-b border-slate-100 text-sm">
                                    <td className="px-5 py-4 font-medium text-azul-escuro">
                                        {item.full_name || "Sem nome cadastrado"}
                                    </td>
                                    <td className="px-5 py-4 text-slate-600">{item.email}</td>
                                    <td className="px-5 py-4 text-slate-600">{item.role}</td>
                                    <td className="px-5 py-4 text-slate-600">
                                        {formatDate(item.created_at)}
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