"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

interface ComercialOption {
    id: string;
    full_name: string | null;
    email: string;
}

interface ReferralComercialEditorProps {
    referralId: string;
    currentComercialId: string | null;
}

export default function ReferralComercialEditor({
    referralId,
    currentComercialId,
}: ReferralComercialEditorProps) {
    const router = useRouter();
    const [comercialId, setComercialId] = useState(currentComercialId ?? "");
    const [comerciais, setComerciais] = useState<ComercialOption[]>([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        async function fetchComerciais() {
            try {
                const response = await fetch("/api/comerciais");
                const data = await response.json();
                setComerciais(data.items ?? []);
            } catch {
                console.error("Erro ao carregar comerciais");
            } finally {
                setLoading(false);
            }
        }

        fetchComerciais();
    }, []);

    async function onSave() {
        setMessage("");

        const response = await fetch(`/api/referrals/${referralId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ comercialId: comercialId || null }),
        });

        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
            setMessage(result.error || "Falha ao atualizar.");
            return;
        }

        setMessage("Comercial atualizado.");
        startTransition(() => {
            router.refresh();
        });
    }

    return (
        <div className="flex items-center gap-2">
            <select
                value={comercialId}
                onChange={(e) => setComercialId(e.target.value)}
                disabled={isPending || loading}
                className="rounded-lg border border-slate-200 px-2 py-1 text-sm text-slate-700"
            >
                <option value="">
                    {loading ? "Carregando..." : "Nenhum"}
                </option>
                {comerciais.map((c) => (
                    <option key={c.id} value={c.id}>
                        {c.full_name || c.email}
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
