import { RideRequest, VehicleState, ChartDataPoint } from "./rideshare-types";

export const INITIAL_REQUESTS: RideRequest[] = [
  {
    id: "req-1",
    passengerName: "Rahul Sharma",
    pickup: "Koramangala 5th Block",
    pickupLat: 12.9348,
    pickupLng: 77.6189,
    dropoff: "HSR Layout Sector 1",
    dropoffLat: 12.9124,
    dropoffLng: 77.6382,
    flexibilityWindow: "+/- 5 mins",
    status: "pending",
    fare: 120,
    distance: 3.8
  },
  {
    id: "req-2",
    passengerName: "Ananya Iyer",
    pickup: "Jayanagar 4th Block",
    pickupLat: 12.9298,
    pickupLng: 77.5812,
    dropoff: "Lalbagh West Gate",
    dropoffLat: 12.9507,
    dropoffLng: 77.5848,
    flexibilityWindow: "+/- 8 mins",
    status: "pending",
    fare: 95,
    distance: 2.6
  },
  {
    id: "req-3",
    passengerName: "Vikram Malhotra",
    pickup: "MG Road Metro Station",
    pickupLat: 12.9756,
    pickupLng: 77.6068,
    dropoff: "Commercial Street Gate",
    dropoffLat: 12.9822,
    dropoffLng: 77.6083,
    flexibilityWindow: "+/- 3 mins",
    status: "pending",
    fare: 75,
    distance: 1.1
  },
  {
    id: "req-4",
    passengerName: "Priya Rao",
    pickup: "Indiranagar 100ft Road",
    pickupLat: 12.9719,
    pickupLng: 77.6412,
    dropoff: "Ulsoor Lake Gate",
    dropoffLat: 12.9815,
    dropoffLng: 77.6229,
    flexibilityWindow: "+/- 6 mins",
    status: "pending",
    fare: 110,
    distance: 2.9
  },
  {
    id: "req-5",
    passengerName: "Amit Patel",
    pickup: "HAL 2nd Stage",
    pickupLat: 12.9642,
    pickupLng: 77.6385,
    dropoff: "Koramangala 3rd Block",
    dropoffLat: 12.9312,
    dropoffLng: 77.6225,
    flexibilityWindow: "+/- 10 mins",
    status: "pending",
    fare: 150,
    distance: 4.8
  },
  {
    id: "req-6",
    passengerName: "Neha Sen",
    pickup: "Commercial Street Corner",
    pickupLat: 12.9818,
    pickupLng: 77.6092,
    dropoff: "Cubbon Park Gate",
    dropoffLat: 12.9738,
    dropoffLng: 77.5913,
    flexibilityWindow: "+/- 4 mins",
    status: "pending",
    fare: 90,
    distance: 2.1
  }
];

export const INITIAL_VEHICLE: VehicleState = {
  id: "veh-1",
  driverName: "Karthik Gowda",
  currentLat: 12.9716, // Central Bengaluru (MG Road area)
  currentLng: 77.5946,
  capacity: 4,
  occupancy: 0,
  activePassengers: [],
  totalDistance: 0.0,
  estimatedTime: 0,
  routePoints: [[12.9716, 77.5946]]
};

export const MOCK_CHART_METRICS: ChartDataPoint[] = [
  { time: "08:00", passengers: 1, utilization: 25, efficiency: 96 },
  { time: "09:00", passengers: 3, utilization: 75, efficiency: 89 },
  { time: "10:00", passengers: 4, utilization: 100, efficiency: 84 },
  { time: "11:00", passengers: 2, utilization: 50, efficiency: 92 },
  { time: "12:00", passengers: 1, utilization: 25, efficiency: 95 },
  { time: "13:00", passengers: 2, utilization: 50, efficiency: 91 },
  { time: "14:00", passengers: 3, utilization: 75, efficiency: 87 },
  { time: "15:00", passengers: 4, utilization: 100, efficiency: 83 },
  { time: "16:00", passengers: 3, utilization: 75, efficiency: 86 },
  { time: "17:00", passengers: 4, utilization: 100, efficiency: 81 },
  { time: "18:00", passengers: 4, utilization: 100, efficiency: 77 },
  { time: "19:00", passengers: 3, utilization: 75, efficiency: 84 },
  { time: "20:00", passengers: 2, utilization: 50, efficiency: 90 }
];
