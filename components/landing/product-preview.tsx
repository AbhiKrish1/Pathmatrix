import { BarChart3, Map, Route } from "lucide-react";

export function ProductPreview() {
  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-emerald-500/20 via-transparent to-cyan-500/10 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xl shadow-emerald-500/5">
        <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-red-400/80" />
            <span className="size-2.5 rounded-full bg-amber-400/80" />
            <span className="size-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <span className="ml-2 text-xs text-muted-foreground">pathmatrix.app/dashboard</span>
        </div>

        <div className="grid gap-px bg-border/40 md:grid-cols-[1.4fr_1fr]">
          <div className="relative min-h-52 bg-muted/30 p-6 md:min-h-64">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.5_0_0/0.04)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.5_0_0/0.04)_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Map className="size-3.5 text-emerald-500" />
                Live route overlay
              </div>

              <svg
                viewBox="0 0 400 200"
                className="h-full w-full"
                aria-hidden="true"
              >
                <path
                  d="M 30 150 Q 80 40, 140 90 T 250 60 T 370 120"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="text-emerald-500/80"
                  strokeDasharray="8 6"
                />
                <path
                  d="M 30 150 Q 100 120, 180 130 T 320 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="text-cyan-500/50"
                />
                <circle cx="30" cy="150" r="6" className="fill-emerald-500" />
                <circle cx="140" cy="90" r="5" className="fill-background stroke-emerald-500" strokeWidth="2" />
                <circle cx="250" cy="60" r="5" className="fill-background stroke-emerald-500" strokeWidth="2" />
                <circle cx="370" cy="120" r="6" className="fill-emerald-600" />
              </svg>

              <div className="flex gap-2">
                {["Optimal", "Alt A", "Alt B"].map((label, i) => (
                  <span
                    key={label}
                    className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
                      i === 0
                        ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-px bg-border/40">
            <div className="flex flex-1 flex-col justify-center gap-3 bg-card p-5">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Route className="size-3.5 text-emerald-500" />
                Path metrics
              </div>
              <div className="space-y-3">
                {[
                  { label: "Distance", value: "24.8 km", pct: 72 },
                  { label: "ETA", value: "38 min", pct: 58 },
                  { label: "Efficiency", value: "94%", pct: 94 },
                ].map((metric) => (
                  <div key={metric.label}>
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="text-muted-foreground">{metric.label}</span>
                      <span className="font-medium">{metric.value}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-emerald-500"
                        style={{ width: `${metric.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card p-5">
              <div className="mb-3 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <BarChart3 className="size-3.5 text-emerald-500" />
                Weekly throughput
              </div>
              <div className="flex h-16 items-end gap-1.5">
                {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm bg-emerald-500/70"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
