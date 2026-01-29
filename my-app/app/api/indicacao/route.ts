import { NextRequest, NextResponse } from "next/server";

/**
 * API Route - Indicação
 * 
 * POST /api/indicacao
 * 
 * Responsabilidades:
 * - Receber dados do formulário
 * - Simular criação de Afiliado
 * - Simular criação de Indicado vinculado ao Afiliado
 * - Logs de persistência simulada
 * 
 * Modelo lógico:
 * - Afiliado: { id, nome, email, telefone }
 * - Indicado: { id, nome, email, telefone, id_afiliado }
 */

// Tipos para os dados recebidos
interface IndicacaoPayload {
    nomeAfiliado: string;
    emailAfiliado: string;
    telefoneAfiliado: string;
    nomeIndicado: string;
    emailIndicado: string;
    telefoneIndicado: string;
}

// Simula geração de ID único
function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export async function POST(request: NextRequest) {
    try {
        // Parse do body
        const data: IndicacaoPayload = await request.json();

        // Validação básica dos campos obrigatórios
        const camposObrigatorios = [
            "nomeAfiliado",
            "emailAfiliado",
            "telefoneAfiliado",
            "nomeIndicado",
            "emailIndicado",
            "telefoneIndicado",
        ] as const;

        for (const campo of camposObrigatorios) {
            if (!data[campo] || data[campo].trim() === "") {
                return NextResponse.json(
                    { error: `Campo obrigatório ausente: ${campo}` },
                    { status: 400 }
                );
            }
        }

        // Simula criação do Afiliado
        const afiliadoId = generateId();
        const afiliado = {
            id: afiliadoId,
            nome: data.nomeAfiliado,
            email: data.emailAfiliado,
            telefone: data.telefoneAfiliado,
        };

        // Log: Afiliado criado
        console.log("=============================================");
        console.log("[INDICAÇÃO] Novo registro de indicação");
        console.log("---------------------------------------------");
        console.log("[AFILIADO] Dados criados:");
        console.log(JSON.stringify(afiliado, null, 2));

        // Simula criação do Indicado vinculado ao Afiliado
        const indicadoId = generateId();
        const indicado = {
            id: indicadoId,
            nome: data.nomeIndicado,
            email: data.emailIndicado,
            telefone: data.telefoneIndicado,
            id_afiliado: afiliadoId,
        };

        // Log: Indicado criado
        console.log("---------------------------------------------");
        console.log("[INDICADO] Dados criados:");
        console.log(JSON.stringify(indicado, null, 2));
        console.log("=============================================");

        // Retorna sucesso
        return NextResponse.json({
            success: true,
            message: "Indicação registrada com sucesso",
            data: {
                afiliado: { id: afiliadoId, nome: afiliado.nome },
                indicado: { id: indicadoId, nome: indicado.nome },
            },
        });
    } catch (error) {
        // Log de erro
        console.error("[INDICAÇÃO] Erro ao processar:", error);

        return NextResponse.json(
            { error: "Erro interno ao processar indicação" },
            { status: 500 }
        );
    }
}
