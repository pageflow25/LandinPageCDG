/**
 * RewardsSection - Seção de recompensas
 * 
 * Responsabilidades:
 * - Apresentar as recompensas disponíveis
 * - Ordem: Recompensa → Número de indicações
 * - Destaque visual para recompensa principal
 */

// Dados das recompensas do programa
const RECOMPENSAS = [
    {
        id: 1,
        recompensa: "R$ 50 em crédito",
        indicacoes: 1,
        destaque: false,
    },
    {
        id: 2,
        recompensa: "R$ 150 em crédito",
        indicacoes: 3,
        destaque: false,
    },
    {
        id: 3,
        recompensa: "R$ 300 em crédito + Brinde exclusivo",
        indicacoes: 5,
        destaque: true, // Recompensa principal
    },
    {
        id: 4,
        recompensa: "R$ 750 em crédito + Kit Premium",
        indicacoes: 10,
        destaque: false,
    },
];

export function RewardsSection() {
    return (
        <section className="section-padding relative">
            <div className="container-brand">
                {/* Título da seção */}
                <div className="text-center mb-12">
                    <h2 className="font-primaria text-2xl md:text-3xl font-bold text-white mb-4">
                        Recompensas do Programa
                    </h2>
                    <p className="text-white/80 max-w-2xl mx-auto">
                        A cada indicação que se torna cliente, você recebe recompensas.
                        Quanto mais indicações, maiores os benefícios.
                    </p>
                </div>

                {/* Grid de recompensas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {RECOMPENSAS.map((item) => (
                        <article
                            key={item.id}
                            className={`
                relative p-6 rounded-xl border-2 transition-transform hover:scale-105
                ${item.destaque
                                    ? "bg-azul-principal text-white border-azul-principal shadow-xl"
                                    : "bg-white/20 backdrop-blur-sm border-white/30 hover:border-azul-destaque"
                                }
              `}
                        >
                            {/* Badge de destaque */}
                            {item.destaque && (
                                <span className="font-apoio absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-base font-semibold bg-azul-destaque rounded-full">
                                    Mais popular
                                </span>
                            )}

                            {/* Recompensa primeiro (conforme especificação) */}
                            <p className={`text-xl font-bold mb-3 ${item.destaque ? "text-white" : "text-white"}`}>
                                {item.recompensa}
                            </p>

                            {/* Número de indicações */}
                            <p className={`text-sm ${item.destaque ? "text-white/90" : "text-white/70"}`}>
                                {item.indicacoes === 1
                                    ? "1 indicação"
                                    : `${item.indicacoes} indicações`
                                }
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
