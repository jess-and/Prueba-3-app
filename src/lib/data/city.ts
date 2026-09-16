export type LatLng = [number, number];

export type WorkStatus = "en-ejecucion" | "planificada" | "finalizada";

export interface PublicWork {
  id: string;
  title: string;
  status: WorkStatus;
  progress: number;
  location: string;
  district: string;
  startDate: string;
  endDate: string;
  duration: string;
  description: string;
  contractor: string;
  investment: string;
  lat: number;
  lng: number;
  path: LatLng[];
  alternative: { label: string; path: LatLng[] };
  photos: { src: string; alt: string }[];
  updates: { date: string; text: string }[];
}

export interface BusStop {
  id: string;
  name: string;
  lat: number;
  lng: number;
  routes: string[];
  reference: string;
}

export interface BusRoute {
  id: string;
  name: string;
  color: string;
  path: LatLng[];
}

export interface RoadClosure {
  id: string;
  name: string;
  reason: string;
  until: string;
  lat: number;
  lng: number;
  path: LatLng[];
}

export interface SeedReport {
  id: string;
  category: ReportCategory;
  title: string;
  detail: string;
  lat: number;
  lng: number;
  place: string;
  status: "recibido" | "en-revision" | "atendido";
  createdAt: string;
}

export type ReportCategory =
  | "hueco"
  | "semaforo"
  | "paradero"
  | "basura"
  | "otro";

export const TRUJILLO_CENTER: LatLng = [-8.1116, -79.0288];

