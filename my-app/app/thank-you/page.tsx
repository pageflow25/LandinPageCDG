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
        <main className="min-h-screen bg-fundo-claro flex items-center justify-center p-4">
            <div className="max-w-lg w-full text-center">
                {/* Logo */}
                <div className="mb-8">
                    <Image
                        src={LOGO_PRINCIPAL}
                        alt="Educação ComVida"
                        width={180}
                        height={54}
                        className="h-auto mx-auto"
                    />
                </div>

                {/* Ícone de sucesso */}
                <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-green-100 rounded-full">
                    <svg
                        className="w-10 h-10 text-green-600"
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
                <h1 className="font-primaria text-2xl md:text-3xl font-bold text-azul-escuro mb-4">
                    Indicação registrada com sucesso!
                </h1>

                <p className="text-texto-secundario mb-8 max-w-md mx-auto">
                    Obrigado por fazer parte do programa Educação ComVida.
                    Entraremos em contato com seu indicado e você receberá atualizações por e-mail.
                </p>

                {/* Card informativo */}
                <div className="bg-white p-6 rounded-xl border border-cinza-leve mb-8">
                    <h2 className="font-primaria font-semibold text-azul-escuro mb-3">
                        Próximos passos
                    </h2>
                    <ul className="text-left text-texto-secundario text-sm space-y-2">
                        <li className="flex items-start gap-2">
                            <span className="text-azul-principal font-bold">1.</span>
                            Nossa equipe entrará em contato com seu indicado
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-azul-principal font-bold">2.</span>
                            Você receberá um e-mail quando houver atualizações
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-azul-principal font-bold">3.</span>
                            Sua recompensa é liberada após a primeira compra
                        </li>
                    </ul>
                </div>

                {/* Botão voltar */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 text-azul-principal font-medium hover:text-azul-institucional transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Fazer nova indicação
                </Link>

                {/* Rodapé institucional */}
                <p className="mt-12 text-xs text-texto-secundario/70">
                    Educação ComVida — Programa oficial de indicação da Casa da Gráfica
                </p>
            </div>
        </main>
    );
}
