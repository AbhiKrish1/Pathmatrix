"use client";

import { ChartDataPoint } from "@/lib/rideshare-types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { BarChart3, LineChart as LineIcon, TrendingUp } from "lucide-react";

interface UtilizationChartsProps {
  data: ChartDataPoint[];
}

const glassCard = "border-white/10 bg-white/5 text-white shadow-lg backdrop-blur-md";

export default function UtilizationCharts({ data }: UtilizationChartsProps) {
  // Custom Tooltip component
  const CustomTooltip = ({ active, payload, label, unit }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-xl border border-white/10 bg-slate-950/90 p-3 shadow-xl backdrop-blur-md text-xs">
          <p className="font-semibold text-white text-slate-400">Time: {label}</p>
          <div className="mt-1.5 flex items-center justify-between gap-6">
            <span className="text-slate-300 font-medium">{payload[0].name}:</span>
            <span className="font-semibold text-cyan-400">
              {payload[0].value}
              {unit || ""}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* 1. Passenger Growth Chart */}
      <Card className={glassCard}>
        <CardHeader className="p-4 pb-2 border-b border-white/5">
          <div className="flex items-center gap-2">
            <TrendingUp className="size-4 text-indigo-400" />
            <CardTitle className="text-white text-sm font-semibold">Passenger Growth</CardTitle>
          </div>
          <CardDescription className="text-slate-500 text-[10px]">
            Hourly cumulative passenger count dispatched.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-4">
          <div className="h-[160px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPassengers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={9} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={9} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  name="Passengers Dispatched"
                  type="monotone"
                  dataKey="passengers"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorPassengers)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* 2. Vehicle Utilization Chart */}
      <Card className={glassCard}>
        <CardHeader className="p-4 pb-2 border-b border-white/5">
          <div className="flex items-center gap-2">
            <BarChart3 className="size-4 text-emerald-400" />
            <CardTitle className="text-white text-sm font-semibold">Vehicle Utilization</CardTitle>
          </div>
          <CardDescription className="text-slate-500 text-[10px]">
            Average fleet seat capacity utilization rate.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-4">
          <div className="h-[160px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={9} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={9} tickLine={false} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                <Tooltip content={<CustomTooltip unit="%" />} />
                <Bar
                  name="Fleet Seat Utilization"
                  dataKey="utilization"
                  fill="#10b981"
                  radius={[3, 3, 0, 0]}
                  maxBarSize={15}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* 3. Route Efficiency Chart */}
      <Card className={glassCard}>
        <CardHeader className="p-4 pb-2 border-b border-white/5">
          <div className="flex items-center gap-2">
            <LineIcon className="size-4 text-cyan-400" />
            <CardTitle className="text-white text-sm font-semibold">Route Efficiency</CardTitle>
          </div>
          <CardDescription className="text-slate-500 text-[10px]">
            Direct distance vs pooled routing efficiency ratio.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-4">
          <div className="h-[160px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={9} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={9} tickLine={false} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                <Tooltip content={<CustomTooltip unit="%" />} />
                <Line
                  name="Routing Efficiency Ratio"
                  type="monotone"
                  dataKey="efficiency"
                  stroke="#22d3ee"
                  strokeWidth={2}
                  dot={{ r: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
