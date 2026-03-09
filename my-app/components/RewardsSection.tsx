import Image from "next/image";

/**
 * RewardsSection - Seção de recompensas do programa
 *
 * Responsabilidades:
 * - Apresentar as recompensas visuais por indicação
 * - Exibir imagem do produto, título e descrição
 */

// Dados das recompensas com imagens do ImageKit
const RECOMPENSAS = [
    {
        id: 1,
        titulo: "1º Indicação",
        descricao: "Ganhe uma Alexa",
        imagemUrl:
            "https://ik.imagekit.io/pageflow/Educa%C3%A7%C3%A3o-ComVida/alexa.png?updatedAt=1770940158395",
        imagemAlt: "Amazon Alexa Echo Dot",
    },
    {
        id: 2,
        titulo: "2º Indicação",
        descricao: "Ganhe Desconto nas próximas compras",
        subtexto: "CNPJ / Pix PF",
        imagemUrl:
            "https://ik.imagekit.io/pageflow/Educa%C3%A7%C3%A3o-ComVida/Cupom%20de%20Desconto.png?updatedAt=1770940158353",
        imagemAlt: "Cupom de desconto Casa da Gráfica",
    },
    {
        id: 3,
        titulo: "3º Indicação",
        descricao: "Ganhe um Ipad",
        imagemUrl:
            "https://ik.imagekit.io/pageflow/Educa%C3%A7%C3%A3o-ComVida/Tablet%20(sem%20logo).png",
        imagemAlt: "Ipad",
    },
    {
        id: 4,
        titulo: "4º Indicação",
        descricao: "Ganhe um Apple Watch",
        imagemUrl:
            "https://ik.imagekit.io/pageflow/Educa%C3%A7%C3%A3o-ComVida/smartwatch.png?updatedAt=1770940158347",
        imagemAlt: "Smartwatch",
    },
];

export function RewardsSection() {
    return (
        <section className="section-padding pt-5! md:pt-6! relative">
            <div className="container-brand">
                {/* Título da seção */}
                <div className="text-center mb-12" data-aos="fade-up">
                    <h2 className="font-primaria text-2xl md:text-3xl font-bold text-white mb-4">
                        Recompensas do Programa
                    </h2>
                    <p className="font-secundaria text-white/80 max-w-2xl mx-auto">
                        No Educação ComVida, sua parceria gera frutos. A cada novo cliente que
                        chega por sua indicação, você recebe recompensas exclusivas. Quanto mais
                        você compartilha sua experiência e ajuda a expandir nossa comunidade,
                        maiores são os benefícios acumulados.
                    </p>
                </div>

                {/* Grid de recompensas com imagens */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {RECOMPENSAS.map((item) => (
                        <article
                            key={item.id}
                            data-aos="fade-up"
                            data-aos-delay={item.id * 100}
                            className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center flex flex-col items-center border border-white/20 transition-transform hover:scale-105"
                        >
                            {/* Título da indicação */}
                            <p className="font-primaria text-base font-bold text-white mb-0.5">
                                {item.titulo}
                            </p>

                            {/* Descrição da recompensa */}
                            <p className="text-white/90 font-semibold text-xs mb-0.5">
                                {item.descricao}
                            </p>

                            {/* Subtexto opcional */}
                            {"subtexto" in item && item.subtexto && (
                                <p className="text-xs text-white/50 mb-2">
                                    {item.subtexto}
                                </p>
                            )}

                            {/* Imagem do produto */}
                            <div className="relative w-full aspect-[4/3] mt-auto">
                                <Image
                                    src={item.imagemUrl}
                                    alt={item.imagemAlt}
                                    fill
                                    className="object-contain scale-125 drop-shadow-md"
                                    sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 22vw"
                                    quality={100}
                                    unoptimized
                                />
                            </div>

                            {/* CTA para o formulário */}
                            <a
                                href="#formulario"
                                className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-azul-destaque px-4 py-2 text-xs font-semibold text-azul-escuro shadow-md transition-colors hover:bg-white hover:text-azul-institucional"
                            >
                                Indicar agora
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                </svg>
                            </a>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
