import { RideRequest, VehicleState } from "./rideshare-types";

export function buildRideRequestPayload(
  request: RideRequest,
  vehicle: VehicleState
) {
  return {
    vehicle_capacity: vehicle.capacity,

    current_route: [],

    request: {
      request_id: request.id,

      pickup: {
        id: request.pickup,
        lat: request.pickupLat,
        lng: request.pickupLng,
      },

      drop: {
        id: request.dropoff,
        lat: request.dropoffLat,
        lng: request.dropoffLng,
      },

      passengers: 1,

      base_distance: request.distance,
      flexibility: parseFloat(request.flexibilityWindow.replace(/[^0-9.]/g, "")),
    },

    distance_matrix: [],
  };
}