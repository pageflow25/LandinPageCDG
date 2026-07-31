const PALETTE = [
    "bg-azul-principal/15 text-azul-principal",
    "bg-azul-destaque/15 text-azul-destaque",
    "bg-emerald-500/15 text-emerald-600",
    "bg-amber-500/15 text-amber-600",
    "bg-fuchsia-500/15 text-fuchsia-600",
    "bg-indigo-500/15 text-indigo-600",
];

function initialsOf(name: string): string {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "?";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function colorFor(name: string): string {
    let hash = 0;
    for (let i = 0; i < name.length; i += 1) {
        hash = (hash << 5) - hash + name.charCodeAt(i);
        hash |= 0;
    }
    return PALETTE[Math.abs(hash) % PALETTE.length];
}

interface InitialsAvatarProps {
    name: string;
    size?: "sm" | "md";
}

export default function InitialsAvatar({ name, size = "md" }: InitialsAvatarProps) {
    const dimension = size === "sm" ? "h-8 w-8 text-xs" : "h-10 w-10 text-sm";

    return (
        <span
            className={`flex ${dimension} shrink-0 items-center justify-center rounded-full font-semibold ${colorFor(name)}`}
            aria-hidden="true"
        >
            {initialsOf(name)}
        </span>
    );
}
