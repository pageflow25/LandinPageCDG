/**
 * EligibleProfileSection - Perfil do indicado ideal
 * 
 * Responsabilidades:
 * - Apresentar quem pode ser indicado
 * - Bullet points claros e educativos
 */

// Critérios do perfil ideal
const PERFIL_IDEAL = [
    "Empresas que precisam de materiais gráficos (cartões, banners, panfletos)",
    "Empreendedores que estão abrindo um negócio",
    "Profissionais de marketing e design",
    "Escolas e instituições educacionais",
    "Igrejas, ONGs e associações",
    "Comerciantes locais que precisam de comunicação visual",
];

export function EligibleProfileSection() {
    return (
        <section className="bg-azul-escuro section-padding">
            <div className="container-brand">
                <div className="max-w-3xl mx-auto">
                    {/* Título */}
                    <h2 className="font-primaria text-2xl md:text-3xl font-bold text-white mb-4 text-center">
                        Quem pode ser indicado?
                    </h2>

                    <p className="text-white/80 text-center mb-8">
                        Você conhece alguém que se encaixa neste perfil? Essa pessoa é um candidato
                        ideal para o programa.
                    </p>

                    {/* Lista de perfis */}
                    <ul className="space-y-4">
                        {PERFIL_IDEAL.map((item, index) => (
                            <li
                                key={index}
                                className="flex items-start gap-3 p-4 bg-white/5 rounded-lg border border-white/10"
                            >
                                {/* Ícone check */}
                                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-azul-destaque rounded-full">
                                    <svg
                                        className="w-4 h-4 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </span>

                                <span className="text-white">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
