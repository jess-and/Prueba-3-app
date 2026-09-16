import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { STATUS_LABEL, WORKS, type WorkStatus } from "@/lib/data/city";

export const Route = createFileRoute("/obras")({ component: ObrasPage });

const VARIANT: Record<WorkStatus, "work" | "alt" | "muted"> = {
  "en-ejecucion": "work",
  planificada: "muted",
  finalizada: "alt",
};

function ObrasPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-work">
        Obras públicas
      </p>
      <h1 className="mt-1 font-display text-2xl font-semibold text-navy">
        Avance real de las obras de Trujillo
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Ubicación, fechas, estado y evidencia fotográfica. Toca una obra para
        ver el detalle y la ruta alternativa.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {WORKS.map((w) => (
          <Link
            key={w.id}
            to="/obras/$id"
            params={{ id: w.id }}
            className="overflow-hidden rounded-2xl bg-surface shadow-[var(--shadow-border)] transition-transform duration-150 hover:-translate-y-0.5"
          >
            <img
              src={w.photos[0]?.src}
              alt={w.photos[0]?.alt ?? w.title}
              className="h-40 w-full object-cover"
            />
            <div className="space-y-3 p-4">
              <Badge variant={VARIANT[w.status]}>{STATUS_LABEL[w.status]}</Badge>
              <h2 className="font-display text-lg font-semibold leading-snug">
                {w.title}
              </h2>
              <p className="flex gap-2 text-xs text-muted">
                <MapPin className="mt-0.5 size-3.5 shrink-0 text-work" />
                {w.location}
              </p>
              <div>
                <div className="mb-1 flex justify-between text-xs font-semibold">
                  <span className="text-muted">Avance</span>
                  <span className="tabular-nums text-alt">{w.progress}%</span>
                </div>
                <Progress value={w.progress} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
