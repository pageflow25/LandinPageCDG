"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

/**
 * ReferralForm - Formulário de indicação
 * 
 * Responsabilidades:
 * - Coletar dados do afiliado e indicado
 * - Submeter para API route
 * - Redirecionar para página de agradecimento
 * 
 * Client Component necessário para:
 * - State do formulário
 * - Eventos de submit
 * - Navegação programática
 */

// Estado inicial do formulário
interface FormData {
    // Dados do Afiliado (quem indica)
    nomeAfiliado: string;
    emailAfiliado: string;
    telefoneAfiliado: string;
    // Dados do Indicado (quem é indicado)
    nomeIndicado: string;
    emailIndicado: string;
    telefoneIndicado: string;
}

const INITIAL_FORM_DATA: FormData = {
    nomeAfiliado: "",
    emailAfiliado: "",
    telefoneAfiliado: "",
    nomeIndicado: "",
    emailIndicado: "",
    telefoneIndicado: "",
};

export function ReferralForm() {
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Handler para atualizar campos
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError(null);
    }

    // Handler para submit
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch("/api/indicacao", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Erro ao registrar indicação. Tente novamente.");
            }

            // Redirect para página de agradecimento
            router.push("/thank-you");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro desconhecido");
            setIsSubmitting(false);
        }
    }

    return (
        <section id="formulario" className="bg-azul-escuro section-padding">
            <div className="container-brand">
                <div className="max-w-2xl mx-auto">
                    {/* Título */}
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Faça sua indicação
                        </h2>
                        <p className="text-white/80">
                            Preencha os dados abaixo para registrar sua indicação.
                            É rápido e simples.
                        </p>
                    </div>

                    {/* Formulário */}
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white rounded-2xl p-6 md:p-8 shadow-xl"
                    >
                        {/* Seção Afiliado */}
                        <fieldset className="mb-8">
                            <legend className="text-lg font-semibold text-azul-escuro mb-4">
                                Seus dados (quem indica)
                            </legend>

                            <div className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="nomeAfiliado"
                                        className="block text-sm font-medium text-texto-secundario mb-1"
                                    >
                                        Nome completo
                                    </label>
                                    <input
                                        type="text"
                                        id="nomeAfiliado"
                                        name="nomeAfiliado"
                                        value={formData.nomeAfiliado}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-cinza-leve focus:border-azul-principal focus:ring-2 focus:ring-azul-principal/20 outline-none transition-all"
                                        placeholder="Seu nome"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="emailAfiliado"
                                        className="block text-sm font-medium text-texto-secundario mb-1"
                                    >
                                        E-mail
                                    </label>
                                    <input
                                        type="email"
                                        id="emailAfiliado"
                                        name="emailAfiliado"
                                        value={formData.emailAfiliado}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-cinza-leve focus:border-azul-principal focus:ring-2 focus:ring-azul-principal/20 outline-none transition-all"
                                        placeholder="seu@email.com"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="telefoneAfiliado"
                                        className="block text-sm font-medium text-texto-secundario mb-1"
                                    >
                                        Telefone
                                    </label>
                                    <input
                                        type="tel"
                                        id="telefoneAfiliado"
                                        name="telefoneAfiliado"
                                        value={formData.telefoneAfiliado}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-cinza-leve focus:border-azul-principal focus:ring-2 focus:ring-azul-principal/20 outline-none transition-all"
                                        placeholder="(00) 00000-0000"
                                    />
                                </div>
                            </div>
                        </fieldset>

                        {/* Divisor visual */}
                        <hr className="border-cinza-leve mb-8" />

                        {/* Seção Indicado */}
                        <fieldset className="mb-8">
                            <legend className="text-lg font-semibold text-azul-escuro mb-4">
                                Dados de quem você indica
                            </legend>

                            <div className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="nomeIndicado"
                                        className="block text-sm font-medium text-texto-secundario mb-1"
                                    >
                                        Nome completo
                                    </label>
                                    <input
                                        type="text"
                                        id="nomeIndicado"
                                        name="nomeIndicado"
                                        value={formData.nomeIndicado}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-cinza-leve focus:border-azul-principal focus:ring-2 focus:ring-azul-principal/20 outline-none transition-all"
                                        placeholder="Nome do indicado"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="emailIndicado"
                                        className="block text-sm font-medium text-texto-secundario mb-1"
                                    >
                                        E-mail
                                    </label>
                                    <input
                                        type="email"
                                        id="emailIndicado"
                                        name="emailIndicado"
                                        value={formData.emailIndicado}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-cinza-leve focus:border-azul-principal focus:ring-2 focus:ring-azul-principal/20 outline-none transition-all"
                                        placeholder="email@indicado.com"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="telefoneIndicado"
                                        className="block text-sm font-medium text-texto-secundario mb-1"
                                    >
                                        Telefone
                                    </label>
                                    <input
                                        type="tel"
                                        id="telefoneIndicado"
                                        name="telefoneIndicado"
                                        value={formData.telefoneIndicado}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-cinza-leve focus:border-azul-principal focus:ring-2 focus:ring-azul-principal/20 outline-none transition-all"
                                        placeholder="(00) 00000-0000"
                                    />
                                </div>
                            </div>
                        </fieldset>

                        {/* Mensagem de erro */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                                {error}
                            </div>
                        )}

                        {/* Botão submit */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 px-6 text-lg font-semibold text-white bg-azul-principal rounded-lg hover:bg-azul-institucional disabled:bg-cinza-leve disabled:cursor-not-allowed transition-colors duration-200 shadow-lg hover:shadow-xl"
                        >
                            {isSubmitting ? "Enviando..." : "Registrar indicação"}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
