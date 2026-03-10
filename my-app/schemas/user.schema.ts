import { z } from "zod";

export const createUserSchema = z.object({
    email: z.string().email("E-mail inválido"),
    password: z.string().min(8, "Senha deve ter ao menos 8 caracteres"),
    full_name: z.string().min(2, "Nome deve ter ao menos 2 caracteres"),
    role: z.enum(["admin", "comercial", "indicator"]),
});

export const updateUserSchema = z
    .object({
        full_name: z.string().min(2, "Nome deve ter ao menos 2 caracteres").optional(),
        role: z.enum(["admin", "comercial", "indicator"]).optional(),
        is_active: z.boolean().optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
        message: "Ao menos um campo deve ser informado.",
    });

export const resetPasswordSchema = z.object({
    password: z.string().min(8, "Senha deve ter ao menos 8 caracteres"),
});

export type CreateUserPayload = z.infer<typeof createUserSchema>;
export type UpdateUserPayload = z.infer<typeof updateUserSchema>;
export type ResetPasswordPayload = z.infer<typeof resetPasswordSchema>;
