import { createFileRoute, Link } from "@tanstack/react-router";
import { Bus, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ROUTES, STOPS } from "@/lib/data/city";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/paraderos")({
  component: ParaderosPage,
});

function ParaderosPage() {
  const select = useAppStore((s) => s.select);
  const requestFlyTo = useAppStore((s) => s.requestFlyTo);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-stop">
        Paraderos y transporte
      </p>
      <h1 className="mt-1 font-display text-2xl font-semibold text-navy">
        Paraderos oficiales de Trujillo
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Refugios formales, rutas T1–T3 y el mapa en vivo. Evita paraderos
        informales: repórtalos desde fiscalización.
      </p>

      <img
        src="/images/ciudad/paradero.jpg"
        alt="Paradero oficial en avenida de Trujillo"
        className="mt-5 h-48 w-full rounded-2xl object-cover"
      />

      <div className="mt-6 space-y-3">
        <h2 className="font-display text-lg font-semibold">Rutas activas</h2>
        {ROUTES.map((r) => (
          <div
            key={r.id}
            className="flex items-center gap-3 rounded-2xl bg-surface p-4 shadow-[var(--shadow-border)]"
          >
            <span className="grid size-10 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {r.id}
            </span>
            <div>
              <p className="text-sm font-semibold">{r.name}</p>
              <p className="text-xs text-muted">Línea continua en el mapa</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-3">
        <h2 className="font-display text-lg font-semibold">Paraderos</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {STOPS.map((s) => (
            <div
              key={s.id}
              className="rounded-2xl bg-surface p-4 shadow-[var(--shadow-border)]"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="grid size-9 place-items-center rounded-full bg-stop text-primary-foreground">
                    <Bus className="size-4" />
                  </span>
                  <div>
                    <p className="font-semibold">{s.name}</p>
                    <p className="text-xs text-muted">{s.reference}</p>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {s.routes.map((rt) => (
                  <Badge key={rt} variant="stop">
                    {rt}
                  </Badge>
                ))}
              </div>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="mt-3"
                onClick={() => {
                  select("stop", s.id);
                  requestFlyTo(s.lat, s.lng, 16);
                }}
              >
                <Link to="/mapa">
                  <MapPin className="size-3.5" />
                  Ver en el mapa
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
