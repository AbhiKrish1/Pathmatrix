"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Car, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
// Rideshare custom imports
import { RideRequest, VehicleState } from "@/lib/rideshare-types";
import { INITIAL_REQUESTS, INITIAL_VEHICLE, MOCK_CHART_METRICS } from "@/lib/rideshare-mock-data";
import RequestQueue from "@/components/rideshare/request-queue";
import RideshareResults from "@/components/rideshare/rideshare-results";
import VehicleMetrics from "@/components/rideshare/vehicle-metrics";
import UtilizationCharts from "@/components/rideshare/utilization-charts";

const glassPanel =
  "rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/20 backdrop-blur-md";

export default function RideshareDashboardPage() {
  const [requests, setRequests] = useState<RideRequest[]>(INITIAL_REQUESTS);
  const [vehicle, setVehicle] = useState<VehicleState>(INITIAL_VEHICLE);

  const capacityReached = vehicle.occupancy >= vehicle.capacity;

  const handleAcceptRequest = (id: string) => {
    if (capacityReached) return;

    const targetRequest = requests.find(r => r.id === id);
    if (!targetRequest) return;

    // Update Request Status in Queue
    setRequests(prev =>
      prev.map(r => (r.id === id ? { ...r, status: "accepted" as const } : r))
    );

    // Update Vehicle State
    setVehicle(prev => {
      const updatedPassengers = [...prev.activePassengers, targetRequest.passengerName];
      const newOccupancy = prev.occupancy + 1;
      
      // Calculate pooled detour factor: adding a pickup/dropoff adds the request distance + a small pool overhead (15% detour)
      const additionalDistance = targetRequest.distance * 1.15;
      const newTotalDistance = prev.totalDistance + additionalDistance;

      // Estimate traffic travel time: 4 mins per km in Bangalore traffic + 3 mins dispatch/stop delay
      const additionalTime = Math.round(additionalDistance * 4 + 3);
      const newEstimatedTime = prev.estimatedTime + additionalTime;

      return {
        ...prev,
        occupancy: newOccupancy,
        activePassengers: updatedPassengers,
        totalDistance: parseFloat(newTotalDistance.toFixed(1)),
        estimatedTime: newEstimatedTime
      };
    });
  };

  const handleRejectRequest = (id: string) => {
    setRequests(prev =>
      prev.map(r => (r.id === id ? { ...r, status: "rejected" as const } : r))
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950/80 to-slate-950" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_20%_0%,rgba(6,182,212,0.12),transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_90%_100%,rgba(99,102,241,0.15),transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative mx-auto flex min-h-screen max-w-[1600px] flex-col gap-6 p-4 md:p-6 lg:p-8">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
              asChild
            >
              <Link href="/">
                <ArrowLeft className="size-4" />
                Back
              </Link>
            </Button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold tracking-tight md:text-2xl flex items-center gap-2">
                  <Car className="size-6 text-cyan-400" />
                  Dynamic Ride Sharing Optimization
                </h1>
                <Badge
                  variant="outline"
                  className="border-cyan-500/30 bg-cyan-500/10 text-cyan-300"
                >
                  Fleet Dispatch
                </Badge>
              </div>
              <p className="mt-0.5 text-sm text-slate-400">
                Match incoming pooling requests in real-time and track vehicle dispatch efficiency.
              </p>
            </div>
          </div>
          
          {/* Capacity warning state badge */}
          {capacityReached && (
            <Badge className="border-rose-500/30 bg-rose-500/10 text-rose-400 animate-pulse text-xs py-1 px-3">
              Vehicle Capacity Limit Reached
            </Badge>
          )}
        </header>

        {/* Main top grid: 3 Columns */}
        <div className="grid flex-1 gap-6 lg:grid-cols-[380px_1fr_320px]">
          {/* Left Column: Requests Queue */}
          <aside className={cn(glassPanel, "flex flex-col gap-4 max-h-[600px] overflow-auto scrollbar-thin")}>
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <h3 className="text-sm font-semibold text-slate-300">Incoming Requests</h3>
              <span className="text-[10px] text-slate-500 font-medium">
                {requests.filter(r => r.status === "pending").length} pending
              </span>
            </div>
            <RequestQueue
              requests={requests}
              onAccept={handleAcceptRequest}
              onReject={handleRejectRequest}
              capacityReached={capacityReached}
            />
          </aside>

          {/* Center Column: Interactive Route Map */}
          <section className="flex flex-col">
            <RideshareResults
              vehicle={vehicle}
              acceptedRequests={requests.filter(r => r.status === "accepted")}
            />
          </section>

          {/* Right Column: Active Vehicle Metrics */}
          <aside className={cn(glassPanel, "flex flex-col gap-4")}>
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <h3 className="text-sm font-semibold text-slate-300">Vehicle Status</h3>
              <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-[9px] font-medium">
                Online
              </Badge>
            </div>
            <VehicleMetrics vehicle={vehicle} />
          </aside>
        </div>

        {/* Bottom Section: Historical Metrics Charts */}
        <section className="mt-2 space-y-3">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-1.5">
              <Sparkles className="size-4 text-cyan-400" />
              Fleet Dispatch Analytics & Historical Metrics
            </h3>
            <span className="text-[10px] text-slate-500">Updated hourly</span>
          </div>
          <UtilizationCharts data={MOCK_CHART_METRICS} />
        </section>
      </div>
    </div>
  );
}
