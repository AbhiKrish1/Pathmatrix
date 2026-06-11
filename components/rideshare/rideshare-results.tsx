"use client";

import dynamic from "next/dynamic";
import { RideRequest, VehicleState } from "@/lib/rideshare-types";
import { Map as MapIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Dynamic loading of Leaflet map to avoid server-side window errors
const RideshareMap = dynamic(
  () => import("./rideshare-map"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-slate-950/20 backdrop-blur-sm text-slate-400 text-sm">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 rounded-full border-2 border-white/10 border-t-cyan-500 animate-spin" />
          <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">Initializing Tracking Engine...</span>
        </div>
      </div>
    ),
  }
);

interface RideshareResultsProps {
  vehicle: VehicleState;
  acceptedRequests: RideRequest[];
  className?: string;
}

const glassPanel =
  "rounded-2xl border border-white/10 bg-white/5 shadow-xl shadow-black/20 backdrop-blur-md";

export default function RideshareResults({ vehicle, acceptedRequests, className }: RideshareResultsProps) {
  return (
    <div
      className={cn(
        glassPanel,
        "relative flex min-h-[380px] flex-col overflow-hidden lg:min-h-[460px]",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 relative z-[1000] bg-slate-950/80 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-sm text-slate-200 font-medium">
          <MapIcon className="size-4 text-cyan-400" />
          Live Route Tracking
        </div>
        <Badge
          variant="outline"
          className="border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-[10px]"
        >
          Vehicle: {vehicle.driverName}
        </Badge>
      </div>

      {/* Map Content */}
      <div className="relative flex-1 z-10">
        <RideshareMap vehicle={vehicle} acceptedRequests={acceptedRequests} />

        {/* Legend overlays */}
        <div className="absolute bottom-4 left-4 right-4 z-[1000] flex flex-wrap gap-2 pointer-events-none">
          <Badge variant="outline" className="border-white/10 bg-slate-950/90 text-slate-200 backdrop-blur-sm pointer-events-auto shadow-md">
            <span className="mr-1.5 size-2 rounded-full bg-cyan-400 animate-ping" />
            Active Driver
          </Badge>
          
          {acceptedRequests.map((req, idx) => {
            const letter = String.fromCharCode(65 + idx);
            return (
              <Badge
                key={`${req.id}-${idx}`}
                variant="outline"
                className="border-white/10 bg-slate-950/90 text-slate-200 backdrop-blur-sm pointer-events-auto shadow-md"
              >
                <span className="text-emerald-400 font-bold mr-1">P-{letter}</span>
                <span className="text-slate-500 mr-1">&rarr;</span>
                <span className="text-rose-400 font-bold mr-1">D-{letter}</span>
                <span>{req.passengerName}</span>
              </Badge>
            );
          })}
        </div>
      </div>
    </div>
  );
}
