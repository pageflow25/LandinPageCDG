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
        <section className="bg-azul-escuro">

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
                            className="h-auto"
                        />
                    </div>

                    {/* Headline */}
                    <h1 className="font-primaria text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                        Educação que conecta.
                        <br />
                        <span className="text-azul-destaque">Indicações que geram valor.</span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
                        Seja um embaixador da Casa da Gráfica. Indique novos clientes e receba
                        recompensas a cada indicação que se torna cliente.
                    </p>

                    {/* CTA Principal */}
                    <a
                        href="#formulario"
                        className="font-primaria inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-azul-principal rounded-lg hover:bg-azul-institucional transition-colors duration-200 shadow-lg hover:shadow-xl"
                    >
                        Começar a indicar
                    </a>
                </div>
            </div>
        </section>
    );
}
