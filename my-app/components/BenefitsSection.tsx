/**
 * BenefitsSection - Benefícios do programa
 * 
 * Responsabilidades:
 * - Explicar o que o cliente ganha ao indicar
 * - Tom educativo e institucional
 * - Reforçar papel de embaixador
 */

// Benefícios do programa
const BENEFICIOS = [
    {
        id: 1,
        titulo: "Recompensas reais",
        descricao: "Você recebe créditos a cada indicação que se torna cliente. Sem sorteios, sem chances — apenas recompensas garantidas.",
        icone: "gift",
    },
    {
        id: 2,
        titulo: "Seja um embaixador",
        descricao: "Ao indicar, você se torna parte do nosso programa de embaixadores, fortalecendo a comunidade Casa da Gráfica.",
        icone: "star",
    },
    {
        id: 3,
        titulo: "Ajude quem você conhece",
        descricao: "Seus indicados recebem o mesmo atendimento de qualidade que você. Indique quem precisa de soluções gráficas.",
        icone: "people",
    },
    {
        id: 4,
        titulo: "Crescimento coletivo",
        descricao: "Cada indicação fortalece nossa comunidade e permite que continuemos oferecendo o melhor serviço.",
        icone: "growth",
    },
];

// Componente de ícone simples
function BenefitIcon({ type }: { type: string }) {
    const iconClass = "w-8 h-8 text-azul-principal";

    switch (type) {
        case "gift":
            return (
                <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
            );
        case "star":
            return (
                <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
            );
        case "people":
            return (
                <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            );
        case "growth":
            return (
                <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
            );
        default:
            return null;
    }
}

export function BenefitsSection() {
    return (
        <section className="section-padding">
            <div className="container-brand">
                {/* Título */}
                <div className="text-center mb-12">
                    <h2 className="font-primaria text-2xl md:text-3xl font-bold text-azul-escuro mb-4">
                        Benefícios do Programa
                    </h2>
                    <p className="text-texto-secundario max-w-2xl mx-auto">
                        Mais do que recompensas, você faz parte de uma comunidade que valoriza
                        relacionamentos e crescimento mútuo.
                    </p>
                </div>

                {/* Grid de benefícios */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {BENEFICIOS.map((beneficio) => (
                        <article
                            key={beneficio.id}
                            className="flex gap-4 p-6 rounded-xl bg-fundo-claro border border-cinza-leve"
                        >
                            {/* Ícone */}
                            <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center bg-white rounded-xl shadow-sm">
                                <BenefitIcon type={beneficio.icone} />
                            </div>

                            {/* Conteúdo */}
                            <div>
                                <h3 className="font-primaria text-lg font-semibold text-azul-escuro mb-2">
                                    {beneficio.titulo}
                                </h3>
                                <p className="text-texto-secundario text-sm">
                                    {beneficio.descricao}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
