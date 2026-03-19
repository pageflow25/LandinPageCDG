"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { ProfileRecord } from "@/lib/crm";

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
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-700">Cadastrar usuário</p>
                <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                    <input
                        value={newFullName}
                        onChange={(event) => setNewFullName(event.target.value)}
                        placeholder="Nome completo"
                        className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
                    />
                    <input
                        value={newEmail}
                        onChange={(event) => setNewEmail(event.target.value)}
                        placeholder="email@dominio.com"
                        className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
                    />
                    <input
                        value={newPassword}
                        onChange={(event) => setNewPassword(event.target.value)}
                        placeholder="Senha inicial"
                        className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
                    />
                    <select
                        value={newRole}
                        onChange={(event) => setNewRole(event.target.value as Role)}
                        className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
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
                    className="mt-3 rounded-xl bg-azul-principal px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                >
                    {creating ? "Cadastrando..." : "Cadastrar usuário"}
                </button>
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Buscar por nome, e-mail ou role"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm md:max-w-sm"
                />
                {feedback && <p className="text-sm text-slate-600">{feedback}</p>}
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="border-b border-slate-100 bg-slate-50 text-left text-sm text-slate-500">
                            <th className="px-5 py-4 font-medium">Nome</th>
                            <th className="px-5 py-4 font-medium">E-mail</th>
                            <th className="px-5 py-4 font-medium">Role</th>
                            <th className="px-5 py-4 font-medium">Status</th>
                            <th className="px-5 py-4 font-medium">Criado em</th>
                            <th className="px-5 py-4 font-medium">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.length === 0 && (
                            <tr>
                                <td className="px-5 py-8 text-sm text-slate-500" colSpan={6}>
                                    Nenhum usuário encontrado.
                                </td>
                            </tr>
                        )}

                        {filteredItems.map((item) => (
                            <tr key={item.id} className="border-b border-slate-100 text-sm">
                                <td className="px-5 py-4 font-medium text-azul-escuro">
                                    {item.full_name || "Sem nome cadastrado"}
                                </td>
                                <td className="px-5 py-4 text-slate-600">{item.email}</td>
                                <td className="px-5 py-4 text-slate-600">
                                    <select
                                        className="rounded-lg border border-slate-200 px-2 py-1"
                                        value={item.role}
                                        onChange={(event) => {
                                            void updateUser(
                                                item.id,
                                                { role: event.target.value },
                                                "Role atualizada com sucesso.",
                                            );
                                        }}
                                    >
                                        <option value="indicator">indicator</option>
                                        <option value="comercial">comercial</option>
                                        <option value="supervisor">supervisor</option>
                                        <option value="admin">admin</option>
                                    </select>
                                </td>
                                <td className="px-5 py-4 text-slate-600">
                                    {item.is_active === false ? "Inativo" : "Ativo"}
                                </td>
                                <td className="px-5 py-4 text-slate-600">{formatDate(item.created_at)}</td>
                                <td className="px-5 py-4 text-slate-600">
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            type="button"
                                            onClick={() => void resetPassword(item.id)}
                                            className="rounded-lg border border-slate-200 px-2 py-1 text-xs"
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
                                            className="rounded-lg border border-slate-200 px-2 py-1 text-xs"
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
    );
}
