import { AlertTriangle, Bus, GitBranch, HardHat } from "lucide-react";
import { useAppStore, type LayerKey } from "@/lib/store";
import { cn } from "@/lib/utils";

const ITEMS: {
  key: LayerKey;
  label: string;
  icon: typeof Bus;
  swatch: string;
}[] = [
  { key: "stops", label: "Paraderos oficiales", icon: Bus, swatch: "bg-stop" },
  { key: "works", label: "Obras en ejecución", icon: HardHat, swatch: "bg-work" },
  { key: "closures", label: "Vías cerradas", icon: AlertTriangle, swatch: "bg-closed" },
  { key: "alts", label: "Rutas alternativas", icon: GitBranch, swatch: "bg-alt" },
];

export function MapLegend({ compact = false }: { compact?: boolean }) {
  const layers = useAppStore((s) => s.layers);
  const toggle = useAppStore((s) => s.toggleLayer);

  return (
    <div
      className={cn(
        "rounded-2xl bg-surface/95 p-3 shadow-[var(--shadow-border)] backdrop-blur-sm",
        compact ? "space-y-1.5" : "space-y-2",
      )}
    >
      {ITEMS.map((item) => {
        const on = layers[item.key];
        const Icon = item.icon;
        return (
          <button
            key={item.key}
            type="button"
            onClick={() => toggle(item.key)}
            className={cn(
              "flex w-full items-center gap-2.5 rounded-xl px-1.5 py-1 text-left text-xs font-semibold transition-opacity",
              on ? "text-fg" : "opacity-40",
            )}
          >
            <span
              className={cn(
                "grid size-6 place-items-center rounded-full text-primary-foreground",
                item.swatch,
                item.key === "closures" && "rounded-md",
                item.key === "alts" && "rounded-md",
              )}
            >
              {item.key === "alts" ? (
                <span className="block h-0.5 w-3.5 border-t-2 border-dashed border-primary-foreground" />
              ) : (
                <Icon className="size-3.5" />
              )}
            </span>
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
