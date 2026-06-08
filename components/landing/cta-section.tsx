import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section id="cta" className="px-6 py-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-card to-cyan-500/5 px-8 py-16 text-center md:px-16">
        <div className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 size-64 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to optimize your paths?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Join teams using PathMatrix to cut delivery times, reduce costs, and
            make smarter routing decisions every day.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              className="h-11 gap-2 bg-emerald-600 px-6 text-white hover:bg-emerald-500"
              asChild
            >
              <Link href="#cta">
                Get started free
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-11 px-6" asChild>
              <Link href="#features">View features</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
