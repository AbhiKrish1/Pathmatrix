import { ArrowRight, Car, MapPin } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: MapPin,
    title: "Sightseeing Route Optimization",
    description:
      "Discover the smartest paths through cities and landmarks. Our adaptive engine balances travel time, crowd density, and your must-see stops into one seamless itinerary.",
    accent: "from-emerald-400 to-teal-500",
    glow: "bg-emerald-500/20",
  },
  {
    icon: Car,
    title: "Dynamic Ride Sharing",
    description:
      "Match riders in real time with intelligent pooling. Routes evolve on the fly as new passengers join, cutting wait times and emissions without sacrificing convenience.",
    accent: "from-violet-400 to-indigo-500",
    glow: "bg-violet-500/20",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* Gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(99,102,241,0.35),transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_80%,rgba(16,185,129,0.15),transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_10%_60%,rgba(139,92,246,0.2),transparent)]" />

      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />

      <main className="relative flex min-h-screen flex-col items-center justify-center px-6 py-20">
        {/* Hero */}
        <section className="mx-auto max-w-5xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-indigo-200 backdrop-blur-sm">
            <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            Intelligent Route Planning &amp; Adaptive Optimization
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-balance sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="bg-gradient-to-r from-white via-indigo-100 to-violet-200 bg-clip-text text-transparent">
              Path
            </span>
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Matrix
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 text-pretty sm:text-xl">
            An intelligent route planning and adaptive optimization system that
            turns complex mobility challenges into clear, efficient decisions.
          </p>

          <div className="mt-10">
            <Link
              href="#features"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 hover:shadow-emerald-500/40 hover:brightness-110"
            >
              Get Started
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>

        {/* Feature cards */}
        <section
          id="features"
          className="mx-auto mt-24 grid w-full max-w-4xl gap-6 sm:grid-cols-2"
        >
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/[0.08]"
            >
              <div
                className={`pointer-events-none absolute -right-8 -top-8 size-32 rounded-full blur-3xl ${feature.glow} transition-opacity group-hover:opacity-100 opacity-60`}
              />

              <div
                className={`mb-5 inline-flex rounded-xl bg-gradient-to-br ${feature.accent} p-3 shadow-lg`}
              >
                <feature.icon className="size-6 text-white" strokeWidth={1.75} />
              </div>

              <h2 className="text-xl font-semibold tracking-tight text-white">
                {feature.title}
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {feature.description}
              </p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
