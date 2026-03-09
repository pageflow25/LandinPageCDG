import Image from "next/image";
import Link from "next/link";
import { LOGO_PRINCIPAL } from "@/lib/config";
import type { Metadata } from "next";

/**
 * Regulamento Page - Texto completo do regulamento da campanha
 *
 * Server Component (conteúdo 100% estático).
 * Responsabilidades:
 * - Exibir regulamento formatado e legível
 * - Navegação de volta à LP principal
 */

export const metadata: Metadata = {
    title: "Regulamento | Educação ComVida",
    description:
        "Regulamento completo da campanha promocional do Programa de Indicação Educação ComVida — Casa da Gráfica.",
};

/** Seções do regulamento organizadas para renderização limpa */
const SECOES = [
    {
        titulo: "1. Objetivo do Programa de Indicação",
        paragrafos: [
            "1.1. O Programa de Indicação é uma iniciativa promovida pela Casa da Gráfica, com o propósito de reconhecer e valorizar a confiança depositada em nós. Por meio deste programa, pessoas clientes têm a oportunidade de realizar indicações e, a partir delas, serem contempladas com benefícios previamente estabelecidos. Além de fortalecer a rede de educação de alto padrão, permitindo que mais instituições tenham acesso a materiais didáticos que transformam vidas.",
        ],
    },
    {
        titulo: "2. Como Participar",
        paragrafos: [
            "2.1. A presente campanha possui abrangência em todo o território nacional e é destinada a pessoas que mantêm vínculo legítimo com a Casa da Gráfica, na condição de pessoa cliente.",
            "2.2. A participação ocorrerá mediante a indicação de novas pessoas clientes que não mantenham, nem tenham mantido anteriormente, qualquer vínculo contratual com a Casa da Gráfica, devendo a indicação ser formalizada por meio do preenchimento de formulário específico disponibilizado pela empresa.",
            "2.3. A pessoa responsável pela indicação será denominada Pessoa Indicadora, e a pessoa por ela indicada será denominada Pessoa Indicada. Para que a indicação seja considerada válida, a Pessoa Indicadora deverá fornecer corretamente os dados mínimos da Pessoa Indicada, consistentes em nome completo e número de telefone, por intermédio da landing page oficial do Programa de Indicação.",
        ],
    },
    {
        titulo: "3. Período de Vigência",
        paragrafos: [
            "3.1. O programa terá início em data a ser definida, com término indeterminado.",
            "3.2. A continuidade ou renovação do Programa em ciclos posteriores será definida a critério exclusivo da Casa da Gráfica, mediante divulgação prévia em seus canais oficiais.",
        ],
    },
    {
        titulo: "4. Do Prêmio",
        paragrafos: [
            "4.1. A pessoa física ou jurídica responsável pela indicação, denominada neste Programa como Pessoa Indicadora, fará jus ao recebimento de recompensas conforme o número de indicações válidas realizadas no respectivo período, nos seguintes termos:",
        ],
        tabela: {
            cabecalho: ["Indicações", "Recompensa"],
            linhas: [
                ["1 indicação", "Alexa"],
                ["2 indicações", "Desconto nas próximas compras ou Pix para pessoa física indicadora"],
                ["3 indicações", "Ipad"],
                ["4 indicações", "Apple Watch"],
            ],
        },
        paragrafosExtra: [
            "4.2. As recompensas concedidas no âmbito desta Campanha terão validade de 1 (um) ano, contado a partir da data de liberação do voucher, devendo ser utilizadas ou resgatadas dentro deste período, sob pena de expiração definitiva do direito ao benefício.",
            "4.3. Fica reservado à Casa da Gráfica o direito de incluir, de forma excepcional e a seu exclusivo critério, recompensas adicionais ao Programa de Indicação, sem necessidade de alteração deste regulamento.",
        ],
    },
    {
        titulo: "5. Da Entrega dos Prêmios",
        paragrafos: [
            "5.1. O pagamento da recompensa a pessoa Indicadora será efetuado somente após a confirmação da efetivação da contratação dos serviços e/ou produtos pela Pessoa Indicada.",
            "5.2. A entrega da recompensa ocorrerá no período de até 15 (quinze) dias corridos, contados da confirmação de compra/contratação realizada pela Pessoa Indicada.",
            "5.3. Os prêmios previstos neste Programa possuem caráter cumulativo, de modo que a Pessoa Indicadora fará jus a todas as recompensas correspondentes ao número de indicações válidas realizadas.",
            "5.4. A forma de entrega da recompensa será definida pela Casa da Gráfica, podendo ocorrer de forma física ou digital, conforme a natureza do prêmio.",
        ],
    },
    {
        titulo: "6. Das Hipóteses de Perda do Direito ao Prêmio",
        paragrafos: [
            "6.1. A Pessoa Indicadora perderá o direito ao recebimento da recompensa, ainda que tenha atingido o número de indicações necessárias, nas seguintes situações:",
        ],
        incisos: [
            "I — quando a Pessoa Indicada desistir ou deixar de concluir a contratação junto à Casa da Gráfica, por qualquer motivo;",
            "II — quando os dados fornecidos pela Pessoa Indicadora se mostrarem incorretos, incompletos ou inviabilizarem o contato com a Pessoa Indicada;",
            "III — quando for constatada tentativa de fraude, má-fé ou duplicidade de indicação;",
            "IV — quando o contrato firmado pela Pessoa Indicada for posteriormente rescindido ou declarado nulo antes do início da prestação do serviço.",
        ],
        paragrafosExtra: [
            "6.2. Em qualquer das hipóteses acima, a Pessoa Indicadora não fará jus ao recebimento da recompensa, sem isso gerar qualquer direito de indenização ou compensação.",
        ],
    },
    {
        titulo: "7. Qualificação da Indicação",
        paragrafos: [
            "7.1. Fica reservado à empresa criadora do Programa o direito de aplicar, futuramente, possíveis qualificações adicionais para pagamento da recompensa.",
            "7.2. Fica igualmente reservado o direito de potencializar o canal de indicação por meio de programas complementares que envolvam pagamento de recompensas pela geração de leads qualificados pela Pessoa Indicadora.",
            "7.3. É facultado à Pessoa Indicadora informar à Pessoa Indicada sobre o encaminhamento de sua indicação ao time da Casa da Gráfica, recomendando-se que o faça de forma ética, clara e respeitosa.",
        ],
    },
    {
        titulo: "8. Resgate da Premiação",
        paragrafos: [
            "8.1. A entrega da premiação observará os prazos e condições previstos neste regulamento, não sendo devida em casos de desistência, rescisão contratual ou qualquer outra circunstância que inviabilize a efetivação do contrato pela Pessoa Indicada.",
        ],
    },
    {
        titulo: "9. Disposições Gerais",
        paragrafos: [
            "9.1. O Programa de Indicação não se enquadra nas disposições da Lei nº 5.768/71 e do Decreto nº 70.951/72, por não se tratar de concurso, sorteio ou operação assemelhada, mas sim de programa promocional baseado em metas objetivas de indicação.",
            "9.2. Durante a vigência deste Programa, a Casa da Gráfica poderá promover missões específicas ou campanhas de ativação, com prêmios e condições próprias. Nesses casos, as regras aplicáveis serão divulgadas exclusivamente pelos canais oficiais de comunicação da empresa.",
            "9.3. A participação no Programa implica ciência, concordância e aceitação integral das condições deste regulamento.",
        ],
    },
    {
        titulo: "10. Proteção de Dados (LGPD)",
        paragrafos: [
            "10.1. Ao participar do Programa, a Pessoa Indicadora declara estar ciente e de acordo com a Política de Privacidade da Casa da Gráfica, autorizando o uso de seus dados pessoais exclusivamente para fins de gestão do Programa.",
            "10.2. A Casa da Gráfica compromete-se a tratar todos os dados pessoais em conformidade com a Lei nº 13.709/2018 (LGPD).",
            "10.3. A pessoa participante poderá solicitar a exclusão ou atualização de seus dados pessoais a qualquer momento pelos canais oficiais da Casa da Gráfica.",
        ],
    },
] as const;

