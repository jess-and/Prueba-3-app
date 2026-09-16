import { useEffect, useState, type ComponentType } from "react";
import type { CityMapInnerProps } from "./city-map-inner";

export function CityMap(props: CityMapInnerProps) {
  const [Inner, setInner] = useState<ComponentType<CityMapInnerProps> | null>(
    null,
  );

  useEffect(() => {
    void import("./city-map-inner").then((m) => setInner(() => m.CityMapInner));
  }, []);

  if (!Inner) {
    return (
      <div className="flex h-full min-h-80 w-full items-center justify-center bg-map text-sm font-medium text-muted">
        Cargando mapa de Trujillo…
      </div>
    );
  }

  return <Inner {...props} />;
}
