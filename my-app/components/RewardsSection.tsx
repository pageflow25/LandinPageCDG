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
        titulo: "1ª Indicação",
        descricao: "Ganhe uma Alexa!",
        imagemUrl:
            "https://ik.imagekit.io/pageflow/Educa%C3%A7%C3%A3o-ComVida/alexa.png?updatedAt=1770940158395",
        imagemAlt: "Amazon Alexa Echo Dot",
    },
    {
        id: 2,
        titulo: "2ª Indicação",
        descricao: "Desconto nas próximas compras!",
        subtexto: "*válido por horários Prime",
        imagemUrl:
            "https://ik.imagekit.io/pageflow/Educa%C3%A7%C3%A3o-ComVida/Cupom%20de%20Desconto.png?updatedAt=1770940158353",
        imagemAlt: "Cupom de desconto Casa da Gráfica",
    },
    {
        id: 3,
        titulo: "3ª Indicação",
        descricao: "Ganhe um Tablet!",
        imagemUrl:
            "https://ik.imagekit.io/pageflow/Educa%C3%A7%C3%A3o-ComVida/Tablet.png?updatedAt=1770940158259",
        imagemAlt: "Tablet Samsung",
    },
    {
        id: 4,
        titulo: "4ª Indicação",
        descricao: "Ganhe um Smartwatch!",
        imagemUrl:
            "https://ik.imagekit.io/pageflow/Educa%C3%A7%C3%A3o-ComVida/smartwatch.png?updatedAt=1770940158347",
        imagemAlt: "Smartwatch",
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

                {/* Grid de recompensas com imagens */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {RECOMPENSAS.map((item) => (
                        <article
                            key={item.id}
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
                            <div className="relative w-full aspect-[3/2] mt-auto">
                                <Image
                                    src={item.imagemUrl}
                                    alt={item.imagemAlt}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 22vw"
                                />
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
