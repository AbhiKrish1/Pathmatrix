from collections import defaultdict
from math import exp

from app.distance import build_distance_lookup, route_distance
from app.models import Location, OptimizeRouteRequest, OptimizeRouteResponse, SightseeingLocation


def effective_satisfaction(
    location: SightseeingLocation,
    cumulative_distance: float,
    category_count: int,
    category_threshold: int,
    decay_constant: float,
) -> float:
    score = location.score * exp(-decay_constant * cumulative_distance)
    if category_count >= category_threshold:
        score *= 0.9
    return score


def placeholder_optimize_route(payload: OptimizeRouteRequest) -> OptimizeRouteResponse:
    """Simple deterministic placeholder until Member 1 plugs in a real optimizer."""
    lookup = build_distance_lookup(payload.distance_matrix)
    ordered = sorted(payload.locations, key=lambda item: (-item.score, item.detour_distance, item.id))

    selected: list[SightseeingLocation] = []
    route: list[Location] = [payload.source, payload.destination]

    for candidate in ordered:
        trial = [payload.source, *selected, candidate, payload.destination]
        trial_distance = route_distance(trial, lookup)
        if trial_distance <= payload.distance_budget:
            selected.append(candidate)
            route = trial

    category_counts: defaultdict[str, int] = defaultdict(int)
    cumulative = 0.0
    total_score = 0.0
    previous = payload.source
    for item in selected:
        cumulative += route_distance([previous, item], lookup)
        total_score += effective_satisfaction(
            item,
            cumulative,
            category_counts[item.category],
            payload.category_threshold,
            payload.decay_constant,
        )
        category_counts[item.category] += 1
        previous = item

    total_distance = route_distance(route, lookup)
    return OptimizeRouteResponse(
        route=route,
        total_distance=round(total_distance, 3),
        total_effective_satisfaction=round(total_score, 3),
        selected_location_ids=[item.id for item in selected],
        algorithm="placeholder_greedy_by_score",
        message="Backend contract is ready. Replace this placeholder with the final optimization algorithm.",
    )
