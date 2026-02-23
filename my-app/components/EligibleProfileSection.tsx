/**
 * EligibleProfileSection - Perfil do indicado ideal
 * 
 * Responsabilidades:
 * - Apresentar quem pode ser indicado
 * - Bullet points claros e educativos
 */

// Critérios do perfil ideal
const PERFIL_IDEAL = [
    "Escolas e Instituições de Ensino: Diretores e Gestores que buscam transformar conteúdo em experiências físicas de alto padrão para seus alunos.",
    "Editoras: Parceiros que precisam de escala, padronização e agilidade na produção de materiais didáticos e apostilas.",
    "Infoprodutores e Cursos Livres: Empreendedores da educação que desejam valorizar sua marca através de materiais impressos que geram autoridade.",
    "Profissionais de Treinamento e Desenvolvimento: Empresas que investem na capacitação de pessoas e precisam de soluções gráficas que facilitem o aprendizado.",
];

export function EligibleProfileSection() {
    return (
        <section className="bg-azul-escuro section-padding bg-pattern-logo">
            <div className="container-brand">
                <div className="max-w-3xl mx-auto">
                    {/* Título */}
                    <h2 className="font-primaria text-2xl md:text-3xl font-bold text-white mb-4 text-center">
                        Quem pode ser indicado?
                    </h2>

                    <p className="text-white/80 text-center mb-8">
                        Você conhece alguém que busca soluções gráficas de alto padrão para
                        potencializar o aprendizado e transformar a educação? Esse é um perfil ideal
                        para vivenciar a experiência do programa Educação ComVida.
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

                    <div className="text-center mt-8">
                        <a
                            href="#formulario"
                            className="font-primaria inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-azul-principal rounded-full transition-colors duration-200 shadow-lg hover:bg-azul-institucional"
                        >
                            Quero Indicar Agora!
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
