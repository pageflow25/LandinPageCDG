"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function ReferralsSyncButton() {
    const router = useRouter();
    const [message, setMessage] = useState("");
    const [isSyncing, setIsSyncing] = useState(false);
    const [isPending, startTransition] = useTransition();

    async function onSync() {
        setMessage("");
        setIsSyncing(true);

        try {
            const response = await fetch("/api/referrals/sync-ghl", {
                method: "POST",
            });

            const result = await response.json().catch(() => ({}));

            if (!response.ok) {
                setMessage(result.error || "Falha ao sincronizar com o CRM.");
                return;
            }

            setMessage(
                result.total === 0
                    ? "Tudo já estava sincronizado."
                    : `${result.synced} de ${result.total} sincronizadas${result.failed ? `, ${result.failed} falharam` : ""}.`,
            );
            startTransition(() => {
                router.refresh();
            });
        } finally {
            setIsSyncing(false);
        }
    }

    return (
        <div className="flex items-center gap-2">
            <button
                type="button"
                onClick={onSync}
                disabled={isSyncing || isPending}
                className="rounded-xl bg-azul-escuro px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-azul-principal disabled:opacity-60"
            >
                {isSyncing ? "Sincronizando..." : "Sincronizar todos com o CRM"}
            </button>
            {message && <span className="text-xs text-crm-ink-faint">{message}</span>}
        </div>
    );
}
