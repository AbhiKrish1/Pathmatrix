from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.distance import build_distance_lookup, route_distance
from app.models import (
    CurrentRouteResponse,
    OptimizeRouteRequest,
    OptimizeRouteResponse,
    ResetRouteRequest,
    RideRequestEnvelope,
    RideRequestResponse,
)
from app.optimizer import optimize_sightseeing_route
from app.rideshare import calculate_passenger_trace, insert_request, stop_locations
from app.state import route_state


app = FastAPI(
    title="PathMatrix Backend",
    version="0.1.0",
    description="Backend API contracts and ride-sharing insertion heuristic for PathMatrix.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/optimize-route", response_model=OptimizeRouteResponse)
def optimize_route(payload: OptimizeRouteRequest) -> OptimizeRouteResponse:
    return optimize_sightseeing_route(payload)


@app.post("/ride-request", response_model=RideRequestResponse)
def ride_request(payload: RideRequestEnvelope) -> RideRequestResponse:
    current_route = payload.current_route or route_state.route
    capacity = payload.vehicle_capacity or route_state.vehicle_capacity
    result = insert_request(
        current_route,
        payload.request,
        capacity,
        route_state.active_requests,
        payload.distance_matrix,
    )

    if result.accepted:
        route_state.route = result.route
        route_state.vehicle_capacity = capacity

        if payload.request.request_id:
            route_state.active_requests[payload.request.request_id] = payload.request

    return RideRequestResponse(
        accepted=result.accepted,
        reason=result.reason,
        route=result.route,
        total_distance=result.total_distance,
        added_distance=result.added_distance,
        passenger_trace=result.passenger_trace,
    )


@app.get("/current-route", response_model=CurrentRouteResponse)
def current_route() -> CurrentRouteResponse:
    lookup = build_distance_lookup(None)
    return CurrentRouteResponse(
        vehicle_capacity=route_state.vehicle_capacity,
        route=route_state.route,
        total_distance=round(route_distance(stop_locations(route_state.route), lookup), 3),
        passenger_trace=calculate_passenger_trace(route_state.route),
    )


@app.post("/reset-route", response_model=CurrentRouteResponse)
def reset_route(payload: ResetRouteRequest | None = None) -> CurrentRouteResponse:
    if payload is None:
        payload = ResetRouteRequest()
    route_state.reset(payload.vehicle_capacity, payload.start, payload.destination)
    return current_route()
