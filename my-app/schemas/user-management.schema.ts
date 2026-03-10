import { z } from "zod";

export const appRoleValues = ["admin", "comercial", "indicator"] as const;

export const createUserSchema = z.object({
    email: z.string().email("E-mail inválido"),
    password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
    fullName: z.string().min(2, "Nome deve ter ao menos 2 caracteres"),
    role: z.enum(appRoleValues),
});

export const updateUserSchema = z.object({
    fullName: z.string().min(2, "Nome deve ter ao menos 2 caracteres").optional(),
    role: z.enum(appRoleValues).optional(),
    isActive: z.boolean().optional(),
});

export const resetUserPasswordSchema = z.object({
    newPassword: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
});

export type AppRoleValue = (typeof appRoleValues)[number];