export const WORKS: PublicWork[] = [
  {
    id: "av-america",
    title: "Mejoramiento de Av. América",
    status: "en-ejecucion",
    progress: 40,
    location: "Av. América, Trujillo (desde Av. Larco hasta Av. Los Incas)",
    district: "Trujillo",
    startDate: "2026-04-01",
    endDate: "2026-10-30",
    duration: "6 meses",
    description:
      "Recapeo asfáltico, reconstrucción de veredas, semaforización y reordenamiento de paraderos en el tramo sur de la avenida América, entre Av. Víctor Larco Herrera y Av. Los Incas.",
    contractor: "Consorcio Vial Libertad",
    investment: "S/ 18.4 millones",
    lat: -8.121,
    lng: -79.032,
    path: [
      [-8.1238, -79.0416],
      [-8.123, -79.0384],
      [-8.1222, -79.0352],
      [-8.1214, -79.032],
      [-8.1205, -79.0288],
      [-8.1197, -79.0266],
      [-8.1192, -79.02596],
    ],
    alternative: {
      label: "Av. Mansiche – Av. El Golf",
      path: [
        [-8.1236, -79.0428],
        [-8.1178, -79.0423],
        [-8.1146, -79.0386],
        [-8.1064, -79.0464],
        [-8.1037, -79.0479],
        [-8.101, -79.05],
        [-8.1061, -79.0302],
        [-8.1057, -79.024],
        [-8.1112, -79.0222],
        [-8.1192, -79.026],
      ],
    },
    photos: [
      {
        src: "/images/obras/av-america-hero.jpg",
        alt: "Excavadora y trabajadores en Av. América",
      },
      {
        src: "/images/obras/av-america-excavadora.jpg",
        alt: "Excavadora rompiendo asfalto",
      },
      {
        src: "/images/obras/av-america-trabajadores.jpg",
        alt: "Cuadrilla de obra junto a la zanja",
      },
      {
        src: "/images/obras/av-america-asfalto.jpg",
        alt: "Tramo recién asfaltado",
      },
    ],
    updates: [
      {
        date: "2026-09-10",
        text: "Se habilitó un carril de circulación en el tramo Larco – Los Incas. Desvío permanente por Av. El Golf.",
      },
      {
        date: "2026-08-02",
        text: "Culminó la reposición de redes de agua en 4 cuadras. Avance de veredas al 38%.",
      },
    ],
  },
  {
    id: "av-espana",
    title: "Recuperación de veredas en Av. España",
    status: "en-ejecucion",
    progress: 72,
    location: "Av. España, anillo del Centro Histórico",
    district: "Trujillo",
    startDate: "2026-02-10",
    endDate: "2026-09-30",
    duration: "8 meses",
    description:
      "Cambio de sardineles, rampas accesibles y piso táctil en el anillo de Av. España, alrededor de la Plaza de Armas y el Centro Histórico.",
    contractor: "Municipalidad Provincial de Trujillo",
    investment: "S/ 6.1 millones",
    lat: -8.1124,
    lng: -79.0248,
    path: [
      [-8.1086, -79.0326],
      [-8.1084, -79.0246],
      [-8.1154, -79.024],
      [-8.1158, -79.0328],
      [-8.1086, -79.0326],
    ],
    alternative: {
      label: "Jr. Pizarro – Jr. Bolívar (interior del centro)",
      path: [
        [-8.1098, -79.0312],
        [-8.1096, -79.026],
        [-8.1138, -79.0256],
        [-8.114, -79.031],
        [-8.1098, -79.0312],
      ],
    },
    photos: [
      {
        src: "/images/obras/av-espana-veredas.jpg",
        alt: "Reconstrucción de veredas en el Centro Histórico",
      },
    ],
    updates: [
      {
        date: "2026-09-01",
        text: "Tramo norte entregado. Se trabaja el lado este, frente a Av. Los Incas.",
      },
    ],
  },
  {
    id: "parque-santa-rosa",
    title: "Renovación del Parque Santa Rosa",
    status: "en-ejecucion",
    progress: 25,
    location: "Parque Santa Rosa, urb. Santa Rosa",
    district: "Trujillo",
    startDate: "2026-07-15",
    endDate: "2026-12-15",
    duration: "5 meses",
    description:
      "Nuevo juego infantil, veredas, iluminación LED y riego tecnificado en el parque vecinal de Santa Rosa.",
    contractor: "Consorcio Parques del Norte",
    investment: "S/ 1.9 millones",
    lat: -8.1056,
    lng: -79.0368,
    path: [],
    alternative: {
      label: "Jr. San Martín – no hay cierre vehicular",
      path: [],
    },
    photos: [
      {
        src: "/images/obras/parque-renovacion.jpg",
        alt: "Instalación de juegos en el parque",
      },
    ],
    updates: [
      {
        date: "2026-09-05",
        text: "Cimentación de juegos instalada. Se inicia el piso de caucho.",
      },
    ],
  },
  {
    id: "paraderos-mansiche",
    title: "Ampliación de paraderos en Av. Mansiche",
    status: "planificada",
    progress: 8,
    location: "Av. Mansiche, frente a Mall Plaza y Terminal",
    district: "Huanchaco / Trujillo",
    startDate: "2026-10-15",
    endDate: "2027-02-28",
    duration: "4 meses",
    description:
      "Refugios formales, bahías de embarque y señalética para las rutas hacia Huanchaco y Chan Chan.",
    contractor: "Gerencia de Transporte Urbano",
    investment: "S/ 3.4 millones",
    lat: -8.1037,
    lng: -79.0479,
    path: [
      [-8.1064, -79.0464],
      [-8.1037, -79.0479],
      [-8.101, -79.05],
    ],
    alternative: {
      label: "Av. América Oeste",
      path: [
        [-8.1178, -79.0423],
        [-8.1064, -79.0464],
      ],
    },
    photos: [
      {
        src: "/images/ciudad/paradero.jpg",
        alt: "Paradero existente en avenida principal",
      },
    ],
    updates: [
      {
        date: "2026-09-12",
        text: "Expediente técnico aprobado. Licitación en curso.",
      },
    ],
  },
  {
    id: "av-golf",
    title: "Mejoramiento vial de Av. El Golf",
    status: "finalizada",
    progress: 100,
    location: "Av. El Golf, distrito de Víctor Larco Herrera",
    district: "Víctor Larco Herrera",
    startDate: "2025-11-01",
    endDate: "2026-06-30",
    duration: "8 meses",
    description:
      "Asfaltado, ciclovía y semáforos inteligentes. Vía habilitada como ruta alternativa al tramo en obra de Av. América.",
    contractor: "Consorcio Larco Vial",
    investment: "S/ 9.7 millones",
    lat: -8.1363,
    lng: -79.0354,
    path: [
      [-8.132, -79.038],
      [-8.1363, -79.0354],
      [-8.136, -79.03],
      [-8.132, -79.027],
    ],
    alternative: {
      label: "Av. Víctor Larco Herrera",
      path: [
        [-8.1135, -79.0335],
        [-8.118, -79.0355],
        [-8.1225, -79.0371],
        [-8.128, -79.04],
      ],
    },
    photos: [
      {
        src: "/images/obras/av-america-asfalto.jpg",
        alt: "Calzada concluida en Av. El Golf",
      },
    ],
    updates: [
      {
        date: "2026-07-02",
        text: "Obra recepcionada y abierta al tránsito en ambos sentidos.",
      },
    ],
  },
];

