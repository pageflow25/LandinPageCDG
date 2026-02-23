/**
 * HowItWorksSection - Passo a passo do programa
 * 
 * Responsabilidades:
 * - Mostrar fluxo visual do programa
 * - 3 passos simples e claros
 */

// Passos do programa
const PASSOS = [
    {
        numero: 1,
        titulo: "Você indica",
        descricao: "Preencha o formulário com os dados de quem você quer indicar.",
    },
    {
        numero: 2,
        titulo: "O indicado se torna cliente",
        descricao: "Entramos em contato e acompanhamos até a primeira compra.",
    },
    {
        numero: 3,
        titulo: "Você recebe a recompensa",
        descricao: "Após a compra confirmada, sua recompensa é liberada automaticamente.",
    },
];

export function HowItWorksSection() {
    return (
        <section className="bg-azul-escuro section-padding bg-pattern-logo">
            <div className="container-brand">
                {/* Título */}
                <div className="text-center mb-12" data-aos="fade-up">
                    <h2 className="font-primaria text-2xl md:text-3xl font-bold text-white mb-4">
                        Como funciona
                    </h2>
                    <p className="text-white/80">
                        Três passos simples para você indicar e receber.
                    </p>
                </div>

                {/* Timeline/Passos */}
                <div className="max-w-3xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {PASSOS.map((passo, index) => (
                            <article
                                key={passo.numero}
                                data-aos="fade-up"
                                data-aos-delay={index * 150}
                                className="relative text-center"
                            >
                                {/* Linha conectora (desktop) */}
                                {index < PASSOS.length - 1 && (
                                    <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-white/20" />
                                )}

                                {/* Número */}
                                <div className="relative z-10 w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-azul-principal text-white text-2xl font-bold rounded-full shadow-lg">
                                    {passo.numero}
                                </div>

                                {/* Título */}
                                <h3 className="font-primaria text-lg font-semibold text-white mb-2">
                                    {passo.titulo}
                                </h3>

                                {/* Descrição */}
                                <p className="text-white/70 text-sm">
                                    {passo.descricao}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
