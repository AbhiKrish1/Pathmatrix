export interface Location {
  id: number;
  name: string;
  category: string;
  satisfaction: number; // base satisfaction (0 to 1)
  distance: number; // distance from previous stop (in km)
  lat: number;
  lng: number;
  description: string;
}

export interface Route {
  id: string;
  name: string;
  description: string;
  stops: Location[];
  totalDistance: number;
  totalDuration: number; // in minutes
  avgSatisfaction: number; // effective satisfaction after decay
  efficiencyScore: number; // 0 - 100
  categoryBreakdown: Record<string, number>;
  color: string;
}

export interface OptimizationSettings {
  source: string;
  destination: string;
  distanceBudget: number;
  categoryThreshold: number;
}

export interface DecayPoint {
  stopName: string;
  stopIndex: number;
  baseSatisfaction: number;
  decayedSatisfaction: number;
  cumulativeDistance: number;
  fatigue: number;
}
