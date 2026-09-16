import { useEffect, useMemo } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
  Tooltip,
  useMap,
  useMapEvents,
  ZoomControl,
} from "react-leaflet";
import { toast } from "sonner";
import {
  ALT_ROUTES,
  CLOSURES,
  ROUTES,
  STOPS,
  TRUJILLO_CENTER,
  WORKS,
} from "@/lib/data/city";
import { useAppStore } from "@/lib/store";
import {
  closedIcon,
  reportIcon,
  stopIcon,
  workIcon,
} from "./marker-icons";

export interface CityMapInnerProps {
  focusWorkId?: string;
  interactivePick?: boolean;
  className?: string;
}

function FlyController() {
  const flyTo = useAppStore((s) => s.flyTo);
  const map = useMap();

  useEffect(() => {
    if (!flyTo) return;
    map.flyTo([flyTo.lat, flyTo.lng], flyTo.zoom ?? 16, { duration: 0.85 });
  }, [flyTo, map]);

  return null;
}

function ClickToPick() {
  const pick = useAppStore((s) => s.pickLocation);
  const setPick = useAppStore((s) => s.setPickLocation);
  const add = useAppStore((s) => s.addReport);

  useMapEvents({
    click(e) {
      if (!pick) return;
      add({
        category: "otro",
        title: "Reporte en el mapa",
        detail: "Ubicación marcada desde el mapa interactivo.",
        lat: e.latlng.lat,
        lng: e.latlng.lng,
        place: `${e.latlng.lat.toFixed(5)}, ${e.latlng.lng.toFixed(5)}`,
      });
      setPick(false);
      toast.success("Ubicación marcada. El reporte ya está en el mapa.");
    },
  });

  return null;
}

function ResizeFix() {
  const map = useMap();
  useEffect(() => {
    const container = map.getContainer();
    const invalidate = () => map.invalidateSize();
    const t = window.setTimeout(invalidate, 80);
    const ro = new ResizeObserver(invalidate);
    ro.observe(container);
    window.addEventListener("resize", invalidate);
    return () => {
      window.clearTimeout(t);
      ro.disconnect();
      window.removeEventListener("resize", invalidate);
    };
  }, [map]);
  return null;
}

export function CityMapInner({
  focusWorkId,
  interactivePick,
  className,
}: CityMapInnerProps) {
  const layers = useAppStore((s) => s.layers);
  const select = useAppStore((s) => s.select);
  const selectedId = useAppStore((s) => s.selectedId);
  const selectedKind = useAppStore((s) => s.selectedKind);
  const reports = useAppStore((s) => s.reports);
  const requestFlyTo = useAppStore((s) => s.requestFlyTo);

  const focused = useMemo(
    () => (focusWorkId ? WORKS.find((w) => w.id === focusWorkId) : undefined),
    [focusWorkId],
  );

  useEffect(() => {
    if (focused) {
      select("work", focused.id);
      requestFlyTo(focused.lat, focused.lng, 15);
    }
  }, [focused, requestFlyTo, select]);

  return (
    <MapContainer
      center={focused ? [focused.lat, focused.lng] : TRUJILLO_CENTER}
      zoom={focused ? 15 : 13}
      className={className ?? "h-full w-full"}
      zoomControl={false}
      attributionControl
    >
      <TileLayer
        attribution="&copy; OpenStreetMap · CARTO"
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      <ZoomControl position="bottomright" />
      <FlyController />
      <ResizeFix />
      {interactivePick ? <ClickToPick /> : null}

      {layers.routes
        ? ROUTES.map((r) => (
            <Polyline
              key={r.id}
              positions={r.path}
              pathOptions={{
                color: r.color,
                weight: 4,
                opacity: 0.85,
              }}
            />
          ))
        : null}

      {layers.alts
        ? ALT_ROUTES.map((r) => (
            <Polyline
              key={r.id}
              positions={r.path}
              pathOptions={{
                color: "#2E9E5B",
                weight: 4,
                dashArray: "10 8",
                opacity: 0.95,
              }}
            />
          ))
        : null}

      {layers.works
        ? WORKS.filter((w) => w.path.length > 1).map((w) => (
            <Polyline
              key={`path-${w.id}`}
              positions={w.path}
              pathOptions={{
                color: "#E8941A",
                weight: 6,
                opacity: w.status === "finalizada" ? 0.35 : 0.8,
              }}
              eventHandlers={{
                click: () => {
                  select("work", w.id);
                  requestFlyTo(w.lat, w.lng, 16);
                },
              }}
            />
          ))
        : null}

      {layers.closures
        ? CLOSURES.map((c) => (
            <Polyline
              key={`cpath-${c.id}`}
              positions={c.path}
              pathOptions={{
                color: "#E24B4A",
                weight: 5,
                opacity: 0.9,
              }}
            />
          ))
        : null}

      {layers.stops
        ? STOPS.map((s) => {
            const selected = selectedKind === "stop" && selectedId === s.id;
            return (
              <Marker
                key={s.id}
                position={[s.lat, s.lng]}
                icon={stopIcon(selected)}
                eventHandlers={{
                  click: () => {
                    select("stop", s.id);
                    requestFlyTo(s.lat, s.lng, 16);
                  },
                }}
                zIndexOffset={selected ? 600 : 200}
              >
                {s.id === "plaza" ? (
                  <Tooltip
                    permanent
                    direction="right"
                    offset={[16, 0]}
                    className="map-label"
                  >
                    Paraderos oficiales
                  </Tooltip>
                ) : null}
              </Marker>
            );
          })
        : null}

      {layers.works
        ? WORKS.map((w) => {
            const selected = selectedKind === "work" && selectedId === w.id;
            return (
              <Marker
                key={w.id}
                position={[w.lat, w.lng]}
                icon={workIcon(selected)}
                eventHandlers={{
                  click: () => {
                    select("work", w.id);
                    requestFlyTo(w.lat, w.lng, 16);
                  },
                }}
                zIndexOffset={selected ? 700 : 300}
              >
                {w.id === "av-america" ? (
                  <Tooltip
                    permanent
                    direction="right"
                    offset={[18, 0]}
                    className="map-label map-label-work"
                  >
                    Av. América (Obra en ejecución)
                  </Tooltip>
                ) : null}
              </Marker>
            );
          })
        : null}

      {layers.closures
        ? CLOSURES.map((c) => {
            const selected = selectedKind === "closure" && selectedId === c.id;
            return (
              <Marker
                key={c.id}
                position={[c.lat, c.lng]}
                icon={closedIcon(selected)}
                eventHandlers={{
                  click: () => select("closure", c.id),
                }}
                zIndexOffset={400}
              />
            );
          })
        : null}

      {layers.reports
        ? reports.map((r) => {
            const selected = selectedKind === "report" && selectedId === r.id;
            return (
              <Marker
                key={r.id}
                position={[r.lat, r.lng]}
                icon={reportIcon(selected)}
                eventHandlers={{
                  click: () => select("report", r.id),
                }}
                zIndexOffset={350}
              />
            );
          })
        : null}
    </MapContainer>
  );
}
