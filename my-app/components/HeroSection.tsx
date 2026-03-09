import Image from "next/image";
import { LOGO_PRINCIPAL } from "@/lib/config";

/**
 * HeroSection - Seção de convite principal
 * 
 * Responsabilidades:
 * - Exibir logo da marca
 * - Headline inspiradora
 * - CTA para iniciar o processo de indicação
 */
export function HeroSection() {
    return (
        <section className="bg-azul-escuro bg-pattern-logo relative overflow-hidden">

            <div className="container-brand section-padding">
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                    {/* Logo */}
                    <div className="mb-8">
                        <Image
                            src={LOGO_PRINCIPAL}
                            alt="Educação ComVida - Programa de Indicação"
                            width={200}
                            height={60}
                            priority
                            className="drop-shadow-[5px_5px_15px_rgba(24,189,213,0.3)]"
                        />
                    </div>

                    {/* Headline */}
                    <h1 className="font-primaria text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-0">
                        Educação que conecta.
                        <br />
                        <span className="text-azul-destaque">Indicações que geram valor.</span>
                    </h1>

                    {/* Subheadline */}
                    <p className="font-secundaria text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
                        Seja um Amigo da Casa da Gráfica. Indique novos clientes e receba
                        recompensas a cada indicação que se tornar cliente.
                    </p>

                    {/* CTA Principal */}
                    <a
                        href="#formulario"
                        className="font-primaria inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-azul-principal rounded-lg mb-12 md:mb-16 hover:bg-azul-institucional transition-colors duration-200 shadow-lg hover:shadow-xl"
                    >
                        Começar a indicar
                    </a>
                </div>
            </div>

            {/* Imagem decorativa — canto direito */}
            <div className="hidden md:block !absolute bottom-0 right-4 !z-0">
                <Image
                    src="https://ik.imagekit.io/pageflow/Educa%C3%A7%C3%A3o-ComVida/homem_hero.png"
                    alt="Pessoa indicando no programa Educação ComVida"
                    width={450}
                    height={550}
                    className="object-contain drop-shadow-[0_0_15px_rgba(0,0,0,0.6)]"
                    priority
                />
            </div>
        </section>
    );
}
