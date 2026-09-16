import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  HardHat,
  Home,
  MapPin,
  Menu,
  ShieldCheck,
  User,
  X,
  Bus,
} from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";
import { LogoWordmark } from "@/components/brand/logo";
import { unreadCount, useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const TABS = [
  { to: "/", label: "Inicio", icon: Home },
  { to: "/mapa", label: "Mapa", icon: MapPin },
  { to: "/notificaciones", label: "Notificaciones", icon: Bell },
  { to: "/perfil", label: "Perfil", icon: User },
] as const;

const DESKTOP_LINKS = [
  { to: "/", label: "Inicio" },
  { to: "/mapa", label: "Mapa" },
  { to: "/obras", label: "Obras" },
  { to: "/paraderos", label: "Transporte" },
  { to: "/reportes", label: "Reportes" },
] as const;

const MENU_LINKS = [
  { to: "/obras", label: "Obras públicas", icon: HardHat },
  { to: "/paraderos", label: "Paraderos y rutas", icon: Bus },
  { to: "/reportes", label: "Reportes y fiscalización", icon: ShieldCheck },
  { to: "/notificaciones", label: "Notificaciones", icon: Bell },
  { to: "/perfil", label: "Perfil", icon: User },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const unread = useAppStore((s) => unreadCount(s.notifications));
  const [menuOpen, setMenuOpen] = useState(false);

  const isMapChrome = pathname === "/" || pathname === "/mapa";

  return (
    <div className="flex min-h-dvh flex-col bg-bg">
      <header
        className={cn(
          "sticky top-0 z-40 flex items-center justify-between gap-3 px-4 py-3",
          isMapChrome
            ? "bg-navy text-primary-foreground"
            : "border-b border-border bg-surface text-fg",
        )}
      >
        <Link to="/" className="min-w-0" onClick={() => setMenuOpen(false)}>
          <LogoWordmark light={isMapChrome} />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {DESKTOP_LINKS.map((l) => {
            const active =
              l.to === "/"
                ? pathname === "/"
                : pathname === l.to || pathname.startsWith(l.to + "/");
            return (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "rounded-full px-3 py-2 text-sm font-semibold transition-colors",
                  isMapChrome
                    ? active
                      ? "bg-primary-foreground/15 text-primary-foreground"
                      : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                    : active
                      ? "bg-primary/10 text-primary"
                      : "text-muted hover:bg-bg hover:text-fg",
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <Link
            to="/notificaciones"
            className={cn(
              "relative grid size-11 place-items-center rounded-full",
              isMapChrome ? "hover:bg-primary-foreground/10" : "hover:bg-bg",
            )}
            aria-label="Notificaciones"
          >
            <Bell className="size-5" />
            {unread > 0 ? (
              <span className="absolute right-2 top-2 size-2 rounded-full bg-closed" />
            ) : null}
          </Link>
          <button
            type="button"
            className={cn(
              "grid size-11 place-items-center rounded-full lg:hidden",
              isMapChrome ? "hover:bg-primary-foreground/10" : "hover:bg-bg",
            )}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      {menuOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-navy-deep/40"
            aria-label="Cerrar menú"
            onClick={() => setMenuOpen(false)}
          />
          <aside className="absolute right-0 top-0 flex h-full w-72 flex-col gap-1 bg-surface p-4 pt-20 shadow-xl">
            {MENU_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-fg hover:bg-bg"
              >
                <l.icon className="size-5 text-primary" />
                {l.label}
              </Link>
            ))}
          </aside>
        </div>
      ) : null}

      <main className="relative flex min-h-0 flex-1 flex-col pb-16 lg:pb-0">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-4 border-t border-border bg-surface pb-[env(safe-area-inset-bottom)] lg:hidden">
        {TABS.map((tab) => {
          const active =
            tab.to === "/"
              ? pathname === "/"
              : pathname === tab.to || pathname.startsWith(tab.to + "/");
          const Icon = tab.icon;
          return (
            <Link
              key={tab.to}
              to={tab.to}
              className={cn(
                "flex min-h-16 flex-col items-center justify-center gap-1 text-[11px] font-semibold",
                active ? "text-primary" : "text-muted",
              )}
            >
              <span className="relative">
                <Icon className="size-5" />
                {tab.to === "/notificaciones" && unread > 0 ? (
                  <span className="absolute -right-0.5 -top-0.5 size-1.5 rounded-full bg-closed" />
                ) : null}
              </span>
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
