import { NextRequest, NextResponse } from "next/server";
import { indicacaoSchema } from "@/schemas/indicacao.schema";
import { enviarIndicacao } from "@/services/google-sheets.service";
import { enviarEmailsIndicacao } from "@/services/email.service";

/**
 * API Route - Indicação
 *
 * POST /api/indicacao
 *
 * Responsabilidades:
 * - Validar payload com Zod
 * - Delegar envio ao service do Google Apps Script
 * - Disparar e-mails de agradecimento e notificação via SMTP
 * - Retornar sucesso ou erro
 */

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validação com schema Zod
        const result = indicacaoSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { error: "Dados inválidos", details: result.error.flatten() },
                { status: 400 },
            );
        }

        // Envia para Google Apps Script (fluxo principal)
        await enviarIndicacao(result.data);

        // Dispara e-mails em background — falhas não bloqueiam a resposta
        enviarEmailsIndicacao(result.data).catch((error) => {
            console.error("[EMAIL] Erro ao disparar e-mails:", error);
        });

        return NextResponse.json({
            success: true,
            message: "Indicação registrada com sucesso",
        });
    } catch (error) {
        console.error("[INDICAÇÃO] Erro ao processar:", error);

        return NextResponse.json(
            { error: "Erro interno ao processar indicação" },
            { status: 500 },
        );
    }
}
