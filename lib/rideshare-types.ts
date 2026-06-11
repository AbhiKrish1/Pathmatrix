export interface RideRequest {
  id: string;
  passengerName: string;
  pickup: string;
  pickupLat: number;
  pickupLng: number;
  dropoff: string;
  dropoffLat: number;
  dropoffLng: number;
  flexibilityWindow: string;
  status: "pending" | "accepted" | "rejected" | "completed";
  fare: number;
  distance: number; // km
}

export interface VehicleState {
  id: string;
  driverName: string;
  currentLat: number;
  currentLng: number;
  capacity: number;
  occupancy: number;
  activePassengers: string[];
  totalDistance: number;
  estimatedTime: number; // mins
  routePoints: [number, number][];
}

export interface ChartDataPoint {
  time: string;
  passengers: number;
  utilization: number; // in %
  efficiency: number; // in %
}
