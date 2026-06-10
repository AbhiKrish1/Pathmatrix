"use client";

import { Route } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Check, Flame, Footprints, Gauge, Sparkles, Timer, AlertTriangle } from "lucide-react";

interface RouteComparisonProps {
  routes: Route[];
  activeRouteId: string;
  onSelectRoute: (id: string) => void;
  distanceBudget: number;
}

const glassCard = "border-white/10 bg-white/5 text-white shadow-lg shadow-black/10 backdrop-blur-md transition-all duration-300";

const activeStyles: Record<string, string> = {
  emerald: "border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/30",
  indigo: "border-indigo-500/50 bg-indigo-500/10 shadow-[0_0_15px_rgba(99,102,241,0.15)] ring-1 ring-indigo-500/30",
  cyan: "border-cyan-500/50 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/30",
};

const badgeStyles: Record<string, string> = {
  emerald: "border-emerald-500/30 bg-emerald-500/15 text-emerald-300",
  indigo: "border-indigo-500/30 bg-indigo-500/15 text-indigo-300",
  cyan: "border-cyan-500/30 bg-cyan-500/15 text-cyan-300",
};

export default function RouteComparison({
  routes,
  activeRouteId,
  onSelectRoute,
  distanceBudget,
}: RouteComparisonProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
      {routes.map((route) => {
        const isActive = route.id === activeRouteId;
        const colorKey = route.color;
        const isOverBudget = route.totalDistance > distanceBudget;

        // Custom badges based on route features
        let routeBadge = "Alternative";
        if (route.id === "optimal") routeBadge = "Balanced (Optimal)";
        else if (route.id === "culture") routeBadge = "Heritage Seekers";
        else if (route.id === "express") routeBadge = "Quick Explorer";

        return (
          <Card
            key={route.id}
            className={cn(
              glassCard,
              "cursor-pointer hover:border-white/20 hover:bg-white/[0.08]",
              isActive && (activeStyles[colorKey] || "border-indigo-500 bg-indigo-500/5"),
              isOverBudget && "border-rose-500/30 hover:border-rose-500/40"
            )}
            onClick={() => onSelectRoute(route.id)}
          >
            <CardHeader className="p-4 pb-2">
              <div className="flex items-start justify-between gap-2">
                <Badge
                  variant="outline"
                  className={cn(
                    "border text-[10px] uppercase tracking-wider font-semibold",
                    isActive ? badgeStyles[colorKey] : "border-white/10 bg-white/5 text-slate-400"
                  )}
                >
                  {routeBadge}
                </Badge>
                <div className="flex items-center gap-1.5">
                  {isOverBudget && (
                    <Badge variant="outline" className="border-rose-500/30 bg-rose-500/10 text-rose-400 text-[10px] flex gap-1 items-center font-medium">
                      <AlertTriangle className="size-2.5" />
                      Budget Exceeded
                    </Badge>
                  )}
                  {isActive && (
                    <div className="flex size-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 ring-2 ring-emerald-500/10">
                      <Check className="size-3" strokeWidth={3} />
                    </div>
                  )}
                </div>
              </div>
              <CardTitle className="mt-2 text-base font-semibold text-white tracking-tight">
                {route.name}
              </CardTitle>
              <CardDescription className="text-slate-400 text-xs line-clamp-2 mt-1 leading-relaxed">
                {route.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3 p-4 pt-2 border-t border-white/5 mt-3">
              {/* Distance */}
              <div className="flex items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-lg bg-white/5 text-slate-400 border border-white/10">
                  <Footprints className="size-3.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-slate-500 uppercase font-medium">Distance</p>
                  <p className={cn("text-xs font-semibold", isOverBudget ? "text-rose-400" : "text-white")}>
                    {route.totalDistance} km
                  </p>
                </div>
              </div>

              {/* Satisfaction */}
              <div className="flex items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-lg bg-white/5 text-slate-400 border border-white/10">
                  <Sparkles className="size-3.5 text-yellow-500/70" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-slate-500 uppercase font-medium">Satisfaction</p>
                  <p className="text-xs font-semibold text-emerald-400">
                    {(route.avgSatisfaction * 100).toFixed(0)}%
                  </p>
                </div>
              </div>

              {/* Duration */}
              <div className="flex items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-lg bg-white/5 text-slate-400 border border-white/10">
                  <Timer className="size-3.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-slate-500 uppercase font-medium">Duration</p>
                  <p className="text-xs font-semibold text-slate-200">
                    {Math.floor(route.totalDuration / 60)}h {route.totalDuration % 60}m
                  </p>
                </div>
              </div>

              {/* Efficiency */}
              <div className="flex items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-lg bg-white/5 text-slate-400 border border-white/10">
                  <Gauge className="size-3.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-slate-500 uppercase font-medium">Efficiency</p>
                  <p className="text-xs font-semibold text-cyan-400">
                    {route.efficiencyScore}/100
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
