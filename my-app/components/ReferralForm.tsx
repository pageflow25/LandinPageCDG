"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

/**
 * ReferralForm - Formulário de indicação
 *
 * Responsabilidades:
 * - Coletar nome, e-mail e telefone do afiliado e nome/telefone do indicado
 * - Montar payload no formato esperado pela API
 * - Submeter para API route
 * - Redirecionar para página de agradecimento
 *
 * Client Component necessário para:
 * - State do formulário
 * - Eventos de submit
 * - Navegação programática
 */

const IMAGEM_INSCRICAO =
    "https://ik.imagekit.io/pageflow/Educa%C3%A7%C3%A3o-ComVida/Mo%C3%A7a%20Inscri%C3%A7%C3%A3o.png";

// Estado do formulário
interface FormData {
    nomeAfiliado: string;
    emailAfiliado: string;
    telefoneAfiliado: string;
    nomeIndicado: string;
    telefoneIndicado: string;
}

const INITIAL_FORM_DATA: FormData = {
    nomeAfiliado: "",
    emailAfiliado: "",
    telefoneAfiliado: "",
    nomeIndicado: "",
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

    // Handler para submit — monta payload no formato da API
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const payload = {
                afiliado: {
                    nome: formData.nomeAfiliado,
                    email: formData.emailAfiliado,
                    telefone: formData.telefoneAfiliado,
                },
                indicado: {
                    nome: formData.nomeIndicado,
                    telefone: formData.telefoneIndicado,
                },
            };

            const response = await fetch("/api/indicacao", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const data = await response.json().catch(() => null);
                throw new Error(
                    data?.error ??
                    "Erro ao registrar indicação. Tente novamente.",
                );
            }

            // Redirect para página de agradecimento
            router.push("/thank-you");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro desconhecido");
            setIsSubmitting(false);
        }
    }

    return (
        <section id="formulario" className="bg-azul-escuro section-padding bg-pattern-logo overflow-hidden relative">
            <div className="container-brand">
                {/* Imagem absoluta — flutua à esquerda, sem disputar espaço com o form */}
                <div className="hidden md:block absolute left-0 lg:-left-16 -bottom-10 z-30 w-[60%] lg:w-[68%] xl:w-[72%] pointer-events-none">
                    <Image
                        src={IMAGEM_INSCRICAO}
                        alt="Mulher apontando para o formulário de indicação"
                        width={800}
                        height={1200}
                        className="w-full h-auto"
                        priority
                    />
                    {/* Fade na base */}
                    <div
                        className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
                        style={{
                            background:
                                "linear-gradient(to top, var(--azul-escuro) 0%, transparent 100%)",
                        }}
                    />
                </div>

                {/* Formulário alinhado à direita */}
                <div className="relative flex flex-col md:flex-row justify-end">

                    {/* Coluna direita — título + formulário */}
                    <div className="w-full md:w-[58%] lg:w-[55%] min-w-0">
                        {/* Título */}
                        <div className="text-center mb-8">
                            <h2 className="font-primaria text-2xl md:text-3xl font-bold text-white mb-4">
                                Faça sua indicação
                            </h2>
                            <p className="text-white/80">
                                Preencha os dados abaixo para registrar sua indicação.
                                É rápido e simples.
                            </p>
                        </div>

                        <div className="min-w-0">
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white rounded-2xl p-6 md:p-8 shadow-xl"
                        >
                            {/* Seção Afiliado */}
                            <fieldset className="mb-6">
                                <legend className="font-primaria text-lg font-semibold text-azul-escuro mb-4">
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
                            <hr className="border-cinza-leve mb-6" />

                            {/* Seção Indicado */}
                            <fieldset className="mb-6">
                                <legend className="font-primaria text-lg font-semibold text-azul-escuro mb-4">
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
                                className="font-primaria w-full py-4 px-6 text-lg font-semibold text-white bg-azul-destaque rounded-full hover:bg-azul-principal disabled:bg-cinza-leve disabled:cursor-not-allowed transition-colors duration-200 shadow-lg hover:shadow-xl"
                            >
                                {isSubmitting ? "Enviando..." : "Registrar indicação"}
                            </button>
                        </form>
                    </div>
                    </div>{/* fim coluna direita */}
                </div>{/* fim flex row */}
            </div>
        </section>
    );
}
