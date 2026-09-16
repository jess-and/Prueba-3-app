import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { REPORT_CATEGORIES, STOPS, type ReportCategory } from "@/lib/data/city";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/reportes")({
  component: ReportesPage,
});

function ReportesPage() {
  const reports = useAppStore((s) => s.reports);
  const addReport = useAppStore((s) => s.addReport);
  const setPick = useAppStore((s) => s.setPickLocation);
  const [category, setCategory] = useState<ReportCategory>("hueco");
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [placeId, setPlaceId] = useState(STOPS[0]?.id ?? "plaza");

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim() || !detail.trim()) {
      toast.error("Completa título y detalle");
      return;
    }
    const stop = STOPS.find((s) => s.id === placeId) ?? STOPS[0];
    addReport({
      category,
      title: title.trim(),
      detail: detail.trim(),
      lat: stop.lat,
      lng: stop.lng,
      place: stop.name,
    });
    setTitle("");
    setDetail("");
    toast.success("Reporte enviado a fiscalización");
  }

  return (
    <div className="mx-auto grid w-full max-w-5xl gap-8 px-4 py-6 lg:grid-cols-[1fr_1.1fr]">
      <section>
        <p className="text-sm font-semibold uppercase tracking-wide text-alt">
          Reportes y fiscalización
        </p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-navy">
          Avísale a tu ciudad
        </h1>
        <p className="mt-2 text-sm text-muted">
          Huecos, semáforos, paraderos informales o residuos. El reporte queda
          georreferenciado en el mapa.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <label className="block text-sm font-semibold">
            Tipo
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ReportCategory)}
              className="mt-1.5 h-11 w-full rounded-xl border border-border bg-surface px-3 text-sm shadow-[var(--shadow-border)]"
            >
              {REPORT_CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-semibold">
            Título
            <Input
              className="mt-1.5"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej. Hueco en Av. América Norte"
            />
          </label>
          <label className="block text-sm font-semibold">
            Detalle
            <Textarea
              className="mt-1.5"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              placeholder="Describe el problema y una referencia."
            />
          </label>
          <label className="block text-sm font-semibold">
            Cerca de
            <select
              value={placeId}
              onChange={(e) => setPlaceId(e.target.value)}
              className="mt-1.5 h-11 w-full rounded-xl border border-border bg-surface px-3 text-sm shadow-[var(--shadow-border)]"
            >
              {STOPS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button type="submit" className="flex-1">
              Enviar reporte
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              asChild
              onClick={() => setPick(true)}
            >
              <Link to="/mapa">Marcar en el mapa</Link>
            </Button>
          </div>
        </form>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg font-semibold">Reportes recientes</h2>
        {reports.map((r) => (
          <article
            key={r.id}
            className="rounded-2xl bg-surface p-4 shadow-[var(--shadow-border)]"
          >
            <div className="flex items-center justify-between gap-2">
              <Badge variant={r.mine ? "alt" : "muted"}>
                {r.status.replace("-", " ")}
              </Badge>
              <span className="text-xs text-muted">
                {new Date(r.createdAt).toLocaleDateString("es-PE")}
              </span>
            </div>
            <h3 className="mt-2 font-semibold">{r.title}</h3>
            <p className="mt-1 text-sm text-muted">{r.detail}</p>
            <p className="mt-2 flex items-center gap-1.5 text-xs text-muted">
              <MapPin className="size-3.5" />
              {r.place}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
