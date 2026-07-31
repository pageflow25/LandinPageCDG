export const STATUS_LABELS: Record<string, string> = {
    pending: "Pendente",
    contacted: "Contactado",
    converted: "Convertido",
    rejected: "Rejeitado",
};

export const STATUS_CLASSES: Record<string, string> = {
    pending: "bg-amber-100 text-amber-800 dark:bg-amber-400/15 dark:text-amber-300",
    contacted: "bg-blue-100 text-blue-800 dark:bg-blue-400/15 dark:text-blue-300",
    converted: "bg-emerald-100 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-300",
    rejected: "bg-red-100 text-red-800 dark:bg-red-400/15 dark:text-red-300",
};

export const STATUS_DOT_CLASSES: Record<string, string> = {
    pending: "bg-amber-500",
    contacted: "bg-blue-500",
    converted: "bg-emerald-500",
    rejected: "bg-red-500",
};

export function StatusBadge({ status }: { status: string }) {
    const label = STATUS_LABELS[status] ?? status;
    const cls = STATUS_CLASSES[status] ?? "bg-crm-surface-raised text-crm-ink-soft";

    return (
        <span className={`inline-block whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${cls}`}>
            {label}
        </span>
    );
}
