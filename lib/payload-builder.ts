import { Location } from "./types";

export function buildOptimizeRoutePayload(
  source: string,
  destination: string,
  stops: Location[],
  distanceBudget: number,
  categoryThreshold: number,
  algorithm = "greedy"
) {
  return {
    source: {
      id: source,
      lat: stops[0]?.lat ?? 0,
      lng: stops[0]?.lng ?? 0,
    },

    destination: {
      id: destination,
      lat: stops[stops.length - 1]?.lat ?? 0,
      lng: stops[stops.length - 1]?.lng ?? 0,
    },

    locations: stops.map((stop) => ({
      id: stop.name,
      lat: stop.lat,
      lng: stop.lng,
      score: Math.round(stop.satisfaction * 100),
      category: stop.category,
      detour_distance: stop.distance,
    })),

    distance_budget: distanceBudget,

    category_threshold: Math.round(categoryThreshold * 10),

    decay_constant: 0.1,

    distance_matrix: [],

    algorithm,
  };
}