"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import { Location } from "@/lib/types";

import "leaflet/dist/leaflet.css";

// Category badges mapping for popup
const CATEGORY_COLORS: Record<string, string> = {
  Nature: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  Culture: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  Landmark: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  Food: "bg-amber-500/20 text-amber-300 border-amber-500/30",
};

// Custom Glowing Markers
const categoryMarkerStyles: Record<string, string> = {
  Nature: "border-emerald-500 bg-emerald-950/90 text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)]",
  Culture: "border-violet-500 bg-violet-950/90 text-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.6)]",
  Landmark: "border-cyan-500 bg-cyan-950/90 text-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]",
  Food: "border-amber-500 bg-amber-950/90 text-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.6)]",
};

const createCustomMarker = (label: string, category: string, isStart = false, isEnd = false) => {
  let styleClass = categoryMarkerStyles[category] || "border-slate-500 bg-slate-900 text-slate-300 shadow-lg";
  
  if (isStart) {
    styleClass = "border-emerald-400 bg-slate-950 text-emerald-400 ring-4 ring-emerald-500/20 shadow-[0_0_12px_rgba(52,211,153,0.8)]";
  } else if (isEnd) {
    styleClass = "border-rose-400 bg-slate-950 text-rose-400 ring-4 ring-rose-500/20 shadow-[0_0_12px_rgba(251,113,133,0.8)]";
  }

  return L.divIcon({
    className: "custom-leaflet-marker",
    html: `
      <div class="flex size-7 items-center justify-center rounded-full border-2 ${styleClass} font-semibold text-xs transition-transform duration-200 hover:scale-115">
        ${label}
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
};

interface ChangeMapViewProps {
  stops: Location[];
}

// Subcomponent to dynamically pan/zoom map to fit new route stops
function ChangeMapView({ stops }: ChangeMapViewProps) {
  const map = useMap();

  useEffect(() => {
    if (!stops || stops.length === 0) return;

    if (stops.length === 1) {
      map.setView([stops[0].lat, stops[0].lng], 13);
      return;
    }

    const bounds = stops.map(s => [s.lat, s.lng] as [number, number]);
    map.fitBounds(bounds, { padding: [50, 50], animate: true, duration: 1.5 });
  }, [stops, map]);

  return null;
}

interface MapComponentProps {
  stops: Location[];
}

export default function MapComponent({ stops }: MapComponentProps) {
  // Center of Bangalore
  const defaultCenter: [number, number] = [12.9716, 77.5946];
  const defaultZoom = 12;

  // Path coordinates
  const polylineCoords = stops.map(stop => [stop.lat, stop.lng] as [number, number]);

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        className="h-full w-full bg-slate-950"
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        <ChangeMapView stops={stops} />

        {/* Draw path */}
        {polylineCoords.length > 1 && (
          <Polyline
            positions={polylineCoords}
            pathOptions={{
              color: "#10b981", // emerald-500
              weight: 3,
              dashArray: "8, 6",
              opacity: 0.8,
            }}
          />
        )}

        {/* Render markers */}
        {stops.map((stop, index) => {
          const isStart = index === 0;
          const isEnd = index === stops.length - 1;
          const label = isStart ? "S" : isEnd ? "E" : String(index + 1);

          return (
            <Marker
              key={`${stop.id}-${index}`}
              position={[stop.lat, stop.lng]}
              icon={createCustomMarker(label, stop.category, isStart, isEnd)}
            >
              <Popup className="custom-popup bg-slate-900 text-white rounded-xl border border-white/10">
                <div className="space-y-1.5 p-1 text-slate-200">
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="font-semibold text-white">{stop.name}</h4>
                    <span className="text-xs text-emerald-400 font-medium">#{index + 1}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-semibold ${CATEGORY_COLORS[stop.category]}`}>
                      {stop.category}
                    </span>
                    <span className="text-xs text-slate-400">
                      Distance: <span className="text-slate-200 font-medium">{stop.distance} km</span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 max-w-xs">{stop.description}</p>
                  <div className="flex justify-between border-t border-white/5 pt-1.5 text-xs text-slate-400">
                    <span>Base Satisfaction:</span>
                    <span className="text-emerald-400 font-semibold">{(stop.satisfaction * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Styled Zoom Controls in bottom-right */}
      <div className="absolute bottom-5 right-5 z-[1000] flex flex-col gap-1">
        {/* Simple leaflet zoom hook or style overlay can be done, but standard leaflet zoom works too */}
      </div>
    </div>
  );
}
