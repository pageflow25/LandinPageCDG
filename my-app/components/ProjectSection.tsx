import Image from "next/image";

/**
 * ProjectSection - Seção "O que é o projeto?"
 *
 * Responsabilidades:
 * - Explicar o propósito do programa Educação ComVida
 * - Exibir imagens de clientes como prova social
 */

// URLs das imagens de clientes (ImageKit)
const IMAGEM_CLIENTE_1 =
    "https://ik.imagekit.io/pageflow/Educa%C3%A7%C3%A3o-ComVida/Cliente%201.png?updatedAt=1770940635824";
const IMAGEM_CLIENTE_2 =
    "https://ik.imagekit.io/pageflow/Educa%C3%A7%C3%A3o-ComVida/Cliente%202.png?updatedAt=1770940635734";

export function ProjectSection() {
    return (
        <section className="section-padding pt-8! md:pt-10! pb-3! md:pb-0! relative">
            <div className="container-brand">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
                    {/* Lado esquerdo — Texto */}
                    <div className="flex-1 w-full">
                        <h2 className="font-primaria text-2xl md:text-3xl font-bold text-white mb-8">
                            O que é 'Educação Com<strong>Vida</strong>'?
                        </h2>

                        <div className="rounded-2xl bg-azul-destaque shadow-lg p-6 md:p-8">
                            <p className="text-white/90 text-base md:text-lg leading-relaxed">
                                O <strong className="text-white font-semibold">Educação ComVida</strong> é o{" "}
                                <strong className="text-white font-semibold">
                                    programa oficial de indicação da Casa da Gráfica.
                                </strong>{" "}
                                Ele nasceu com o propósito de{" "}
                                <strong className="text-white font-semibold">
                                    transformar nossa rede de clientes em verdadeiros parceiros.
                                </strong>{" "}
                                Mais do que um convite, é um chamado à ação{" "}
                                <strong className="text-white font-semibold">
                                    para quem acredita que a educação é o elo principal para o crescimento.
                                </strong>
                            </p>
                        </div>
                    </div>

                    {/* Lado direito — Imagens de clientes (PNGs já possuem shape decorativo) */}
                    <div className="flex items-start shrink-0 -space-x-6 lg:-space-x-10">
                        {/* Imagem esquerda — alinhada ao topo */}
                        <div className="relative w-44 h-56 md:w-52 md:h-68 lg:w-60 lg:h-76">
                            <Image
                                src={IMAGEM_CLIENTE_1}
                                alt="Clientes satisfeitos do programa Educação ComVida"
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 176px, (max-width: 1024px) 208px, 240px"
                            />
                        </div>

                        {/* Imagem direita — deslocada para baixo */}
                        <div className="relative w-44 h-56 md:w-52 md:h-68 lg:w-60 lg:h-76 mt-16 lg:mt-24">
                            <Image
                                src={IMAGEM_CLIENTE_2}
                                alt="Parceiros do programa Educação ComVida"
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 176px, (max-width: 1024px) 208px, 240px"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