export const STOPS: BusStop[] = [
  {
    id: "plaza",
    name: "Plaza de Armas",
    lat: -8.1116,
    lng: -79.0288,
    routes: ["T1", "T2", "T3"],
    reference: "Portal de la Municipalidad",
  },
  {
    id: "espana-pizarro",
    name: "España / Pizarro",
    lat: -8.1094,
    lng: -79.0262,
    routes: ["T1", "T3"],
    reference: "Anillo del Centro Histórico",
  },
  {
    id: "hospital",
    name: "Hospital Regional",
    lat: -8.1056,
    lng: -79.0368,
    routes: ["T1", "T2"],
    reference: "Puerta principal",
  },
  {
    id: "unt",
    name: "Universidad Nacional",
    lat: -8.1146,
    lng: -79.0386,
    routes: ["T2", "T3"],
    reference: "Av. Juan Pablo II",
  },
  {
    id: "real-plaza",
    name: "Real Plaza",
    lat: -8.132,
    lng: -79.0305,
    routes: ["T2", "T3"],
    reference: "Ingreso principal",
  },
  {
    id: "mall-plaza",
    name: "Mall Plaza",
    lat: -8.1037,
    lng: -79.0479,
    routes: ["T1"],
    reference: "Av. Mansiche",
  },
  {
    id: "terminal",
    name: "Terminal Terrestre",
    lat: -8.1064,
    lng: -79.0464,
    routes: ["T1", "T2"],
    reference: "Av. América Oeste",
  },
  {
    id: "estadio",
    name: "Estadio Mansiche",
    lat: -8.1061,
    lng: -79.0302,
    routes: ["T1", "T3"],
    reference: "Av. Manuel Vera Enríquez",
  },
  {
    id: "larco-america",
    name: "Larco / América",
    lat: -8.1225,
    lng: -79.0371,
    routes: ["T2", "T3"],
    reference: "Cruce en obra",
  },
  {
    id: "incas",
    name: "Av. Los Incas",
    lat: -8.1192,
    lng: -79.026,
    routes: ["T3"],
    reference: "Urb. Torres Araujo",
  },
  {
    id: "america-norte",
    name: "América Norte",
    lat: -8.0943,
    lng: -79.0231,
    routes: ["T3"],
    reference: "Trujillo norte",
  },
  {
    id: "el-golf",
    name: "Av. El Golf",
    lat: -8.1363,
    lng: -79.0354,
    routes: ["T2"],
    reference: "Víctor Larco Herrera",
  },
  {
    id: "mansiche",
    name: "Av. Mansiche",
    lat: -8.101,
    lng: -79.05,
    routes: ["T1"],
    reference: "Ruta a Huanchaco",
  },
  {
    id: "america-oeste",
    name: "América Oeste",
    lat: -8.1178,
    lng: -79.0423,
    routes: ["T2"],
    reference: "Covicorti",
  },
];

