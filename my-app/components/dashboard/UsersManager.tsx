"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { ProfileRecord } from "@/lib/crm";
import InitialsAvatar from "@/components/dashboard/InitialsAvatar";

const ROLE_LABELS: Record<string, string> = {
    admin: "Admin",
    comercial: "Comercial",
    supervisor: "Supervisor",
    indicator: "Indicador",
};

const ROLE_CLASSES: Record<string, string> = {
    admin: "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-400/15 dark:text-fuchsia-300",
    comercial: "bg-blue-100 text-blue-800 dark:bg-blue-400/15 dark:text-blue-300",
    supervisor: "bg-indigo-100 text-indigo-800 dark:bg-indigo-400/15 dark:text-indigo-300",
    indicator: "bg-slate-100 text-slate-700 dark:bg-slate-400/15 dark:text-slate-300",
};

type Role = "admin" | "comercial" | "supervisor" | "indicator";

interface UsersManagerProps {
    items: ProfileRecord[];
}

function formatDate(value: string) {
    return new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
    }).format(new Date(value));
}

export default function UsersManager({ items }: UsersManagerProps) {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [feedback, setFeedback] = useState("");

    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newFullName, setNewFullName] = useState("");
    const [newRole, setNewRole] = useState<Role>("indicator");
    const [creating, setCreating] = useState(false);

    const filteredItems = useMemo(() => {
        if (!query.trim()) {
            return items;
        }

        const value = query.trim().toLowerCase();
        return items.filter((item) => {
            return (
                item.email.toLowerCase().includes(value) ||
                (item.full_name || "").toLowerCase().includes(value) ||
                item.role.toLowerCase().includes(value)
            );
        });
    }, [items, query]);

    async function createUser() {
        setFeedback("");
        setCreating(true);

        try {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: newEmail,
                    password: newPassword,
                    fullName: newFullName,
                    role: newRole,
                }),
            });

            const result = await response.json().catch(() => ({}));

            if (!response.ok) {
                setFeedback(result.error || "Falha ao cadastrar usuário.");
                return;
            }

            setFeedback("Usuário cadastrado com sucesso.");
            setNewEmail("");
            setNewPassword("");
            setNewFullName("");
            setNewRole("indicator");
            router.refresh();
        } finally {
            setCreating(false);
        }
    }

    async function updateUser(id: string, payload: Record<string, unknown>, successMessage: string) {
        setFeedback("");

        const response = await fetch(`/api/users/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
            setFeedback(result.error || "Falha ao atualizar usuário.");
            return;
        }

        setFeedback(successMessage);
        router.refresh();
    }

    async function resetPassword(id: string) {
        const newPassword = window.prompt("Nova senha para o usuário (mín. 8 chars):", "");

        if (!newPassword) {
            return;
        }

        setFeedback("");
        const response = await fetch(`/api/users/${id}/reset-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ newPassword }),
        });

        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
            setFeedback(result.error || "Falha ao resetar senha.");
            return;
        }

        setFeedback("Senha atualizada com sucesso.");
    }

    return (
        <div className="space-y-5">
            <div className="rounded-2xl border border-crm-line bg-crm-surface-alt p-5">
                <p className="text-sm font-semibold text-crm-ink">Cadastrar usuário</p>
                <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                    <input
                        value={newFullName}
                        onChange={(event) => setNewFullName(event.target.value)}
                        placeholder="Nome completo"
                        className="rounded-xl border border-crm-line bg-crm-surface px-3 py-2.5 text-sm text-crm-ink placeholder:text-crm-ink-faint focus:outline-none focus:ring-2 focus:ring-azul-principal/30"
                    />
                    <input
                        value={newEmail}
                        onChange={(event) => setNewEmail(event.target.value)}
                        placeholder="email@dominio.com"
                        className="rounded-xl border border-crm-line bg-crm-surface px-3 py-2.5 text-sm text-crm-ink placeholder:text-crm-ink-faint focus:outline-none focus:ring-2 focus:ring-azul-principal/30"
                    />
                    <input
                        value={newPassword}
                        onChange={(event) => setNewPassword(event.target.value)}
                        placeholder="Senha inicial"
                        className="rounded-xl border border-crm-line bg-crm-surface px-3 py-2.5 text-sm text-crm-ink placeholder:text-crm-ink-faint focus:outline-none focus:ring-2 focus:ring-azul-principal/30"
                    />
                    <select
                        value={newRole}
                        onChange={(event) => setNewRole(event.target.value as Role)}
                        className="rounded-xl border border-crm-line bg-crm-surface px-3 py-2.5 text-sm text-crm-ink focus:outline-none focus:ring-2 focus:ring-azul-principal/30"
                    >
                        <option value="indicator">indicator</option>
                        <option value="comercial">comercial</option>
                        <option value="supervisor">supervisor</option>
                        <option value="admin">admin</option>
                    </select>
                </div>
                <button
                    type="button"
                    onClick={createUser}
                    disabled={creating}
                    className="mt-3 rounded-xl bg-azul-principal px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-azul-destaque disabled:opacity-60"
                >
                    {creating ? "Cadastrando..." : "Cadastrar usuário"}
                </button>
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="relative w-full md:max-w-sm">
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
                        placeholder="Buscar por nome, e-mail ou role"
                        className="w-full rounded-xl border border-crm-line bg-crm-surface-alt py-2.5 pl-10 pr-3 text-sm text-crm-ink placeholder:text-crm-ink-faint focus:outline-none focus:ring-2 focus:ring-azul-principal/30"
                    />
                </div>
                {feedback && <p className="text-sm text-crm-ink-soft">{feedback}</p>}
            </div>

            <div className="overflow-hidden rounded-2xl border border-crm-line bg-crm-surface-alt">
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="border-b border-crm-line bg-crm-surface-raised text-left text-xs uppercase tracking-wide text-crm-ink-faint">
                                <th className="px-5 py-3.5 font-semibold">Nome</th>
                                <th className="px-5 py-3.5 font-semibold">Role</th>
                                <th className="px-5 py-3.5 font-semibold">Status</th>
                                <th className="px-5 py-3.5 font-semibold">Criado em</th>
                                <th className="px-5 py-3.5 font-semibold">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-crm-line-soft">
                            {filteredItems.length === 0 && (
                                <tr>
                                    <td className="px-5 py-10 text-center text-sm text-crm-ink-faint" colSpan={5}>
                                        Nenhum usuário encontrado.
                                    </td>
                                </tr>
                            )}

                            {filteredItems.map((item) => (
                                <tr key={item.id} className="text-sm transition-colors hover:bg-crm-surface-raised">
                                    <td className="px-5 py-3.5">
                                        <div className="flex items-center gap-3">
                                            <InitialsAvatar name={item.full_name || item.email} size="sm" />
                                            <div className="min-w-0">
                                                <p className="truncate font-semibold text-crm-ink">
                                                    {item.full_name || "Sem nome cadastrado"}
                                                </p>
                                                <p className="truncate text-xs text-crm-ink-faint">{item.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <select
                                            className={`rounded-full border-0 px-3 py-1 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-azul-principal/30 ${ROLE_CLASSES[item.role] ?? "bg-crm-surface-raised text-crm-ink-soft"}`}
                                            value={item.role}
                                            onChange={(event) => {
                                                void updateUser(
                                                    item.id,
                                                    { role: event.target.value },
                                                    "Role atualizada com sucesso.",
                                                );
                                            }}
                                        >
                                            <option value="indicator">{ROLE_LABELS.indicator}</option>
                                            <option value="comercial">{ROLE_LABELS.comercial}</option>
                                            <option value="supervisor">{ROLE_LABELS.supervisor}</option>
                                            <option value="admin">{ROLE_LABELS.admin}</option>
                                        </select>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <span
                                            className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                                                item.is_active === false
                                                    ? "text-crm-ink-faint"
                                                    : "text-emerald-600 dark:text-emerald-400"
                                            }`}
                                        >
                                            <span
                                                className={`h-1.5 w-1.5 rounded-full ${
                                                    item.is_active === false ? "bg-crm-ink-faint" : "bg-emerald-500"
                                                }`}
                                            />
                                            {item.is_active === false ? "Inativo" : "Ativo"}
                                        </span>
                                    </td>
                                    <td className="whitespace-nowrap px-5 py-3.5 text-crm-ink-soft">
                                        {formatDate(item.created_at)}
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <div className="flex flex-wrap gap-2">
                                            <button
                                                type="button"
                                                onClick={() => void resetPassword(item.id)}
                                                className="rounded-lg border border-crm-line px-2.5 py-1.5 text-xs text-crm-ink-soft transition-colors hover:border-azul-principal/40 hover:text-azul-principal"
                                            >
                                                Reset senha
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    void updateUser(
                                                        item.id,
                                                        { isActive: item.is_active === false },
                                                        item.is_active === false
                                                            ? "Usuário reativado."
                                                            : "Usuário desativado.",
                                                    );
                                                }}
                                                className="rounded-lg border border-crm-line px-2.5 py-1.5 text-xs text-crm-ink-soft transition-colors hover:border-azul-principal/40 hover:text-azul-principal"
                                            >
                                                {item.is_active === false ? "Reativar" : "Desativar"}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
