import { Link } from "@tanstack/react-router";
import { Bus, ClipboardCheck, HardHat, TrafficCone } from "lucide-react";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    to: "/paraderos",
    title: "Paraderos y transporte",
    icon: Bus,
    tone: "bg-stop",
  },
  {
    to: "/mapa",
    title: "Tráfico y rutas",
    icon: TrafficCone,
    tone: "bg-alt",
  },
  {
    to: "/obras",
    title: "Obras públicas",
    icon: HardHat,
    tone: "bg-work",
  },
  {
    to: "/reportes",
    title: "Reportes y fiscalización",
    icon: ClipboardCheck,
    tone: "bg-alt",
  },
] as const;

export function FeatureGrid({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cn("grid grid-cols-4 gap-2", compact ? "gap-2" : "gap-3")}>
      {FEATURES.map((f) => {
        const Icon = f.icon;
        return (
          <Link
            key={f.to + f.title}
            to={f.to}
            className="group flex flex-col items-center gap-2 text-center"
          >
            <span
              className={cn(
                "grid size-14 place-items-center rounded-full text-primary-foreground shadow-sm transition-transform duration-150 group-hover:scale-105",
                f.tone,
              )}
            >
              <Icon className="size-6" />
            </span>
            <span className="max-w-20 text-xs font-semibold leading-tight text-muted">
              {f.title}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
