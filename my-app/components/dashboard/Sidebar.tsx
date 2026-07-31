"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export interface SidebarNavItem {
    href: string;
    label: string;
    icon: "resumo" | "indicacoes" | "usuarios" | "auditoria";
}

interface SidebarProps {
    navigation: SidebarNavItem[];
    userEmail?: string;
    roleLabel: string;
    signOutAction: () => void;
}

const ICONS: Record<SidebarNavItem["icon"], React.ReactNode> = {
    resumo: (
        <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 13.2 11.2 6a1.2 1.2 0 0 1 1.6 0L20 13.2M6 11v8a1 1 0 0 0 1 1h3v-5h4v5h3a1 1 0 0 0 1-1v-8" />
        </svg>
    ),
    indicacoes: (
        <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 6h12M8 12h12M8 18h12M3.5 6h.01M3.5 12h.01M3.5 18h.01" />
        </svg>
    ),
    usuarios: (
        <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 19v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 17.5V19M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM18 19v-1.5a3.5 3.5 0 0 0-2.3-3.29M14.5 5.1a3 3 0 0 1 0 5.8" />
        </svg>
    ),
    auditoria: (
        <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3 5 6v5.5c0 4.3 2.9 7.7 7 8.5 4.1-.8 7-4.2 7-8.5V6l-7-3ZM9.5 12l1.8 1.8L14.8 10" />
        </svg>
    ),
};

export default function Sidebar({ navigation, userEmail, roleLabel, signOutAction }: SidebarProps) {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="flex items-center justify-between rounded-2xl bg-crm-surface-sidebar px-4 py-3 text-white shadow-sm lg:hidden">
                <span className="font-primaria text-lg font-bold">Educação ComVida</span>
                <button
                    type="button"
                    onClick={() => setOpen((value) => !value)}
                    aria-label="Abrir menu"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20"
                >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
                    </svg>
                </button>
            </div>

            <aside
                className={`${open ? "flex" : "hidden"} w-full flex-col rounded-[1.75rem] bg-crm-surface-sidebar p-5 text-white shadow-xl lg:sticky lg:top-5 lg:flex lg:h-[calc(100vh-2.5rem)] lg:w-64`}
            >
                <div className="hidden lg:block">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-white/50">Micro CRM</p>
                    <h1 className="font-primaria mt-2 text-2xl font-bold leading-tight">Educação ComVida</h1>
                </div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">Sessão</p>
                    <p className="mt-1.5 truncate text-sm font-semibold">{userEmail || "Modo preparação"}</p>
                    <p className="mt-0.5 text-xs text-white/60">{roleLabel}</p>
                </div>

                <nav className="mt-6 flex-1 space-y-1">
                    {navigation.map((item) => {
                        const isActive =
                            item.href === "/dashboard"
                                ? pathname === "/dashboard"
                                : pathname?.startsWith(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition-colors ${
                                    isActive
                                        ? "bg-white text-azul-escuro font-semibold"
                                        : "text-white/80 hover:bg-white/10 hover:text-white"
                                }`}
                            >
                                <span className={isActive ? "text-azul-principal" : "text-white/60"}>
                                    {ICONS[item.icon]}
                                </span>
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-4 space-y-2 border-t border-white/10 pt-4">
                    <Link
                        href="/"
                        className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm text-white/75 transition-colors hover:bg-white/10 hover:text-white"
                    >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5 21 12l-7 7M21 12H3" />
                        </svg>
                        Landing page
                    </Link>
                    <form action={signOutAction}>
                        <button
                            type="submit"
                            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm text-white/75 transition-colors hover:bg-white/10 hover:text-white"
                        >
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
                            </svg>
                            Sair
                        </button>
                    </form>
                </div>
            </aside>
        </>
    );
}
