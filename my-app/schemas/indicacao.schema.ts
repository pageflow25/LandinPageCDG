import { z } from "zod";

/**
 * Schema de validação para indicação
 *
 * Formato esperado pelo Google Apps Script:
 * { afiliado: { nome, email, telefone }, indicado: { nome, telefone } }
 */

const afiliadoSchema = z.object({
    nome: z.string().min(2, "Nome deve ter ao menos 2 caracteres"),
    email: z.string().email("E-mail inválido"),
    telefone: z
        .string()
        .min(10, "Telefone deve ter ao menos 10 dígitos")
        .max(15, "Telefone deve ter no máximo 15 dígitos"),
});

const indicadoSchema = z.object({
    nome: z.string().min(2, "Nome deve ter ao menos 2 caracteres"),
    email: z.string().email("E-mail inválido"),
    telefone: z
        .string()
        .min(10, "Telefone deve ter ao menos 10 dígitos")
        .max(15, "Telefone deve ter no máximo 15 dígitos"),
});

export const indicacaoSchema = z.object({
    afiliado: afiliadoSchema,
    indicado: indicadoSchema,
});

export type IndicacaoPayload = z.infer<typeof indicacaoSchema>;
