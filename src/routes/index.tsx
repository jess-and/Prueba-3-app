import { createFileRoute, Link } from "@tanstack/react-router";
import { FeatureGrid } from "@/components/home/feature-grid";
import { LogoMark } from "@/components/brand/logo";
import { CityMap } from "@/components/map/city-map";
import { MapLegend } from "@/components/map/legend";
import { SearchBar } from "@/components/map/search-bar";
import { SelectionCard } from "@/components/map/selection-card";
import { WORKS } from "@/lib/data/city";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const featured = WORKS[0];

  return (
    <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
      <aside className="hidden w-[380px] shrink-0 flex-col gap-6 overflow-y-auto border-r border-border bg-surface px-6 py-8 lg:flex">
        <div className="flex items-start gap-3">
          <LogoMark className="h-16 w-12" />
          <div>
            <p className="font-display text-xl font-bold leading-tight text-navy">
              TRUJILLO
              <span className="block text-brand">CONECTA</span>
            </p>
            <p className="mt-1 text-sm text-muted">Tu ciudad, en tus manos</p>
          </div>
        </div>

        <FeatureGrid />

        <p className="font-display text-2xl font-semibold leading-snug text-navy">
          Una sola plataforma, múltiples soluciones.
        </p>
        <p className="text-sm leading-relaxed text-muted">
          Consulta paraderos oficiales, desvíos, obras en tiempo real y envía
          reportes ciudadanos sobre el mapa de Trujillo.
        </p>

        <SelectionCard />

        {!featured ? null : (
          <Link
            to="/obras/$id"
            params={{ id: featured.id }}
            className="block overflow-hidden rounded-2xl bg-bg shadow-[var(--shadow-border)]"
          >
            <img
              src={featured.photos[0]?.src}
              alt={featured.photos[0]?.alt ?? featured.title}
              className="h-32 w-full object-cover"
            />
            <div className="p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-work">
                Obra destacada
              </p>
              <p className="mt-1 font-display font-semibold">{featured.title}</p>
              <p className="mt-1 text-xs text-muted">{featured.location}</p>
            </div>
          </Link>
        )}
      </aside>

      <section className="relative min-h-[calc(100dvh-8rem)] flex-1 lg:min-h-0">
        <CityMap className="absolute inset-0 h-full w-full" interactivePick />

        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-3 sm:p-4">
          <div className="pointer-events-auto mx-auto w-full max-w-xl space-y-3">
            <SearchBar />
            <div className="rounded-2xl bg-surface/95 p-3 shadow-[var(--shadow-border)] backdrop-blur-sm lg:hidden">
              <FeatureGrid compact />
            </div>
          </div>

          <div className="pointer-events-auto flex items-end justify-between gap-3">
            <div className="w-52 sm:w-56">
              <MapLegend compact />
            </div>
            <div className="hidden max-w-sm flex-1 md:block lg:hidden">
              <SelectionCard />
            </div>
          </div>
        </div>

        <div className="pointer-events-auto absolute inset-x-3 bottom-3 z-20 md:hidden">
          <SelectionCard />
        </div>
      </section>
    </div>
  );
}
