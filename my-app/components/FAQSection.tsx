"use client";

import { useState } from "react";
import { REGULAMENTO_URL } from "@/lib/config";

/**
 * FAQSection - Perguntas frequentes
 * 
 * Responsabilidades:
 * - Accordion com perguntas frequentes
 * - Link para regulamento completo
 * 
 * Client Component necessário para:
 * - State do accordion
 */

// Perguntas frequentes
const PERGUNTAS = [
    {
        id: 1,
        pergunta: "Como faço para participar do programa?",
        resposta: "Basta preencher o formulário de indicação nesta página com seus dados e os dados da pessoa que você deseja indicar. Após o envio, sua indicação é registrada automaticamente.",
    },
    {
        id: 2,
        pergunta: "Quando recebo minha recompensa?",
        resposta: "Você recebe a recompensa assim que a pessoa indicada realiza a primeira compra e o pagamento é confirmado. O crédito é adicionado automaticamente à sua conta.",
    },
    {
        id: 3,
        pergunta: "Posso indicar quantas pessoas quiser?",
        resposta: "Sim! Não há limite de indicações. Quanto mais pessoas você indicar que se tornem clientes, mais recompensas você acumula.",
    },
    {
        id: 4,
        pergunta: "O que acontece se meu indicado não comprar?",
        resposta: "Nenhuma recompensa é gerada se o indicado não se tornar cliente. Mas não se preocupe, você pode continuar indicando outras pessoas.",
    },
    {
        id: 5,
        pergunta: "Como acompanho minhas indicações?",
        resposta: "Você receberá atualizações por e-mail sobre o status das suas indicações. Também pode entrar em contato com nossa equipe para mais informações.",
    },
];

export function FAQSection() {
    const [openId, setOpenId] = useState<number | null>(null);

    function toggleQuestion(id: number) {
        setOpenId(openId === id ? null : id);
    }

    return (
        <section className="bg-white section-padding">
            <div className="container-brand">
                <div className="max-w-3xl mx-auto">
                    {/* Título */}
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-azul-escuro mb-4">
                            Perguntas frequentes
                        </h2>
                        <p className="text-texto-secundario">
                            Tire suas dúvidas sobre o programa de indicação.
                        </p>
                    </div>

                    {/* Accordion */}
                    <div className="space-y-3">
                        {PERGUNTAS.map((item) => (
                            <div
                                key={item.id}
                                className="border border-cinza-leve rounded-lg overflow-hidden"
                            >
                                {/* Pergunta (botão) */}
                                <button
                                    type="button"
                                    onClick={() => toggleQuestion(item.id)}
                                    className="w-full px-6 py-4 flex items-center justify-between text-left bg-fundo-claro hover:bg-cinza-leve transition-colors"
                                    aria-expanded={openId === item.id}
                                >
                                    <span className="font-medium text-azul-escuro pr-4">
                                        {item.pergunta}
                                    </span>

                                    {/* Ícone */}
                                    <span
                                        className={`flex-shrink-0 w-5 h-5 text-azul-principal transition-transform duration-200 ${openId === item.id ? "rotate-180" : ""
                                            }`}
                                    >
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </span>
                                </button>

                                {/* Resposta */}
                                {openId === item.id && (
                                    <div className="px-6 py-4 bg-white border-t border-cinza-leve">
                                        <p className="text-texto-secundario">
                                            {item.resposta}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Link para regulamento */}
                    <div className="text-center mt-8">
                        <a
                            href={REGULAMENTO_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-azul-principal hover:text-azul-institucional font-medium transition-colors"
                        >
                            Ver regulamento completo
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
