"use client";

import { useMemo, useState } from "react";
import type { ReferralRecord } from "@/lib/crm";
import InitialsAvatar from "@/components/dashboard/InitialsAvatar";
import { StatusBadge, STATUS_LABELS } from "@/components/dashboard/StatusBadge";
import ReferralStatusEditor from "@/components/dashboard/ReferralStatusEditor";
import ReferralComercialEditor from "@/components/dashboard/ReferralComercialEditor";
import ReferralDeleteButton from "@/components/dashboard/ReferralDeleteButton";

function formatDate(value: string) {
    return new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
    }).format(new Date(value));
}

interface ReferralsTableProps {
    items: ReferralRecord[];
    canUpdateStatus: boolean;
    canDelete: boolean;
    canAssignComercial: boolean;
}

const STATUS_FILTERS = ["all", "pending", "contacted", "converted", "rejected"] as const;

export default function ReferralsTable({
    items,
    canUpdateStatus,
    canDelete,
    canAssignComercial,
}: ReferralsTableProps) {
    const [query, setQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<(typeof STATUS_FILTERS)[number]>("all");

    const filteredItems = useMemo(() => {
        const value = query.trim().toLowerCase();

        return items.filter((item) => {
            const matchesStatus = statusFilter === "all" || item.status === statusFilter;
            if (!matchesStatus) return false;
            if (!value) return true;

            return (
                item.referred_name.toLowerCase().includes(value) ||
                item.affiliate_name.toLowerCase().includes(value) ||
                item.affiliate_email.toLowerCase().includes(value) ||
                (item.comercial_name || "").toLowerCase().includes(value)
            );
        });
    }, [items, query, statusFilter]);

    const showActionsColumn = canUpdateStatus;

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full sm:max-w-xs">
                    <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-crm-ink-faint"
                    >
                        <circle cx="11" cy="11" r="7" />
                        <path strokeLinecap="round" d="m20 20-3.5-3.5" />
                    </svg>
                    <input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Buscar por nome, e-mail ou comercial"
                        className="w-full rounded-xl border border-crm-line bg-crm-surface-alt py-2.5 pl-10 pr-3 text-sm text-crm-ink placeholder:text-crm-ink-faint focus:outline-none focus:ring-2 focus:ring-azul-principal/30"
                    />
                </div>

                <div className="flex flex-wrap gap-2">
                    {STATUS_FILTERS.map((filter) => (
                        <button
                            key={filter}
                            type="button"
                            onClick={() => setStatusFilter(filter)}
                            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                                statusFilter === filter
                                    ? "bg-azul-escuro text-white"
                                    : "bg-crm-surface-raised text-crm-ink-soft hover:bg-crm-line-soft"
                            }`}
                        >
                            {filter === "all" ? "Todas" : STATUS_LABELS[filter]}
                        </button>
                    ))}
                </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-crm-line bg-crm-surface-alt">
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="border-b border-crm-line bg-crm-surface-raised text-left text-xs uppercase tracking-wide text-crm-ink-faint">
                                <th className="px-5 py-3.5 font-semibold">Indicado</th>
                                <th className="px-5 py-3.5 font-semibold">Indicador</th>
                                <th className="px-5 py-3.5 font-semibold">Comercial</th>
                                <th className="px-5 py-3.5 font-semibold">Status</th>
                                <th className="px-5 py-3.5 font-semibold">CRM</th>
                                <th className="px-5 py-3.5 font-semibold">Criado em</th>
                                {showActionsColumn && <th className="px-5 py-3.5 font-semibold">Ações</th>}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-crm-line-soft">
                            {filteredItems.length === 0 && (
                                <tr>
                                    <td
                                        className="px-5 py-10 text-center text-sm text-crm-ink-faint"
                                        colSpan={showActionsColumn ? 7 : 6}
                                    >
                                        Nenhuma indicação encontrada para esse filtro.
                                    </td>
                                </tr>
                            )}

                            {filteredItems.map((item) => (
                                <tr key={item.id} className="text-sm transition-colors hover:bg-crm-surface-raised">
                                    <td className="px-5 py-3.5">
                                        <div className="flex items-center gap-3">
                                            <InitialsAvatar name={item.referred_name} size="sm" />
                                            <div className="min-w-0">
                                                <p className="truncate font-semibold text-crm-ink">
                                                    {item.referred_name}
                                                </p>
                                                <p className="truncate text-xs text-crm-ink-faint">
                                                    {item.referred_phone}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <p className="font-medium text-crm-ink">{item.affiliate_name}</p>
                                        <p className="text-xs text-crm-ink-faint">{item.affiliate_email}</p>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        {canAssignComercial ? (
                                            <ReferralComercialEditor
                                                referralId={item.id}
                                                currentComercialId={item.comercial_profile_id}
                                            />
                                        ) : item.comercial_name ? (
                                            <>
                                                <p className="font-medium text-crm-ink">{item.comercial_name}</p>
                                                <p className="text-xs text-crm-ink-faint">{item.comercial_email}</p>
                                            </>
                                        ) : (
                                            <span className="italic text-crm-ink-faint">Não atribuído</span>
                                        )}
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <StatusBadge status={item.status} />
                                    </td>
                                    <td className="px-5 py-3.5">
                                        {item.ghl_synced_at ? (
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                                                Sincronizado
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-400/10 dark:text-amber-300">
                                                Pendente
                                            </span>
                                        )}
                                    </td>
                                    <td className="whitespace-nowrap px-5 py-3.5 text-crm-ink-soft">
                                        {formatDate(item.created_at)}
                                    </td>
                                    {showActionsColumn && (
                                        <td className="px-5 py-3.5">
                                            <div className="flex flex-col gap-2">
                                                <ReferralStatusEditor
                                                    referralId={item.id}
                                                    currentStatus={item.status}
                                                />
                                                {canDelete && (
                                                    <ReferralDeleteButton
                                                        referralId={item.id}
                                                        referredName={item.referred_name}
                                                    />
                                                )}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <p className="text-xs text-crm-ink-faint">
                {filteredItems.length} de {items.length} indicações
            </p>
        </div>
    );
}
