import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Bell, HardHat, Route as RouteIcon, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore, type AppNotification } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/notificaciones")({
  component: NotificacionesPage,
});

const ICONS = {
  obra: HardHat,
  ruta: RouteIcon,
  reporte: ShieldCheck,
};

function NotificacionesPage() {
  const notes = useAppStore((s) => s.notifications);
  const mark = useAppStore((s) => s.markAllRead);

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-navy">
            Notificaciones
          </h1>
          <p className="text-sm text-muted">Obras, desvíos y tus reportes</p>
        </div>
        <Button variant="ghost" size="sm" onClick={mark}>
          Marcar leídas
        </Button>
      </div>

      <ul className="mt-6 space-y-2">
        {notes.length === 0 ? (
          <li className="rounded-2xl bg-surface p-8 text-center text-sm text-muted">
            <Bell className="mx-auto mb-2 size-6" />
            No hay avisos por ahora.
          </li>
        ) : (
          notes.map((n) => <NoteRow key={n.id} n={n} />)
        )}
      </ul>
    </div>
  );
}

function NoteRow({ n }: { n: AppNotification }) {
  const router = useRouter();
  const Icon = ICONS[n.kind];
  return (
    <li>
      <button
        type="button"
        className="w-full text-left"
        onClick={() => {
          if (n.href) router.history.push(n.href);
        }}
      >
        <div
          className={cn(
            "flex gap-3 rounded-2xl bg-surface p-4 shadow-[var(--shadow-border)]",
            !n.read && "ring-1 ring-primary/20",
          )}
        >
          <span
            className={cn(
              "grid size-10 shrink-0 place-items-center rounded-full",
              n.kind === "obra" && "bg-work/15 text-work",
              n.kind === "ruta" && "bg-stop/15 text-stop",
              n.kind === "reporte" && "bg-alt/15 text-alt",
            )}
          >
            <Icon className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="font-semibold leading-snug">{n.title}</p>
            <p className="mt-1 text-sm text-muted">{n.body}</p>
            <p className="mt-2 text-xs text-muted">{n.time}</p>
          </div>
          {!n.read ? (
            <span className="mt-2 size-2 shrink-0 rounded-full bg-primary" />
          ) : null}
        </div>
      </button>
    </li>
  );
}
