import Image from "next/image";
import Link from "next/link";
import { LOGO_PRINCIPAL } from "@/lib/config";
import type { Metadata } from "next";

/**
 * Thank You Page - Página de agradecimento
 * 
 * Exibida após envio do formulário de indicação.
 * Responsabilidades:
 * - Mensagem de agradecimento
 * - Confirmação de registro
 * - Reforço institucional
 */

export const metadata: Metadata = {
    title: "Indicação Registrada | Educação ComVida",
    description: "Sua indicação foi registrada com sucesso no programa Educação ComVida.",
};

export default function ThankYouPage() {
    return (
        <main className="min-h-screen bg-azul-escuro bg-pattern-logo text-white flex items-center justify-center px-4 py-10">
            <div className="relative w-full max-w-5xl mx-auto">
                <div className="relative z-10 max-w-2xl w-full text-center mx-auto">
                    {/* Logo */}
                    <div className="mb-6">
                        <Image
                            src={LOGO_PRINCIPAL}
                            alt="Educação ComVida"
                            width={180}
                            height={54}
                            className="h-auto mx-auto"
                        />
                    </div>

                    {/* Ícone de sucesso */}
                    <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center bg-emerald-100 rounded-full">
                        <svg
                            className="w-7 h-7 text-emerald-600"
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
                    </div>

                    {/* Mensagem principal */}
                    <h1 className="font-primaria text-2xl md:text-3xl font-bold text-white mb-3">
                        Indicação registrada com sucesso!
                    </h1>

                    <p className="text-white/90 mb-6 max-w-md mx-auto text-sm md:text-base">
                        Obrigado por fazer parte do programa Educação ComVida!
                        Entraremos em contato com seu indicado e você receberá
                        atualizações por e-mail ou Whatsapp.
                    </p>

                    {/* Card informativo */}
                    <div className="bg-white p-6 rounded-xl border border-cinza-leve mb-6 text-left shadow-lg">
                        <h2 className="font-primaria font-semibold text-azul-escuro mb-4 text-center">
                            Próximos passos
                        </h2>
                        <ul className="text-texto-secundario text-sm space-y-3">
                            <li className="flex items-start gap-3 text-azul-escuro font-medium">
                                <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-azul-destaque text-xs font-bold text-azul-escuro">1</span>
                                Nossa equipe entrará em contato com seu indicado.
                            </li>
                            <li className="flex items-start gap-3 text-azul-escuro font-medium">
                                <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-azul-destaque text-xs font-bold text-azul-escuro">2</span>
                                Você receberá um e-mail ou Whatsapp quando houver atualizações.
                            </li>
                            <li className="flex items-start gap-3 text-azul-escuro font-medium">
                                <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-azul-destaque text-xs font-bold text-azul-escuro">3</span>
                                Sua recompensa é liberada após a primeira compra do indicado.
                            </li>
                        </ul>

                        <div className="mt-5 text-center">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 rounded-full bg-azul-destaque px-5 py-2 text-xs font-semibold text-azul-escuro shadow-md transition-colors hover:bg-azul-principal hover:text-white"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Fazer nova indicação
                            </Link>
                        </div>
                    </div>

                    {/* Rodapé institucional */}
                    <p className="mt-6 text-xs text-white/70">
                        Educação ComVida — Programa oficial de indicação da Casa da Gráfica
                    </p>
                </div>

                {/* Imagem à direita (desktop) */}
                <div className="hidden md:block absolute left-115 bottom-5.5 z-20 lg:w-[68%] pointer-events-none">
                    <Image
                        src="https://ik.imagekit.io/pageflow/Educa%C3%A7%C3%A3o-ComVida/Mo%C3%A7o%20P%C3%B3s-Indica%C3%A7%C3%A3o.png"
                        alt="Pessoa apontando para os próximos passos"
                        width={820}
                        height={1080}
                        className="w-full h-auto object-contain"
                        priority
                    />
                </div>
            </div>
        </main>
    );
}
