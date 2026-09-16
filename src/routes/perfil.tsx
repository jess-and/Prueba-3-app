import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, ChevronRight, MapPin, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/perfil")({ component: PerfilPage });

function PerfilPage() {
  const reports = useAppStore((s) => s.reports);
  const mine = reports.filter((r) => r.mine);
  const [name, setName] = useState("Ciudadano de Trujillo");

  useEffect(() => {
    const saved = localStorage.getItem("tc-name");
    if (saved) setName(saved);
  }, []);

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-6">
      <h1 className="font-display text-2xl font-semibold text-navy">Perfil</h1>
      <p className="mt-1 text-sm text-muted">
        Datos locales de este dispositivo. No necesitas una cuenta para reportar.
      </p>

      <div className="mt-6 rounded-2xl bg-navy p-5 text-primary-foreground">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary-foreground/70">
          Vecino
        </p>
        <Input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            localStorage.setItem("tc-name", e.target.value);
          }}
          className="mt-2 border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/60"
        />
        <p className="mt-3 text-sm text-primary-foreground/80">
          Trujillo, La Libertad
        </p>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <Stat n={mine.length} label="Reportes" />
        <Stat n={reports.length} label="En el mapa" />
        <Stat n={5} label="Obras" />
      </div>

      <div className="mt-6 divide-y divide-border overflow-hidden rounded-2xl bg-surface shadow-[var(--shadow-border)]">
        <Row to="/reportes" icon={ShieldCheck} label="Mis reportes" />
        <Row to="/mapa" icon={MapPin} label="Mapa de Trujillo" />
        <Row to="/notificaciones" icon={Bell} label="Alertas de obras" />
      </div>

      <p className="mt-8 text-center text-xs text-muted">
        Trujillo Conecta · Municipalidad Provincial de Trujillo
      </p>
    </div>
  );
}

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <div className="rounded-2xl bg-surface p-4 text-center shadow-[var(--shadow-border)]">
      <p className="font-display text-xl font-semibold tabular-nums text-navy">
        {n}
      </p>
      <p className="text-xs text-muted">{label}</p>
    </div>
  );
}

function Row({
  to,
  icon: Icon,
  label,
}: {
  to: "/reportes" | "/mapa" | "/notificaciones";
  icon: typeof MapPin;
  label: string;
}) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 px-4 py-3.5 text-sm font-semibold hover:bg-bg"
    >
      <Icon className="size-5 text-primary" />
      <span className="flex-1">{label}</span>
      <ChevronRight className="size-4 text-muted" />
    </Link>
  );
}
