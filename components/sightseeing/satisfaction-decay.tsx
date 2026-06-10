"use client";

import { useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { Location } from "@/lib/types";
import { calculateDecayPoints } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, TrendingDown } from "lucide-react";

interface SatisfactionDecayProps {
  stops: Location[];
}

const glassCard = "border-white/10 bg-white/5 text-white shadow-lg shadow-black/10 backdrop-blur-md";

export default function SatisfactionDecay({ stops }: SatisfactionDecayProps) {
  const chartData = useMemo(() => {
    if (!stops || stops.length === 0) return [];
    
    // Calculate decay points using k = 0.1
    const decayPoints = calculateDecayPoints(stops, 0.1);
    
    return decayPoints.map((dp) => ({
      name: dp.stopName,
      index: dp.stopIndex,
      distance: dp.cumulativeDistance,
      baseSat: Math.round(dp.baseSatisfaction * 100),
      effectiveSat: Math.round(dp.decayedSatisfaction * 100),
      fatigue: Math.round(dp.fatigue * 100),
    }));
  }, [stops]);

  // Custom Tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="rounded-xl border border-white/10 bg-slate-950/90 p-4 shadow-xl backdrop-blur-md">
          <p className="font-semibold text-white text-sm">{data.name}</p>
          <div className="mt-1 flex items-center justify-between text-xs text-slate-400">
            <span>Stop #{data.index}</span>
            <span>{data.distance} km traveled</span>
          </div>
          <div className="mt-2.5 space-y-1.5 text-xs">
            <div className="flex items-center justify-between gap-6">
              <span className="text-indigo-300">Base Satisfaction:</span>
              <span className="font-semibold text-indigo-400">{data.baseSat}%</span>
            </div>
            <div className="flex items-center justify-between gap-6">
              <span className="text-emerald-300 font-medium">Effective (Decayed):</span>
              <span className="font-semibold text-emerald-400">{data.effectiveSat}%</span>
            </div>
            <div className="flex items-center justify-between gap-6">
              <span className="text-rose-300">Traveler Fatigue:</span>
              <span className="font-semibold text-rose-400">{data.fatigue}%</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  if (stops.length === 0) {
    return (
      <Card className={glassCard}>
        <CardContent className="flex h-[350px] items-center justify-center text-slate-400 text-sm">
          Add locations to visualize satisfaction decay.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={glassCard}>
      <CardHeader className="border-b border-white/10 pb-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <TrendingDown className="size-4 text-violet-400" />
            <CardTitle className="text-white">Satisfaction Decay & Fatigue</CardTitle>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <Target className="size-3 text-emerald-400" />
            <span>Formula: S_effective = S * e^(-0.1 * d)</span>
          </div>
        </div>
        <CardDescription className="text-slate-400 text-xs">
          Visualizes how physical fatigue (accumulating by 10% per km) affects the sightseeing experience.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorBaseSat" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorEffectiveSat" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorFatigue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
              
              <XAxis
                dataKey="index"
                tickFormatter={(tick) => `Stop ${tick}`}
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
              />
              
              <YAxis
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                domain={[0, 100]}
                tickFormatter={(tick) => `${tick}%`}
              />

              <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(255, 255, 255, 0.1)", strokeWidth: 1 }} />
              
              <Legend
                verticalAlign="top"
                height={36}
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 11, paddingBottom: 15 }}
                formatter={(value) => {
                  if (value === "baseSat") return <span className="text-slate-300">Base Satisfaction</span>;
                  if (value === "effectiveSat") return <span className="text-slate-300">Effective Satisfaction (Decayed)</span>;
                  if (value === "fatigue") return <span className="text-slate-300">Cumulative Fatigue</span>;
                  return value;
                }}
              />

              <Area
                type="monotone"
                dataKey="baseSat"
                stroke="#6366f1"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorBaseSat)"
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
              
              <Area
                type="monotone"
                dataKey="effectiveSat"
                stroke="#10b981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorEffectiveSat)"
                activeDot={{ r: 6, stroke: "#34d399", strokeWidth: 2 }}
              />

              <Area
                type="monotone"
                dataKey="fatigue"
                stroke="#f43f5e"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                fillOpacity={1}
                fill="url(#colorFatigue)"
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
