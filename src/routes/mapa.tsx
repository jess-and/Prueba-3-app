import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { useEffect } from "react";
import { CityMap } from "@/components/map/city-map";
import { MapLegend } from "@/components/map/legend";
import { SearchBar } from "@/components/map/search-bar";
import { SelectionCard } from "@/components/map/selection-card";
import { useAppStore } from "@/lib/store";
import { workById } from "@/lib/data/city";

const searchSchema = z.object({
  obra: z.string().optional(),
});

export const Route = createFileRoute("/mapa")({
  validateSearch: searchSchema,
  component: MapaPage,
});

function MapaPage() {
  const { obra } = Route.useSearch();
  const select = useAppStore((s) => s.select);
  const requestFlyTo = useAppStore((s) => s.requestFlyTo);
  const picking = useAppStore((s) => s.pickLocation);

  useEffect(() => {
    if (!obra) return;
    const w = workById(obra);
    if (!w) return;
    select("work", w.id);
    requestFlyTo(w.lat, w.lng, 16);
  }, [obra, requestFlyTo, select]);

  return (
    <section className="relative min-h-[calc(100dvh-8rem)] flex-1 lg:min-h-[calc(100dvh-4.5rem)]">
      <CityMap
        focusWorkId={obra}
        interactivePick
        className="absolute inset-0 h-full w-full"
      />
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-3 sm:p-4">
        <div className="pointer-events-auto mx-auto w-full max-w-xl space-y-2">
          <SearchBar />
          {picking ? (
            <p className="rounded-full bg-navy px-4 py-2 text-center text-xs font-semibold text-primary-foreground shadow-[var(--shadow-border)]">
              Toca el mapa para marcar el reporte
            </p>
          ) : null}
        </div>
        <div className="pointer-events-auto flex items-end gap-3">
          <div className="w-52 sm:w-56">
            <MapLegend />
          </div>
          <div className="hidden max-w-sm flex-1 md:block">
            <SelectionCard />
          </div>
        </div>
      </div>
      <div className="pointer-events-auto absolute inset-x-3 bottom-3 z-20 md:hidden">
        <SelectionCard />
      </div>
    </section>
  );
}
