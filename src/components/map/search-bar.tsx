import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { CLOSURES, STOPS, WORKS } from "@/lib/data/city";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function SearchBar({ className }: { className?: string }) {
  const search = useAppStore((s) => s.search);
  const setSearch = useAppStore((s) => s.setSearch);
  const select = useAppStore((s) => s.select);
  const requestFlyTo = useAppStore((s) => s.requestFlyTo);
  const [open, setOpen] = useState(false);

  const results = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (q.length < 2) return [];
    const works = WORKS.filter(
      (w) =>
        w.title.toLowerCase().includes(q) ||
        w.location.toLowerCase().includes(q),
    ).map((w) => ({
      id: w.id,
      kind: "work" as const,
      title: w.title,
      meta: w.location,
      lat: w.lat,
      lng: w.lng,
    }));
    const stops = STOPS.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.reference.toLowerCase().includes(q),
    ).map((s) => ({
      id: s.id,
      kind: "stop" as const,
      title: s.name,
      meta: `Rutas ${s.routes.join(", ")}`,
      lat: s.lat,
      lng: s.lng,
    }));
    const closures = CLOSURES.filter((c) =>
      c.name.toLowerCase().includes(q),
    ).map((c) => ({
      id: c.id,
      kind: "closure" as const,
      title: c.name,
      meta: c.reason,
      lat: c.lat,
      lng: c.lng,
    }));
    return [...works, ...stops, ...closures].slice(0, 8);
  }, [search]);

  return (
    <div className={cn("relative", className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder="Buscar rutas, obras, paraderos..."
        className="h-11 w-full rounded-full border-0 bg-surface pl-10 pr-10 text-sm text-fg shadow-[var(--shadow-border)] placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
      {search ? (
        <button
          type="button"
          className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-muted hover:bg-bg"
          onClick={() => {
            setSearch("");
            setOpen(false);
          }}
          aria-label="Limpiar búsqueda"
        >
          <X className="size-4" />
        </button>
      ) : null}
      {open && results.length > 0 ? (
        <ul className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl bg-surface py-1 shadow-[var(--shadow-border)]">
          {results.map((r) => (
            <li key={`${r.kind}-${r.id}`}>
              <button
                type="button"
                className="flex w-full flex-col items-start px-4 py-2.5 text-left hover:bg-bg"
                onClick={() => {
                  select(r.kind, r.id);
                  requestFlyTo(r.lat, r.lng, 16);
                  setOpen(false);
                }}
              >
                <span className="text-sm font-semibold text-fg">{r.title}</span>
                <span className="line-clamp-1 text-xs text-muted">{r.meta}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
