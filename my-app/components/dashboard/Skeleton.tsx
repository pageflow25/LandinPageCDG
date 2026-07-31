function Block({ className }: { className: string }) {
    return <div className={`animate-pulse rounded-lg bg-crm-surface-raised ${className}`} />;
}

function CardsSkeleton() {
    return (
        <section className="space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-2">
                    <Block className="h-3 w-28" />
                    <Block className="h-8 w-64" />
                </div>
                <Block className="h-10 w-80 max-w-full" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="rounded-2xl border border-crm-line bg-crm-surface-alt p-5">
                        <div className="flex items-center justify-between">
                            <Block className="h-4 w-24" />
                            <Block className="h-9 w-9 rounded-full" />
                        </div>
                        <Block className="mt-4 h-8 w-16" />
                    </div>
                ))}
            </div>

            <div className="grid gap-5 xl:grid-cols-3">
                <div className="rounded-2xl border border-crm-line bg-crm-surface-alt p-5 xl:col-span-2">
                    <Block className="h-4 w-32" />
                    <Block className="mt-2 h-6 w-48" />
                    <div className="mt-5 space-y-4">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <Block className="h-8 w-8 rounded-full" />
                                <div className="flex-1 space-y-2">
                                    <Block className="h-3.5 w-40" />
                                    <Block className="h-3 w-28" />
                                </div>
                                <Block className="h-5 w-20 rounded-full" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-2xl border border-crm-line bg-crm-surface-alt p-5">
                    <Block className="h-4 w-24" />
                    <Block className="mt-2 h-6 w-40" />
                    <Block className="mt-5 h-2.5 w-full rounded-full" />
                    <div className="mt-5 space-y-3">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <Block className="h-3.5 w-24" />
                                <Block className="h-3.5 w-6" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function TableSkeleton({ rows = 8 }: { rows?: number }) {
    return (
        <section className="space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-2">
                    <Block className="h-3 w-24" />
                    <Block className="h-8 w-72" />
                </div>
                <Block className="h-10 w-72 max-w-full" />
            </div>

            <Block className="h-11 w-full max-w-xs" />

            <div className="overflow-hidden rounded-2xl border border-crm-line bg-crm-surface-alt">
                <div className="border-b border-crm-line bg-crm-surface-raised px-5 py-3.5">
                    <Block className="h-3 w-full max-w-md" />
                </div>
                <div className="divide-y divide-crm-line-soft">
                    {Array.from({ length: rows }).map((_, index) => (
                        <div key={index} className="flex items-center gap-4 px-5 py-4">
                            <Block className="h-9 w-9 shrink-0 rounded-full" />
                            <div className="flex-1 space-y-2">
                                <Block className="h-3.5 w-1/3" />
                                <Block className="h-3 w-1/4" />
                            </div>
                            <Block className="h-5 w-20 shrink-0 rounded-full" />
                            <Block className="hidden h-3.5 w-24 shrink-0 sm:block" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

interface DashboardSkeletonProps {
    variant: "cards" | "table";
    rows?: number;
}

export default function DashboardSkeleton({ variant, rows }: DashboardSkeletonProps) {
    return variant === "cards" ? <CardsSkeleton /> : <TableSkeleton rows={rows} />;
}
