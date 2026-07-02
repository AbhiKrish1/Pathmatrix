// lib/api-types.ts

export interface RouteLocation {
    id: string;
    lat: number;
    lng: number;
  }
  
  export interface SightseeingResponse {
    route: RouteLocation[];
    total_distance: number;
    total_effective_satisfaction: number;
    selected_location_ids: string[];
    algorithm: string;
  
    penalty_count?: number;
    runtime_ms?: number;
    summary?: string;
    explanations?: string[];
  
    message?: string;
  }
  
  export interface RideStop {
    location: {
      id: string;
      lat: number;
      lng: number;
    };
    stop_type: "start" | "pickup" | "drop";
    request_id: string | null;
    passenger_delta: number;
  }
  
  export interface PassengerTrace {
    stop_id: string;
    active_passengers: number;
  }
  
  export interface RideSharingResponse {
    accepted: boolean;
    reason: string;
    route: RideStop[];
    total_distance: number;
    added_distance: number;
    passenger_trace: PassengerTrace[];
  }