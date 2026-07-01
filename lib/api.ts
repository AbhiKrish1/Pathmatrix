// lib/api.ts

import {
    SightseeingResponse,
    RideSharingResponse,
  } from "./api-types";
  
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  
  /**
   * Sightseeing Optimization
   */
  export async function optimizeSightseeingRoute(
    payload: unknown
  ): Promise<SightseeingResponse> {
    const response = await fetch(`${API_BASE_URL}/optimize-route`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  
    if (!response.ok) {
      throw new Error("Failed to optimize sightseeing route");
    }
  
    return response.json();
  }
  
  /**
   * Ride Sharing Optimization
   */
  export async function submitRideRequest(
    payload: unknown
  ): Promise<RideSharingResponse> {
    const response = await fetch(`${API_BASE_URL}/ride-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  
    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Backend Error:", errorBody);
      throw new Error(errorBody);
    }
    
    return response.json();
  }
  /**
 * Get Current Ride Route
 */
export async function getCurrentRoute() {
  const response = await fetch(`${API_BASE_URL}/current-route`);

  if (!response.ok) {
    throw new Error("Failed to fetch current route");
  }

  return response.json();
}

/**
 * Reset Ride Route
 */
export async function resetRideRoute() {
  const response = await fetch(`${API_BASE_URL}/reset-route`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to reset ride route");
  }

  return response.json();
}