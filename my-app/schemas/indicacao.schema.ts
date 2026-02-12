import { z } from "zod";

/**
 * Schema de validação para indicação
 *
 * Formato esperado pelo Google Apps Script:
 * { afiliado: { nome, telefone }, indicado: { nome, telefone } }
 */

const pessoaSchema = z.object({
    nome: z.string().min(2, "Nome deve ter ao menos 2 caracteres"),
    telefone: z
        .string()
        .min(10, "Telefone deve ter ao menos 10 dígitos")
        .max(15, "Telefone deve ter no máximo 15 dígitos"),
});

export const indicacaoSchema = z.object({
    afiliado: pessoaSchema,
    indicado: pessoaSchema,
});

export type IndicacaoPayload = z.infer<typeof indicacaoSchema>;
