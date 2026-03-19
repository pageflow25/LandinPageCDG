"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

interface ReferralDeleteButtonProps {
    referralId: string;
    referredName: string;
}

export default function ReferralDeleteButton({
    referralId,
    referredName,
}: ReferralDeleteButtonProps) {
    const router = useRouter();
    const [message, setMessage] = useState("");
    const [isPending, startTransition] = useTransition();

    async function onDelete() {
        const confirmed = window.confirm(
            `Tem certeza que deseja excluir a indicação de "${referredName}"? Esta ação não pode ser desfeita.`,
        );

        if (!confirmed) return;

        setMessage("");

        const response = await fetch(`/api/referrals/${referralId}`, {
            method: "DELETE",
        });

        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
            setMessage(result.error || "Falha ao excluir.");
            return;
        }

        setMessage("Excluído.");
        startTransition(() => {
            router.refresh();
        });
    }

    return (
        <div className="flex items-center gap-2">
            <button
                type="button"
                onClick={onDelete}
                disabled={isPending}
                className="rounded-lg bg-red-600 px-3 py-1 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-60"
            >
                Excluir
            </button>
            {message && <span className="text-xs text-red-600">{message}</span>}
        </div>
    );
}