export const ROUTES: BusRoute[] = [
  {
    id: "T1",
    name: "T1 Centro – Mansiche – Huanchaco",
    color: "#2B7DE9",
    path: [
      [-8.1116, -79.0288],
      [-8.1094, -79.0262],
      [-8.1061, -79.0302],
      [-8.1056, -79.0368],
      [-8.1064, -79.0464],
      [-8.1037, -79.0479],
      [-8.101, -79.05],
      [-8.101, -79.0575],
    ],
  },
  {
    id: "T2",
    name: "T2 Centro – Larco – El Golf",
    color: "#0B4F8C",
    path: [
      [-8.1116, -79.0288],
      [-8.1146, -79.0386],
      [-8.1178, -79.0423],
      [-8.1225, -79.0371],
      [-8.128, -79.04],
      [-8.1363, -79.0354],
      [-8.132, -79.0305],
    ],
  },
  {
    id: "T3",
    name: "T3 Anillo América",
    color: "#5BA3F0",
    path: [
      [-8.0943, -79.0231],
      [-8.0965, -79.032],
      [-8.1064, -79.0464],
      [-8.1178, -79.0423],
      [-8.1225, -79.0371],
      [-8.121, -79.032],
      [-8.1192, -79.026],
      [-8.1116, -79.0288],
      [-8.1057, -79.024],
      [-8.0943, -79.0231],
    ],
  },
];

export const CLOSURES: RoadClosure[] = [
  {
    id: "cierre-america",
    name: "Av. América Sur (Larco – Los Incas)",
    reason: "Mejoramiento vial en ejecución. Un carril habilitado, desvío recomendado.",
    until: "2026-10-30",
    lat: -8.1214,
    lng: -79.032,
    path: [
      [-8.1238, -79.0416],
      [-8.1222, -79.0352],
      [-8.1205, -79.0288],
      [-8.1192, -79.02596],
    ],
  },
  {
    id: "cierre-espana-este",
    name: "Av. España (tramo este)",
    reason: "Cambio de sardineles. Circulación alternada.",
    until: "2026-09-30",
    lat: -8.112,
    lng: -79.0243,
    path: [
      [-8.1084, -79.0246],
      [-8.1154, -79.024],
    ],
  },
];

export const ALT_ROUTES: { id: string; label: string; path: LatLng[] }[] = [
  {
    id: "alt-america",
    label: "Alternativa Av. América",
    path: [
      [-8.1236, -79.0428],
      [-8.1288, -79.0395],
      [-8.1363, -79.0354],
      [-8.136, -79.03],
      [-8.132, -79.0305],
      [-8.126, -79.0265],
      [-8.1192, -79.026],
    ],
  },
  {
    id: "alt-mansiche",
    label: "Alternativa Mansiche",
    path: WORKS[0].alternative.path,
  },
];

export const SEED_REPORTS: SeedReport[] = [
  {
    id: "rep-1",
    category: "hueco",
    title: "Hueco profundo en Av. América Norte",
    detail: "Afecta el carril derecho, cerca del paradero América Norte.",
    lat: -8.0952,
    lng: -79.0238,
    place: "Av. América Norte",
    status: "en-revision",
    createdAt: "2026-09-12T09:20:00",
  },
  {
    id: "rep-2",
    category: "semaforo",
    title: "Semáforo intermitente en Larco",
    detail: "El semáforo del cruce Larco / América parpadea en ámbar desde anoche.",
    lat: -8.1225,
    lng: -79.0371,
    place: "Larco / América",
    status: "recibido",
    createdAt: "2026-09-15T21:04:00",
  },
];

export const REPORT_CATEGORIES: {
  id: ReportCategory;
  label: string;
}[] = [
  { id: "hueco", label: "Hueco o calzada" },
  { id: "semaforo", label: "Semáforo o señal" },
  { id: "paradero", label: "Paradero informal" },
  { id: "basura", label: "Residuos" },
  { id: "otro", label: "Otro" },
];

export const STATUS_LABEL: Record<WorkStatus, string> = {
  "en-ejecucion": "En ejecución",
  planificada: "Planificada",
  finalizada: "Finalizada",
};

export function workById(id: string) {
  return WORKS.find((w) => w.id === id);
}

export function stopById(id: string) {
  return STOPS.find((s) => s.id === id);
}
