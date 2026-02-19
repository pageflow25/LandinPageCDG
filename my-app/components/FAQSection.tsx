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
        resposta: "Você recebe a recompensa assim que a pessoa indicada realiza a primeira compra e o pagamento é confirmado. O consultor comercial, que te atende, entrará em contato e liberará o prêmio para você.",
    },
    {
        id: 3,
        pergunta: "Posso indicar quantas pessoas quiser?",
        resposta: "Sim! Não há limite de indicações. Quanto mais pessoas você indicar que se tornem clientes, mais recompensas você acumula.",
    },
    {
        id: 4,
        pergunta: "O que acontece se meu indicado não comprar?",
        resposta: "Se o seu indicado não realizar compra com a CDF, nenhuma recompensa é gerada para você. Mas, não se preocupe, você pode continuar indicando outras pessoas.",
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
        <section className="section-padding relative">
            <div className="container-brand">
                <div className="max-w-3xl mx-auto">
                    {/* Título */}
                    <div className="text-center mb-12">
                        <h2 className="font-primaria text-2xl md:text-3xl font-bold text-white mb-4">
                            Perguntas frequentes
                        </h2>
                        <p className="text-white/80">
                            Tire suas dúvidas sobre o programa de indicação.
                        </p>
                    </div>

                    {/* Accordion */}
                    <div className="space-y-3">
                        {PERGUNTAS.map((item) => (
                            <div
                                key={item.id}
                                className="border border-white/20 rounded-lg overflow-hidden"
                            >
                                {/* Pergunta (botão) */}
                                <button
                                    type="button"
                                    onClick={() => toggleQuestion(item.id)}
                                    className="w-full px-6 py-4 flex items-center justify-between text-left bg-white/15 backdrop-blur-sm hover:bg-white/25 transition-colors"
                                    aria-expanded={openId === item.id}
                                >
                                    <span className="font-primaria font-medium text-white pr-4">
                                        {item.pergunta}
                                    </span>

                                    {/* Ícone */}
                                    <span
                                        className={`flex-shrink-0 w-5 h-5 text-azul-destaque transition-transform duration-200 ${openId === item.id ? "rotate-180" : ""
                                            }`}
                                    >
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </span>
                                </button>

                                {/* Resposta */}
                                {openId === item.id && (
                                    <div className="px-6 py-4 bg-white/10 backdrop-blur-sm border-t border-white/20">
                                        <p className="text-white/80">
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
                            className="inline-flex items-center gap-2 rounded-full bg-azul-destaque px-4 py-2 text-xs font-semibold text-black shadow-md transition-colors hover:bg-azul-principal"
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
