import { Location, OptimizationSettings } from "./types";

export function buildSightseeingPayload(
  source: string,
  destination: string,
  locations: Location[],
  settings: OptimizationSettings
) {
  return {
    source: {
      id: source,
      lat: locations[0]?.lat ?? 0,
      lng: locations[0]?.lng ?? 0,
    },

    destination: {
      id: destination,
      lat: locations[locations.length - 1]?.lat ?? 0,
      lng: locations[locations.length - 1]?.lng ?? 0,
    },

    locations: locations.map((loc) => ({
      id: loc.name,
      lat: loc.lat,
      lng: loc.lng,
      score: Math.round(loc.satisfaction * 100),
      category: loc.category,
      detour_distance: loc.distance,
    })),

    distance_budget: settings.distanceBudget,

    category_threshold: settings.categoryThreshold,

    decay_constant: 0.1,

    distance_matrix: [],
  };
}