const CONDICOES_GERAIS = [
    "Eventuais dúvidas ou situações não previstas neste regulamento serão analisadas e decididas, de forma soberana e definitiva, pela Casa da Gráfica.",
    "A participação implica aceitação integral e incondicional de todos os termos deste regulamento.",
    "A utilização da premiação é de caráter pessoal, intransferível e inegociável, salvo hipóteses expressamente previstas.",
    "A Casa da Gráfica poderá excluir do Programa qualquer pessoa participante envolvida em fraude, má-fé ou descumprimento das regras.",
    "Quaisquer custos adicionais necessários para usufruir da premiação serão de responsabilidade da pessoa participante contemplada.",
    "A Casa da Gráfica poderá alterar, suspender ou encerrar este regulamento a qualquer tempo, mediante aviso prévio em seus canais oficiais.",
    "A natureza ou forma de entrega dos prêmios poderá ser modificada, desde que não haja prejuízo às pessoas participantes que já tenham adquirido direitos.",
    "Indicações realizadas por parceiros ou pessoas colaboradoras poderão ser contempladas nas regras de premiação, a critério exclusivo da Casa da Gráfica.",
];

export default function RegulamentoPage() {
    return (
        <main className="min-h-screen bg-azul-escuro bg-pattern-logo text-white">
            {/* Header com logo e navegação */}
            <header className="section-padding ">
                <div className="container-brand flex flex-col items-center">
                    <Link href="/" aria-label="Voltar à página principal">
                        <Image
                            src={LOGO_PRINCIPAL}
                            alt="Educação ComVida"
                            width={300}
                            height={54}
                            className="h-auto"
                            priority
                        />
                    </Link>
                </div>
            </header>

            {/* Conteúdo do regulamento */}
            <section >
                <div className="container-brand max-w-4xl mx-auto">
                    {/* Título principal */}
                    <h1 className="font-primaria text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-8">
                        Regulamento da Campanha Promocional
                    </h1>

                    {/* Card branco com o conteúdo */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 lg:p-12 text-[#0B284F]">
                        {/* Seções do regulamento */}
                        <div className="space-y-8">
                            {SECOES.map((secao) => (
                                <article key={secao.titulo}>
                                    <h2 className="font-primaria text-lg md:text-xl font-bold text-azul-escuro mb-3">
                                        {secao.titulo}
                                    </h2>

                                    {/* Parágrafos */}
                                    <div className="space-y-3 text-[#4A5568] leading-relaxed text-sm md:text-base">
                                        {secao.paragrafos.map((paragrafo, i) => (
                                            <p key={i}>{paragrafo}</p>
                                        ))}
                                    </div>

                                    {/* Tabela de prêmios (seção 4) */}
                                    {"tabela" in secao && secao.tabela && (
                                        <div className="my-4 overflow-x-auto">
                                            <table className="w-full border-collapse text-sm md:text-base">
                                                <thead>
                                                    <tr className="bg-azul-escuro text-white">
                                                        {secao.tabela.cabecalho.map((col) => (
                                                            <th
                                                                key={col}
                                                                className="px-4 py-3 text-left font-semibold first:rounded-tl-lg last:rounded-tr-lg"
                                                            >
                                                                {col}
                                                            </th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {secao.tabela.linhas.map((linha, i) => (
                                                        <tr
                                                            key={i}
                                                            className="border-b border-cinza-leve even:bg-fundo-claro"
                                                        >
                                                            <td className="px-4 py-3 font-semibold text-azul-escuro whitespace-nowrap">
                                                                {linha[0]}
                                                            </td>
                                                            <td className="px-4 py-3 text-[#4A5568]">
                                                                {linha[1]}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}

                                    {/* Incisos (seção 6) */}
                                    {"incisos" in secao && secao.incisos && (
                                        <ul className="my-3 space-y-2 pl-4 text-[#4A5568] text-sm md:text-base">
                                            {secao.incisos.map((inciso, i) => (
                                                <li key={i} className="leading-relaxed">
                                                    {inciso}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {/* Parágrafos extras (após tabela ou incisos) */}
                                    {"paragrafosExtra" in secao && secao.paragrafosExtra && (
                                        <div className="mt-3 space-y-3 text-[#4A5568] leading-relaxed text-sm md:text-base">
                                            {secao.paragrafosExtra.map((p, i) => (
                                                <p key={i}>{p}</p>
                                            ))}
                                        </div>
                                    )}
                                </article>
                            ))}

                            {/* Condições Gerais */}
                            <article>
                                <h2 className="font-primaria text-lg md:text-xl font-bold text-azul-escuro mb-3">
                                    Condições Gerais
                                </h2>
                                <ul className="space-y-3 text-[#4A5568] leading-relaxed text-sm md:text-base">
                                    {CONDICOES_GERAIS.map((condicao, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-azul-principal" />
                                            {condicao}
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        </div>
                    </div>

                    {/* Botão voltar */}
                    <div className="text-center mt-10">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 rounded-full bg-azul-destaque px-6 py-3 text-sm font-semibold text-azul-escuro shadow-md transition-colors hover:bg-azul-principal hover:text-white"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Voltar à página principal
                        </Link>
                    </div>

                    {/* Rodapé institucional */}
                    <p className="mt-8 text-center text-xs text-white/60 pb-3">
                        Educação ComVida — Programa oficial de indicação da Casa da Gráfica
                    </p>
                </div>
            </section>
        </main>
    );
}
