import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Calendar,
  ChevronLeft,
  Clock,
  MapPin,
  Route as RouteIcon,
  Share2,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { STATUS_LABEL, workById, type WorkStatus } from "@/lib/data/city";
import { formatDate, formatDateRange } from "@/lib/utils";

export const Route = createFileRoute("/obras/$id")({
  component: WorkDetailPage,
});

const VARIANT: Record<WorkStatus, "work" | "alt" | "muted"> = {
  "en-ejecucion": "work",
  planificada: "muted",
  finalizada: "alt",
};

function WorkDetailPage() {
  const { id } = Route.useParams();
  const work = workById(id);
  const [photo, setPhoto] = useState<string | null>(null);

  if (!work) {
    return (
      <div className="px-4 py-16 text-center">
        <p className="font-display text-lg font-semibold">Obra no encontrada</p>
        <Link to="/obras" className="mt-3 inline-block text-sm text-primary">
          Volver al listado
        </Link>
      </div>
    );
  }

  const title = work.title;

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Enlace copiado");
      }
    } catch {
      /* cancelled */
    }
  }

  return (
    <div className="mx-auto w-full max-w-lg bg-surface lg:my-6 lg:overflow-hidden lg:rounded-3xl lg:shadow-[var(--shadow-border)]">
      <div className="flex items-center justify-between px-2 py-2">
        <Link
          to="/obras"
          className="flex h-11 items-center gap-1 rounded-full px-2 text-sm font-semibold text-navy"
        >
          <ChevronLeft className="size-5" />
          Obra pública
        </Link>
        <button
          type="button"
          onClick={share}
          className="grid size-11 place-items-center rounded-full text-navy hover:bg-bg"
          aria-label="Compartir"
        >
          <Share2 className="size-5" />
        </button>
      </div>

      <button
        type="button"
        className="block w-full"
        onClick={() => setPhoto(work.photos[0]?.src ?? null)}
      >
        <img
          src={work.photos[0]?.src}
          alt={work.photos[0]?.alt ?? work.title}
          className="h-52 w-full object-cover sm:h-64"
        />
      </button>

      <div className="space-y-5 px-5 py-5">
        <Badge variant={VARIANT[work.status]}>
          <span className="size-1.5 rounded-full bg-current" />
          {STATUS_LABEL[work.status]}
        </Badge>

        <h1 className="font-display text-2xl font-semibold leading-snug text-navy">
          {work.title}
        </h1>

        <Fact
          icon={<MapPin className="size-5 text-work" />}
          label="Ubicación"
          value={work.location}
        />
        <Fact
          icon={<Calendar className="size-5 text-primary" />}
          label="Inicio – Término previsto"
          value={formatDateRange(work.startDate, work.endDate)}
        />

        <div>
          <p className="text-sm font-semibold text-fg">Estado de avance</p>
          <div className="mt-2 flex items-center gap-3">
            <Progress value={work.progress} className="flex-1" />
            <span className="text-sm font-semibold tabular-nums text-alt">
              {work.progress}%
            </span>
          </div>
        </div>

        <Fact
          icon={<Clock className="size-5 text-primary" />}
          label="Tiempo estimado de ejecución"
          value={work.duration}
        />
        <Fact
          icon={<RouteIcon className="size-5 text-alt" />}
          label="Ruta alternativa habilitada"
          value={work.alternative.label}
        />

        <p className="text-sm leading-relaxed text-muted">{work.description}</p>
        <p className="text-xs text-muted">
          Contratista: {work.contractor} · Inversión: {work.investment}
        </p>

        {work.photos.length > 1 ? (
          <div>
            <p className="text-sm font-semibold text-fg">
              Evidencia fotográfica del avance
            </p>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {work.photos.map((p) => (
                <button
                  key={p.src}
                  type="button"
                  onClick={() => setPhoto(p.src)}
                  className="shrink-0"
                >
                  <img
                    src={p.src}
                    alt={p.alt}
                    className="h-20 w-28 rounded-xl object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {work.updates.length > 0 ? (
          <div className="space-y-2">
            <p className="text-sm font-semibold text-fg">Últimas actualizaciones</p>
            {work.updates.map((u) => (
              <p key={u.date} className="text-sm text-muted">
                <span className="font-semibold text-fg">{formatDate(u.date)}</span>{" "}
                {u.text}
              </p>
            ))}
          </div>
        ) : null}
      </div>

      <div className="sticky bottom-16 border-t border-border bg-surface p-4 lg:bottom-0">
        <Button asChild variant="navy" className="h-12 w-full rounded-2xl">
          <Link to="/mapa" search={{ obra: work.id }}>
            <MapPin className="size-4" />
            Ver en el mapa
          </Link>
        </Button>
      </div>

      <Dialog open={!!photo} onOpenChange={() => setPhoto(null)}>
        <DialogContent className="p-2">
          {photo ? (
            <img
              src={photo}
              alt="Evidencia de la obra"
              className="max-h-[80vh] w-full rounded-xl object-contain"
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Fact({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5">{icon}</div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          {label}
        </p>
        <p className="text-sm font-medium leading-snug text-fg">{value}</p>
      </div>
    </div>
  );
}
