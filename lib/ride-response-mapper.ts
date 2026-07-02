// lib/ride-response-mapper.ts

import { RideSharingResponse } from "./api-types";
import { VehicleState } from "./rideshare-types";

export function mapRideResponseToVehicle(
  response: RideSharingResponse,
  currentVehicle: VehicleState
): VehicleState {
  // Build coordinates for the map
  const routePoints: [number, number][] = response.route.map((stop) => [
    stop.location.lat,
    stop.location.lng,
  ]);

  // Maximum simultaneous passengers from backend trace
  const maxPassengers =
  response.passenger_trace.length > 0
    ? Math.max(
        ...response.passenger_trace.map(
          (stop) => stop.active_passengers
        )
      )
    : currentVehicle.occupancy;

  return {
    ...currentVehicle,

    occupancy: maxPassengers,

    totalDistance: Number(response.total_distance.toFixed(1)),

    routePoints,

    // Backend doesn't send ETA yet
    estimatedTime: Math.round(response.total_distance * 4 + 3),

    // Backend currently doesn't return passenger names
    activePassengers: currentVehicle.activePassengers,
  };
}