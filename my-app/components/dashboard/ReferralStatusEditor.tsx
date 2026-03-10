"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { referralStatusValues, type ReferralStatus } from "@/schemas/referral-status.schema";

interface ReferralStatusEditorProps {
    referralId: string;
    currentStatus: string;
}

export default function ReferralStatusEditor({
    referralId,
    currentStatus,
}: ReferralStatusEditorProps) {
    const router = useRouter();
    const [status, setStatus] = useState<ReferralStatus>(
        referralStatusValues.includes(currentStatus as ReferralStatus)
            ? (currentStatus as ReferralStatus)
            : "pending",
    );
    const [message, setMessage] = useState<string>("");
    const [isPending, startTransition] = useTransition();

    async function onSave() {
        setMessage("");

        const response = await fetch(`/api/referrals/${referralId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status }),
        });

        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
            setMessage(result.error || "Falha ao atualizar o status.");
            return;
        }

        setMessage("Status atualizado.");
        startTransition(() => {
            router.refresh();
        });
    }

    return (
        <div className="flex items-center gap-2">
            <select
                value={status}
                onChange={(event) => setStatus(event.target.value as ReferralStatus)}
                className="rounded-lg border border-slate-200 px-2 py-1 text-sm text-slate-700"
                disabled={isPending}
            >
                {referralStatusValues.map((item) => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
            </select>
            <button
                type="button"
                onClick={onSave}
                disabled={isPending}
                className="rounded-lg bg-azul-principal px-3 py-1 text-xs font-semibold text-white disabled:opacity-60"
            >
                Salvar
            </button>
            {message && <span className="text-xs text-slate-500">{message}</span>}
        </div>
    );
}
