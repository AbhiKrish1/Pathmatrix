import {
  BarChart3,
  GitCompareArrows,
  Layers,
  Map,
  Route,
  Users,
} from "lucide-react";

const features = [
  {
    icon: Map,
    title: "Interactive maps",
    description:
      "Visualize routes on rich, zoomable maps with live overlays, waypoints, and geofenced zones.",
  },
  {
    icon: BarChart3,
    title: "Path analytics",
    description:
      "Track distance, ETA, throughput, and efficiency with dashboards built for operations teams.",
  },
  {
    icon: Route,
    title: "Route optimization",
    description:
      "Compare alternate paths side-by-side and surface the fastest, most cost-effective options.",
  },
  {
    icon: GitCompareArrows,
    title: "Matrix comparison",
    description:
      "Evaluate multiple routes in a single view — trade-offs between time, cost, and reliability.",
  },
  {
    icon: Layers,
    title: "Layered insights",
    description:
      "Stack traffic, terrain, and custom data layers to understand every variable on the ground.",
  },
  {
    icon: Users,
    title: "Team workspaces",
    description:
      "Share routes, annotate paths, and align field and dispatch teams from one source of truth.",
  },
];

export function Features() {
  return (
    <section id="features" className="border-t border-border/60 bg-muted/30 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
            Features
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to master the matrix of paths
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            From first-mile logistics to field operations, PathMatrix gives you the
            tools to plan, measure, and improve every route.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-border/60 bg-card p-6 transition-colors hover:border-emerald-500/30 hover:bg-card/80"
            >
              <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 transition-colors group-hover:bg-emerald-500/15 dark:text-emerald-400">
                <feature.icon className="size-5" />
              </div>
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
