import Image from "next/image";
import { LOGO_SECUNDARIA } from "@/lib/config";

/**
 * Footer - Rodapé institucional
 * 
 * Responsabilidades:
 * - Logo secundária
 * - Informações de copyright
 * - Reforço institucional
 */

export function Footer() {
    const anoAtual = new Date().getFullYear();

    return (
        <footer className="bg-azul-escuro text-white py-12">
            <div className="container-brand">
                <div className="flex flex-col items-center text-center">
                    {/* Logo */}
                    <div className="mb-6">
                        <Image
                            src={LOGO_SECUNDARIA}
                            alt="Educação ComVida"
                            width={150}
                            height={45}
                            className="h-auto"
                        />
                    </div>

                    {/* Texto institucional */}
                    <p className="text-white/70 text-sm max-w-md mb-6">
                        O Educação ComVida é o programa oficial de indicação da Casa da Gráfica.
                        Juntos, construímos uma comunidade de confiança e crescimento mútuo.
                    </p>

                    {/* Copyright */}
                    <p className="text-white/50 text-xs">
                        © {anoAtual} Casa da Gráfica. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
