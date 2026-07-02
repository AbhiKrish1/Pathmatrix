"use client";
import { optimizeSightseeingRoute } from "@/lib/api";
import { buildOptimizeRoutePayload } from "@/lib/payload-builder";
import { mapBackendRouteToLocations } from "@/lib/route-mapper";

import {
  ArrowLeft,
  Clock,
  Gauge,
  MapPin,
  Plus,
  Route as RouteIcon,
  Sparkles,
  Target,
} from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

// PathMatrix custom imports
import { MOCK_ROUTES, MOCK_LOCATION_POOL, computeRoute } from "@/lib/mock-data";
import { Location } from "@/lib/types";
import OptimizationResults from "@/components/sightseeing/optimization-results";
import SatisfactionDecay from "@/components/sightseeing/satisfaction-decay";
import RouteComparison from "@/components/sightseeing/route-comparison";

const CATEGORY_COLORS: Record<string, string> = {
  Nature: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  Culture: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  Landmark: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  Food: "bg-amber-500/20 text-amber-300 border-amber-500/30",
};

const glassPanel =
  "rounded-2xl border border-white/10 bg-white/5 shadow-xl shadow-black/20 backdrop-blur-md";

const glassCard =
  "border-white/10 bg-white/5 text-white shadow-lg shadow-black/10 backdrop-blur-md";

