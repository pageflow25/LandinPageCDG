import { z } from "zod";

export const referralStatusValues = [
    "pending",
    "contacted",
    "converted",
    "rejected",
] as const;

export const updateReferralStatusSchema = z.object({
    status: z.enum(referralStatusValues),
    note: z
        .string()
        .trim()
        .max(300, "A observação pode ter no máximo 300 caracteres")
        .optional(),
});

export type ReferralStatus = (typeof referralStatusValues)[number];
export type UpdateReferralStatusPayload = z.infer<typeof updateReferralStatusSchema>;
