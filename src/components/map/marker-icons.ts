import L from "leaflet";

const BUS = `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6v6"/><path d="M16 6v6"/><path d="M2 12h20"/><path d="M4 6h16a1 1 0 0 1 1 1v11H3V7a1 1 0 0 1 1-1z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/></svg>`;

const HAT = `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 18h20"/><path d="M4 18v-3a8 8 0 0 1 16 0v3"/><path d="M12 7V4"/><path d="M9 18v-5h6v5"/></svg>`;

const ALERT = `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.4" stroke-linecap="round"><path d="M12 9v4"/><path d="M12 17h.01"/><path d="M10.3 4.7 2.6 18a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 4.7a2 2 0 0 0-3.4 0z"/></svg>`;

const CHECK = `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`;

function pin(kind: string, svg: string, selected: boolean) {
  return L.divIcon({
    className: "leaflet-div-icon",
    html: `<div class="map-pin map-pin-${kind}${selected ? " map-pin-selected" : ""}">${svg}</div>`,
    iconSize: selected ? [42, 42] : [34, 34],
    iconAnchor: selected ? [21, 21] : [17, 17],
  });
}

export function stopIcon(selected = false) {
  return pin("stop", BUS, selected);
}
export function workIcon(selected = false) {
  return pin("work", HAT, selected);
}
export function closedIcon(selected = false) {
  return pin("closed", ALERT, selected);
}
export function reportIcon(selected = false) {
  return pin("report", CHECK, selected);
}
