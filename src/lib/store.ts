import { create } from "zustand";
import { SEED_REPORTS, type SeedReport } from "@/lib/data/city";

export type LayerKey =
  | "stops"
  | "works"
  | "closures"
  | "alts"
  | "routes"
  | "reports";

export type SelectedKind = "stop" | "work" | "closure" | "report" | null;

export interface CitizenReport extends SeedReport {
  mine?: boolean;
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  time: string;
  kind: "obra" | "ruta" | "reporte";
  href?: string;
  read: boolean;
}

interface AppState {
  layers: Record<LayerKey, boolean>;
  toggleLayer: (key: LayerKey) => void;
  setLayer: (key: LayerKey, on: boolean) => void;
  selectedKind: SelectedKind;
  selectedId: string | null;
  select: (kind: SelectedKind, id: string | null) => void;
  search: string;
  setSearch: (q: string) => void;
  flyTo: { lat: number; lng: number; zoom?: number; nonce: number } | null;
  requestFlyTo: (lat: number, lng: number, zoom?: number) => void;
  reports: CitizenReport[];
  addReport: (
    r: Omit<CitizenReport, "id" | "createdAt" | "status" | "mine">,
  ) => void;
  notifications: AppNotification[];
  markAllRead: () => void;
  pickLocation: boolean;
  setPickLocation: (v: boolean) => void;
}

const INITIAL_NOTES: AppNotification[] = [
  {
    id: "n1",
    title: "Av. América: desvío habilitado",
    body: "Desde hoy puedes usar Av. Mansiche y Av. El Golf mientras dure la obra.",
    time: "Hoy, 08:10",
    kind: "obra",
    href: "/obras/av-america",
    read: false,
  },
  {
    id: "n2",
    title: "Ruta T3 con retraso",
    body: "El anillo América circula por el desvío sur. Tiempo extra estimado: 12 min.",
    time: "Ayer, 18:40",
    kind: "ruta",
    href: "/mapa",
    read: false,
  },
  {
    id: "n3",
    title: "Tu reporte fue recibido",
    body: "Semáforo intermitente en Larco / América — código #rep-2.",
    time: "15 set, 21:05",
    kind: "reporte",
    href: "/reportes",
    read: true,
  },
];

export const useAppStore = create<AppState>()((set, get) => ({
  layers: {
    stops: true,
    works: true,
    closures: true,
    alts: true,
    routes: true,
    reports: true,
  },
  toggleLayer: (key) =>
    set({ layers: { ...get().layers, [key]: !get().layers[key] } }),
  setLayer: (key, on) => set({ layers: { ...get().layers, [key]: on } }),
  selectedKind: null,
  selectedId: null,
  select: (kind, id) => set({ selectedKind: kind, selectedId: id }),
  search: "",
  setSearch: (q) => set({ search: q }),
  flyTo: null,
  requestFlyTo: (lat, lng, zoom = 16) =>
    set({ flyTo: { lat, lng, zoom, nonce: Date.now() } }),
  reports: SEED_REPORTS,
  addReport: (r) => {
    const report: CitizenReport = {
      ...r,
      id: `rep-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "recibido",
      mine: true,
    };
    set({
      reports: [report, ...get().reports],
      notifications: [
        {
          id: `n-${Date.now()}`,
          title: "Reporte enviado",
          body: `${report.title} — lo revisará fiscalización municipal.`,
          time: "Ahora",
          kind: "reporte",
          href: "/reportes",
          read: false,
        },
        ...get().notifications,
      ],
    });
  },
  notifications: INITIAL_NOTES,
  markAllRead: () =>
    set({
      notifications: get().notifications.map((n) => ({ ...n, read: true })),
    }),
  pickLocation: false,
  setPickLocation: (v) => set({ pickLocation: v }),
}));

export const unreadCount = (notes: AppNotification[]) =>
  notes.filter((n) => !n.read).length;
