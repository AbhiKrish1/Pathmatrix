import { Location } from "./types";

export function mapBackendRouteToLocations(
  backendRoute: { id: string }[],
  currentStops: Location[]
): Location[] {
  const stopLookup = new Map(
    currentStops.map((stop) => [stop.name, stop])
  );

  return backendRoute
    .map((point) => stopLookup.get(point.id))
    .filter((stop): stop is Location => stop !== undefined);
}