import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProductPreview } from "@/components/landing/product-preview";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-16 md:pb-32 md:pt-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.7_0.15_160/0.15),transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,oklch(0.5_0_0/0.03)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.5_0_0/0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-sm text-emerald-700 dark:text-emerald-300">
            <Sparkles className="size-3.5" />
            Route intelligence, visualized
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl">
            Map every path.{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-cyan-500 bg-clip-text text-transparent dark:from-emerald-400 dark:to-cyan-400">
              Optimize every move.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
          PathMatrix TEST turns complex routes into clear decisions — interactive maps,
            real-time analytics, and path optimization in one unified platform.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              className="h-11 gap-2 bg-emerald-600 px-6 text-white hover:bg-emerald-500"
              asChild
            >
              <Link href="#cta">
                Start free trial
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-11 px-6" asChild>
              <Link href="#features">Explore features</Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 md:mt-20">
          <ProductPreview />
        </div>
      </div>
    </section>
  );
}
