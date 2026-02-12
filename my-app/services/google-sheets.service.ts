import type { IndicacaoPayload } from "@/schemas/indicacao.schema";

/**
 * Service — Google Sheets (via Apps Script)
 *
 * Responsabilidade única: enviar dados de indicação
 * para o endpoint doPost do Google Apps Script.
 */

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwG3Aak9ejjtYAAI9y0gLbTKD6pEtk7RmctYBCxLSY-pMOZlTTHvdt_T6B-iDqPKmbg/exec";

export async function enviarIndicacao(
    payload: IndicacaoPayload,
): Promise<void> {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        redirect: "follow",
    });

    // Google Apps Script pode devolver HTML em vez de JSON em caso de erro
    if (!response.ok) {
        throw new Error(
            `Google Apps Script respondeu com status ${response.status}`,
        );
    }
}