function MetricCard({
  label,
  value,
  unit,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string;
  unit?: string;
  icon: React.ElementType;
  accent: string;
}) {
  return (
    <Card className={cn(glassCard, "overflow-hidden")}>
      <CardContent className="flex items-center gap-4 p-5">
        <div
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br",
            accent
          )}
        >
          <Icon className="size-5 text-white" strokeWidth={1.75} />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
            {label}
          </p>
          <p className="mt-0.5 text-2xl font-semibold tracking-tight text-white">
            {value}
            {unit && (
              <span className="ml-1 text-sm font-normal text-slate-400">
                {unit}
              </span>
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function SightseeingPage() {
  const [source, setSource] = useState("MG Road Metro Station, Bengaluru");
  const [destination, setDestination] = useState("Indiranagar, Bengaluru");
  const [distanceBudget, setDistanceBudget] = useState([15]);
  const [categoryThreshold, setCategoryThreshold] = useState([0.75]);
  
  // Track active stops & route
  const [activeRouteId, setActiveRouteId] = useState<string>("optimal");
  const [stops, setStops] = useState<Location[]>(MOCK_ROUTES[0].stops);
  const [poolIndex, setPoolIndex] = useState(0);
  const [isOptimizing, setIsOptimizing] = useState(false);

  // Compute active route metrics dynamically when stops change
  const activeRoute = useMemo(() => {
    const baseRoute = MOCK_ROUTES.find((r) => r.id === activeRouteId) || MOCK_ROUTES[0];
    return computeRoute(
      baseRoute.id,
      baseRoute.name,
      baseRoute.description,
      baseRoute.color,
      stops,
      0.1 // k = 0.1
    );
  }, [stops, activeRouteId]);

  // Derived metrics
  const totalDistance = activeRoute.totalDistance;
  const effectiveSatisfaction = activeRoute.avgSatisfaction;
  const categoryPenalty = Math.max(
    0,
    1 - categoryThreshold[0] - (stops.length > 5 ? 0.04 : 0)
  );
  const runtime = 24 + stops.length * 3;
  const isFeasible = totalDistance <= distanceBudget[0];

  // Route selector handler
  const handleSelectRoute = (id: string) => {
    setActiveRouteId(id);
    const selectedRoute = MOCK_ROUTES.find((r) => r.id === id);
    if (selectedRoute) {
      setStops(selectedRoute.stops);
    }
  };

  // Add Location dynamically
  function handleAddLocation() {
    const template = MOCK_LOCATION_POOL[poolIndex % MOCK_LOCATION_POOL.length];
    
    // Estimate distance from the last stop using Euclidean coordinates approximation in km
    const lastStop = stops[stops.length - 1];
    let distance = 2.5; // default fallback
    if (lastStop) {
      const latDiff = template.lat - lastStop.lat;
      const lngDiff = template.lng - lastStop.lng;
      const calculatedDistance = Math.sqrt(
        Math.pow(latDiff * 111, 2) + Math.pow(lngDiff * 108, 2)
      );
      distance = parseFloat(Math.max(0.6, Math.min(10, calculatedDistance)).toFixed(1));
    }

    const newStop: Location = {
      id: Date.now() + Math.random(),
      name: template.name,
      category: template.category,
      satisfaction: template.satisfaction,
      distance: distance,
      lat: template.lat,
      lng: template.lng,
      description: template.description,
    };

    setStops((prev) => [...prev, newStop]);
    setPoolIndex((i) => i + 1);
  }

  // Nearest-Neighbor Route Optimizer simulation
  const handleOptimizeRoute = async () => {
    if (stops.length <= 1) return;
  
    setIsOptimizing(true);
  
    try {
      const payload = buildOptimizeRoutePayload(
        source,
        destination,
        stops,
        distanceBudget[0],
        categoryThreshold[0]
      );
  
      const result = await optimizeSightseeingRoute(payload);
  
      
      const reorderedStops = mapBackendRouteToLocations(
        result.route,
        stops
      );
      
     
      setStops(reorderedStops);


        
      // We will update the UI using the backend response in the next step.
    } catch (error) {
      console.error(error);
     
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950/80 to-slate-950" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_20%_0%,rgba(16,185,129,0.12),transparent)]" />
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
                <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
                  Sightseeing Route Optimization
                </h1>
                <Badge
                  variant="outline"
                  className="border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                >
                  Interactive Demo
                </Badge>
              </div>
              <p className="mt-0.5 text-sm text-slate-400">
                Configure constraints, compare routes, and view adaptive physical fatigue decay.
              </p>
            </div>
          </div>
          <Button
            className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:brightness-110 shadow-lg shadow-emerald-500/20 font-semibold"
            onClick={handleOptimizeRoute}
            disabled={isOptimizing || stops.length <= 1}
          >
            <Sparkles className={cn("size-4", isOptimizing && "animate-spin")} />
            {isOptimizing ? "Optimizing Route..." : "Optimize Stop Order"}
          </Button>
        </header>

        {/* Main grid */}
        <div className="grid flex-1 gap-6 lg:grid-cols-[380px_1fr]">
          {/* Left panel */}
          <aside className={cn(glassPanel, "flex flex-col gap-5 p-5")}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="source" className="text-slate-300">
                  Source Point
                </Label>
                <Input
                  id="source"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="border-white/10 bg-white/5 text-white placeholder:text-slate-500"
                  placeholder="Enter starting point"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination" className="text-slate-300">
                  Destination Point
                </Label>
                <Input
                  id="destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="border-white/10 bg-white/5 text-white placeholder:text-slate-500"
                  placeholder="Enter end point"
                />
              </div>
            </div>

            <div className="space-y-5 border-t border-white/10 pt-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-slate-300 font-medium">Distance Budget</Label>
                  <span className="text-sm font-semibold text-emerald-400">
                    {distanceBudget[0]} km
                  </span>
                </div>
                <Slider
                  value={distanceBudget}
                  onValueChange={setDistanceBudget}
                  min={5}
                  max={30}
                  step={1}
                  className="[&_[data-slot=slider-range]]:bg-emerald-500 [&_[data-slot=slider-thumb]]:border-emerald-400"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-slate-300 font-medium">Category Threshold</Label>
                  <span className="text-sm font-semibold text-violet-400">
                    {(categoryThreshold[0] * 100).toFixed(0)}%
                  </span>
                </div>
                <Slider
                  value={categoryThreshold}
                  onValueChange={setCategoryThreshold}
                  min={0.5}
                  max={1}
                  step={0.05}
                  className="[&_[data-slot=slider-range]]:bg-violet-500 [&_[data-slot=slider-thumb]]:border-violet-400"
                />
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-3 border-t border-white/10 pt-5">
              <div className="flex items-center justify-between">
                <Label className="text-slate-300 font-medium">Route Stop List</Label>
                <span className="text-xs text-slate-500 font-medium">
                  {stops.length} locations
                </span>
              </div>

              <div className="max-h-[300px] overflow-auto rounded-xl border border-white/10 scrollbar-thin scrollbar-thumb-slate-800">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10 hover:bg-transparent">
                      <TableHead className="text-slate-400 font-medium">Name</TableHead>
                      <TableHead className="text-slate-400 font-medium">Category</TableHead>
                      <TableHead className="text-right text-slate-400 font-medium">Sat.</TableHead>
                      <TableHead className="text-right text-slate-400 font-medium">Leg</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stops.map((stop, index) => (
                      <TableRow
                        key={`${stop.id}-${index}`}
                        className="border-white/10 hover:bg-white/5"
                      >
                        <TableCell className="max-w-[130px] truncate font-medium text-white">
                          <span className="text-slate-500 mr-1 text-xs">{index + 1}.</span>
                          {stop.name}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={cn(
                              "border text-[9px] px-1 py-0.5",
                              CATEGORY_COLORS[stop.category] ??
                                "bg-slate-500/20 text-slate-300 border-slate-500/30"
                            )}
                          >
                            {stop.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right text-emerald-400 font-medium">
                          {(stop.satisfaction * 100).toFixed(0)}%
                        </TableCell>
                        <TableCell className="text-right text-slate-400 text-xs">
                          {stop.distance} km
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <Button
                variant="outline"
                className="w-full border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white font-medium"
                onClick={handleAddLocation}
              >
                <Plus className="size-4" />
                Add Location Stop
              </Button>
            </div>
          </aside>

          {/* Right panel */}
          <section className="flex flex-col gap-6">
            {/* Route Selector Cards */}
            <RouteComparison
              routes={MOCK_ROUTES}
              activeRouteId={activeRouteId}
              onSelectRoute={handleSelectRoute}
              distanceBudget={distanceBudget[0]}
            />

            {/* Interactive Leaflet Map */}
            <OptimizationResults stops={stops} />

            {/* Bottom Row Grid: Summary + Decay Chart */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Route Summary */}
              <Card className={glassCard}>
                <CardHeader className="border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <RouteIcon className="size-4 text-emerald-400" />
                    <CardTitle className="text-white text-base">Route Summary</CardTitle>
                  </div>
                  <CardDescription className="text-slate-400 text-xs">
                    Current metrics from <span className="text-slate-300 font-medium">{source}</span> to{" "}
                    <span className="text-slate-300 font-medium">{destination}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 pt-4 sm:grid-cols-3">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Total Sights</p>
                    <p className="mt-1 text-2xl font-bold text-white">
                      {stops.length}
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Budget Used</p>
                    <p className={cn("mt-1 text-2xl font-bold", isFeasible ? "text-emerald-400" : "text-rose-400")}>
                      {((totalDistance / distanceBudget[0]) * 100).toFixed(0)}%
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Status</p>
                    <p
                      className={cn(
                        "mt-1.5 flex items-center gap-1.5 text-sm font-semibold",
                        isFeasible ? "text-emerald-400" : "text-rose-400"
                      )}
                    >
                      <span
                        className={cn(
                          "size-2 rounded-full",
                          isFeasible 
                            ? "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" 
                            : "bg-rose-400 shadow-[0_0_6px_rgba(251,113,133,0.8)]"
                        )}
                      />
                      {isFeasible ? "Feasible" : "Infeasible"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Satisfaction Decay Recharts AreaChart */}
              <SatisfactionDecay stops={stops} />
            </div>
          </section>
        </div>

        {/* Bottom metrics row */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Total Distance"
            value={totalDistance.toFixed(1)}
            unit="km"
            icon={MapPin}
            accent="from-emerald-500 to-teal-600"
          />
          <MetricCard
            label="Effective Satisfaction"
            value={(effectiveSatisfaction * 100).toFixed(1)}
            unit="%"
            icon={Target}
            accent="from-violet-500 to-indigo-600"
          />
          <MetricCard
            label="Category Penalty"
            value={categoryPenalty.toFixed(2)}
            icon={Gauge}
            accent="from-amber-500 to-orange-600"
          />
          <MetricCard
            label="Optimization Runtime"
            value={String(runtime)}
            unit="ms"
            icon={Clock}
            accent="from-cyan-500 to-blue-600"
          />
        </div>
      </div>
    </div>
  );
}
