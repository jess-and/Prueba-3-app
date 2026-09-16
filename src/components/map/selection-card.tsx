import { Link } from "@tanstack/react-router";
import { Calendar, MapPin, Route, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  CLOSURES,
  STATUS_LABEL,
  STOPS,
  workById,
  type WorkStatus,
} from "@/lib/data/city";
import { useAppStore } from "@/lib/store";
import { formatDateRange } from "@/lib/utils";

const STATUS_VARIANT: Record<WorkStatus, "work" | "alt" | "muted"> = {
  "en-ejecucion": "work",
  planificada: "muted",
  finalizada: "alt",
};

export function SelectionCard() {
  const kind = useAppStore((s) => s.selectedKind);
  const id = useAppStore((s) => s.selectedId);
  const select = useAppStore((s) => s.select);
  const reports = useAppStore((s) => s.reports);

  if (!kind || !id) return null;

  const close = () => select(null, null);

  if (kind === "work") {
    const w = workById(id);
    if (!w) return null;
    return (
      <article className="overflow-hidden rounded-2xl bg-surface shadow-[var(--shadow-border)]">
        <img
          src={w.photos[0]?.src}
          alt={w.photos[0]?.alt ?? w.title}
          className="h-28 w-full object-cover"
        />
        <div className="space-y-3 p-4">
          <div className="flex items-start justify-between gap-2">
            <Badge variant={STATUS_VARIANT[w.status]}>
              {STATUS_LABEL[w.status]}
            </Badge>
            <button
              type="button"
              onClick={close}
              className="grid size-8 place-items-center rounded-full text-muted hover:bg-bg"
              aria-label="Cerrar"
            >
              <X className="size-4" />
            </button>
          </div>
          <h3 className="font-display text-base font-semibold leading-snug">
            {w.title}
          </h3>
          <p className="flex gap-2 text-xs text-muted">
            <MapPin className="mt-0.5 size-3.5 shrink-0 text-work" />
            {w.location}
          </p>
          <div>
            <div className="mb-1 flex items-center justify-between text-xs font-semibold">
              <span className="text-muted">Estado de avance</span>
              <span className="tabular-nums text-alt">{w.progress}%</span>
            </div>
            <Progress value={w.progress} />
          </div>
          <Button asChild className="w-full">
            <Link to="/obras/$id" params={{ id: w.id }}>
              Ver ficha de la obra
            </Link>
          </Button>
        </div>
      </article>
    );
  }

  if (kind === "stop") {
    const s = STOPS.find((x) => x.id === id);
    if (!s) return null;
    return (
      <article className="rounded-2xl bg-surface p-4 shadow-[var(--shadow-border)]">
        <div className="flex items-start justify-between">
          <Badge variant="stop">Paradero oficial</Badge>
          <button
            type="button"
            onClick={close}
            className="grid size-8 place-items-center rounded-full text-muted hover:bg-bg"
            aria-label="Cerrar"
          >
            <X className="size-4" />
          </button>
        </div>
        <h3 className="mt-2 font-display text-base font-semibold">{s.name}</h3>
        <p className="mt-1 text-xs text-muted">{s.reference}</p>
        <p className="mt-3 text-sm font-semibold text-fg">
          Rutas {s.routes.join(" · ")}
        </p>
        <Button asChild variant="outline" className="mt-3 w-full">
          <Link to="/paraderos">Ver transporte</Link>
        </Button>
      </article>
    );
  }

  if (kind === "closure") {
    const c = CLOSURES.find((x) => x.id === id);
    if (!c) return null;
    return (
      <article className="rounded-2xl bg-surface p-4 shadow-[var(--shadow-border)]">
        <div className="flex items-start justify-between">
          <Badge variant="closed">Vía cerrada</Badge>
          <button
            type="button"
            onClick={close}
            className="grid size-8 place-items-center rounded-full text-muted hover:bg-bg"
            aria-label="Cerrar"
          >
            <X className="size-4" />
          </button>
        </div>
        <h3 className="mt-2 font-display text-base font-semibold">{c.name}</h3>
        <p className="mt-2 text-sm text-muted">{c.reason}</p>
        <p className="mt-2 flex items-center gap-2 text-xs text-muted">
          <Calendar className="size-3.5" />
          Hasta {c.until}
        </p>
        <p className="mt-2 flex items-center gap-2 text-xs font-semibold text-alt">
          <Route className="size-3.5" />
          Usa la ruta alternativa marcada en verde
        </p>
      </article>
    );
  }

  const r = reports.find((x) => x.id === id);
  if (!r) return null;
  return (
    <article className="rounded-2xl bg-surface p-4 shadow-[var(--shadow-border)]">
      <div className="flex items-start justify-between">
        <Badge variant="alt">{r.status.replace("-", " ")}</Badge>
        <button
          type="button"
          onClick={close}
          className="grid size-8 place-items-center rounded-full text-muted hover:bg-bg"
          aria-label="Cerrar"
        >
          <X className="size-4" />
        </button>
      </div>
      <h3 className="mt-2 font-display text-base font-semibold">{r.title}</h3>
      <p className="mt-1 text-sm text-muted">{r.detail}</p>
      <p className="mt-2 text-xs text-muted">{r.place}</p>
    </article>
  );
}
