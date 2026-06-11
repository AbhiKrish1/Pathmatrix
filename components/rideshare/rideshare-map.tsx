"use client";

import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import { RideRequest, VehicleState } from "@/lib/rideshare-types";

import "leaflet/dist/leaflet.css";

// Glowing vehicle marker icon
const createVehicleMarkerIcon = () => {
  return L.divIcon({
    className: "custom-leaflet-vehicle-marker",
    html: `
      <div class="relative flex size-8 items-center justify-center rounded-full border-2 border-cyan-400 bg-slate-950 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] ring-4 ring-cyan-500/25 transition-transform duration-200">
        <svg class="size-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m1-9h10a1 1 0 011 1v7m-9 2h5" />
        </svg>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });
};

// Glowing pickup marker icon
const createPickupMarkerIcon = (label: string) => {
  return L.divIcon({
    className: "custom-leaflet-pickup-marker",
    html: `
      <div class="flex size-7 items-center justify-center rounded-full border-2 border-emerald-500 bg-slate-900 text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)] font-bold text-[11px] transition-transform duration-200 hover:scale-110">
        ${label}
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14]
  });
};

// Glowing dropoff marker icon
const createDropoffMarkerIcon = (label: string) => {
  return L.divIcon({
    className: "custom-leaflet-dropoff-marker",
    html: `
      <div class="flex size-7 items-center justify-center rounded-full border-2 border-rose-500 bg-slate-900 text-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.6)] font-bold text-[11px] transition-transform duration-200 hover:scale-110">
        ${label}
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14]
  });
};

interface ChangeMapViewProps {
  center: [number, number];
  points: [number, number][];
}

function ChangeMapView({ center, points }: ChangeMapViewProps) {
  const map = useMap();

  useEffect(() => {
    if (!points || points.length <= 1) {
      map.setView(center, 13);
      return;
    }
    map.fitBounds(points, { padding: [60, 60], animate: true, duration: 1.5 });
  }, [center, points, map]);

  return null;
}

interface RideshareMapProps {
  vehicle: VehicleState;
  acceptedRequests: RideRequest[];
}

export default function RideshareMap({ vehicle, acceptedRequests }: RideshareMapProps) {
  const vehiclePos: [number, number] = [vehicle.currentLat, vehicle.currentLng];

  // Compile points to draw polyline
  // Route goes: Vehicle -> Pickup 1 -> Dropoff 1 -> Pickup 2 -> Dropoff 2 ...
  const routePoints = useMemo(() => {
    const coords: [number, number][] = [vehiclePos];
    acceptedRequests.forEach(req => {
      coords.push([req.pickupLat, req.pickupLng]);
      coords.push([req.dropoffLat, req.dropoffLng]);
    });
    return coords;
  }, [vehiclePos, acceptedRequests]);

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={vehiclePos}
        zoom={13}
        className="h-full w-full bg-slate-950"
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        <ChangeMapView center={vehiclePos} points={routePoints} />

        {/* Draw active pooling path */}
        {routePoints.length > 1 && (
          <Polyline
            positions={routePoints}
            pathOptions={{
              color: "#22d3ee", // cyan-400
              weight: 3.5,
              opacity: 0.85,
              dashArray: "1, 10",
              lineCap: "round",
            }}
          />
        )}

        {/* Pulsing Vehicle Marker */}
        <Marker position={vehiclePos} icon={createVehicleMarkerIcon()}>
          <Popup className="custom-popup bg-slate-900 text-white rounded-xl border border-white/10">
            <div className="p-1 space-y-1 text-slate-200">
              <h4 className="font-semibold text-white">Driver: {vehicle.driverName}</h4>
              <p className="text-xs text-slate-400">
                Occupancy: <span className="text-cyan-400 font-semibold">{vehicle.occupancy}/{vehicle.capacity}</span> passengers
              </p>
              <p className="text-xs text-slate-400">
                Total distance: <span className="text-slate-200 font-medium">{vehicle.totalDistance} km</span>
              </p>
            </div>
          </Popup>
        </Marker>

        {/* Pickups and Dropoffs */}
        {acceptedRequests.map((req, idx) => {
          const letter = String.fromCharCode(65 + idx); // A, B, C...
          return (
            <div key={req.id}>
              {/* Pickup Marker */}
              <Marker
                position={[req.pickupLat, req.pickupLng]}
                icon={createPickupMarkerIcon(`P-${letter}`)}
              >
                <Popup className="custom-popup bg-slate-900 text-white rounded-xl border border-white/10">
                  <div className="p-1 space-y-1 text-slate-200">
                    <div className="flex items-center justify-between gap-3">
                      <h4 className="font-semibold text-white">Pickup: {req.passengerName}</h4>
                      <span className="text-xs text-emerald-400 font-semibold">P-{letter}</span>
                    </div>
                    <p className="text-xs text-slate-400">{req.pickup}</p>
                    <div className="flex justify-between border-t border-white/5 pt-1 text-xs text-slate-400">
                      <span>Fare:</span>
                      <span className="text-emerald-400 font-semibold">₹{req.fare}</span>
                    </div>
                  </div>
                </Popup>
              </Marker>

              {/* Dropoff Marker */}
              <Marker
                position={[req.dropoffLat, req.dropoffLng]}
                icon={createDropoffMarkerIcon(`D-${letter}`)}
              >
                <Popup className="custom-popup bg-slate-900 text-white rounded-xl border border-white/10">
                  <div className="p-1 space-y-1 text-slate-200">
                    <div className="flex items-center justify-between gap-3">
                      <h4 className="font-semibold text-white">Dropoff: {req.passengerName}</h4>
                      <span className="text-xs text-rose-400 font-semibold">D-{letter}</span>
                    </div>
                    <p className="text-xs text-slate-400">{req.dropoff}</p>
                    <div className="flex justify-between border-t border-white/5 pt-1 text-xs text-slate-400">
                      <span>Trip Distance:</span>
                      <span className="text-slate-200 font-medium">{req.distance} km</span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            </div>
          );
        })}
      </MapContainer>
    </div>
  );
}
