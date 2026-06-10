"use client";

import dynamic from "next/dynamic";
import { Location } from "@/lib/types";
import { Map as MapIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Dynamic import of the Leaflet map component with ssr: false to prevent hydration issues
const MapComponent = dynamic(
  () => import("./map-component"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-slate-950/20 backdrop-blur-sm text-slate-400 text-sm">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 rounded-full border-2 border-white/10 border-t-emerald-500 animate-spin" />
          <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">Initializing Map Engine...</span>
        </div>
      </div>
    ),
  }
);

interface OptimizationResultsProps {
  stops: Location[];
  className?: string;
}

const glassPanel =
  "rounded-2xl border border-white/10 bg-white/5 shadow-xl shadow-black/20 backdrop-blur-md";

export default function OptimizationResults({ stops, className }: OptimizationResultsProps) {
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
          <MapIcon className="size-4 text-emerald-400" />
          Interactive Route Map
        </div>
        <Badge
          variant="outline"
          className="border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-[10px]"
        >
          Live Preview
        </Badge>
      </div>

      {/* Map Content */}
      <div className="relative flex-1 z-10">
        <MapComponent stops={stops} />

        {/* Legend overlay */}
        <div className="absolute bottom-4 left-4 right-4 z-[1000] flex flex-wrap gap-2 pointer-events-none">
          {stops.map((stop, i) => {
            const isStart = i === 0;
            const isEnd = i === stops.length - 1;
            const markerColorClass = isStart 
              ? "text-emerald-400 font-bold" 
              : isEnd 
                ? "text-rose-400 font-bold" 
                : "text-slate-400 font-semibold";
            return (
              <Badge
                key={`${stop.id}-${i}`}
                variant="outline"
                className="border-white/10 bg-slate-950/80 text-slate-200 backdrop-blur-sm pointer-events-auto shadow-md"
              >
                <span className={cn("mr-1", markerColorClass)}>
                  {isStart ? "Start." : isEnd ? "End." : `${i + 1}.`}
                </span>
                {stop.name}
              </Badge>
            );
          })}
        </div>
      </div>
    </div>
  );
}
