"use client";

import { VehicleState } from "@/lib/rideshare-types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Car, CheckCircle2, Navigation, Route, Users } from "lucide-react";

interface VehicleMetricsProps {
  vehicle: VehicleState;
}

const glassCard = "border-white/10 bg-white/5 text-white shadow-lg backdrop-blur-md";

export default function VehicleMetrics({ vehicle }: VehicleMetricsProps) {
  const occupancyPercentage = (vehicle.occupancy / vehicle.capacity) * 100;

  return (
    <div className="space-y-4">
      {/* Driver info card */}
      <Card className={cn(glassCard, "border border-white/5")}>
        <CardContent className="p-4 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-md">
            <Car className="size-5" />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-white">{vehicle.driverName}</h4>
            <p className="text-[10px] text-cyan-400 uppercase tracking-wider font-semibold">Active Dispatch Vehicle</p>
          </div>
        </CardContent>
      </Card>

      {/* Occupancy card */}
      <Card className={cn(glassCard, "border border-white/5")}>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
              <Users className="size-3.5 text-cyan-400" />
              <span>VEHICLE SEAT OCCUPANCY</span>
            </div>
            <span className="text-xs font-bold text-white">
              {vehicle.occupancy} / {vehicle.capacity} Seats
            </span>
          </div>

          {/* Occupancy Bar */}
          <div className="h-2 overflow-hidden rounded-full bg-slate-900 border border-white/5 relative">
            <div
              className={cn(
                "h-full rounded-full bg-gradient-to-r transition-all duration-500",
                vehicle.occupancy >= vehicle.capacity
                  ? "from-rose-500 to-orange-500"
                  : "from-cyan-500 to-blue-500"
              )}
              style={{ width: `${occupancyPercentage}%` }}
            />
          </div>

          {/* Seat details */}
          <div className="grid grid-cols-4 gap-1 pt-1">
            {Array.from({ length: vehicle.capacity }).map((_, idx) => {
              const isOccupied = idx < vehicle.occupancy;
              return (
                <div
                  key={idx}
                  className={cn(
                    "flex flex-col items-center justify-center rounded-lg border py-2 text-[10px] font-semibold transition-colors duration-200",
                    isOccupied
                      ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-300 shadow-[0_0_4px_rgba(34,211,238,0.2)]"
                      : "border-white/5 bg-slate-950/20 text-slate-500"
                  )}
                >
                  <Users className="size-3 mb-0.5" />
                  Seat {idx + 1}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Active Passengers list */}
      <Card className={cn(glassCard, "border border-white/5 flex-1 flex flex-col")}>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
            <CheckCircle2 className="size-3.5 text-emerald-400" />
            <span>ONBOARD PASSENGERS</span>
          </div>

          <div className="space-y-2 max-h-[200px] overflow-auto pr-1">
            {vehicle.activePassengers.length === 0 ? (
              <div className="text-center py-6 text-slate-500 text-xs border border-dashed border-white/5 rounded-xl">
                No active passengers onboard.
              </div>
            ) : (
              vehicle.activePassengers.map((name, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 px-3 py-2 text-xs font-semibold"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex size-4.5 items-center justify-center rounded bg-cyan-500/10 text-cyan-400 text-[10px]">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-white truncate max-w-[120px]">{name}</span>
                  </div>
                  <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/15 text-emerald-400 text-[9px] font-medium uppercase px-1 py-0">
                    Onboard
                  </Badge>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 gap-3">
        <Card className={cn(glassCard, "border border-white/5 p-3 flex flex-col items-center justify-center text-center")}>
          <Route className="size-4.5 text-emerald-400 mb-1" />
          <span className="text-[9px] text-slate-500 uppercase font-semibold">Pooled Dist.</span>
          <span className="text-base font-bold text-white mt-0.5">{vehicle.totalDistance.toFixed(1)} km</span>
        </Card>

        <Card className={cn(glassCard, "border border-white/5 p-3 flex flex-col items-center justify-center text-center")}>
          <Navigation className="size-4.5 text-cyan-400 mb-1 animate-pulse" />
          <span className="text-[9px] text-slate-500 uppercase font-semibold">EST. ETA</span>
          <span className="text-base font-bold text-white mt-0.5">{vehicle.estimatedTime} mins</span>
        </Card>
      </div>
    </div>
  );
}
