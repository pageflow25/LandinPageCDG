import type { IndicacaoPayload } from "@/schemas/indicacao.schema";

/**
 * Service — Google Sheets (via Apps Script)
 *
 * Responsabilidade única: enviar dados de indicação
 * para o endpoint doPost do Google Apps Script.
 *
 * Formato esperado:
 * { afiliado: { nome, telefone, consultor? }, indicado: { nome, telefone } }
 */

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxyFZfI8c2Y1P4Y5k_BJ58bnodAkccPipy2yFeYnnSQWx1VfLckJLSxsr-nuk9nOH_A/exec";

export async function enviarIndicacao(
    payload: IndicacaoPayload,
): Promise<void> {
    console.log("[SHEETS] payload recebido:", JSON.stringify(payload, null, 2));
    console.log("[SHEETS] comercialNome:", payload.comercialNome);

    const sheetsPayload = {
        afiliado: {
            nome: payload.afiliado.nome,
            telefone: payload.afiliado.telefone,
            ...(payload.comercialNome ? { consultor: payload.comercialNome } : {}),
        },
        indicado: {
            nome: payload.indicado.nome,
            telefone: payload.indicado.telefone,
        },
    };

    console.log("[SHEETS] payload enviado:", JSON.stringify(sheetsPayload, null, 2));

    const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sheetsPayload),
        redirect: "follow",
    });

    if (!response.ok) {
        throw new Error(
            `Google Apps Script respondeu com status ${response.status}`,
        );
    }
}
