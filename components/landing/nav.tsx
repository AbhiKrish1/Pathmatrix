import Link from "next/link";
import { MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";

const links = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#stats", label: "Impact" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <span className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <MapPin className="size-4" />
          </span>
          PathMatrix
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex" asChild>
            <Link href="#features">Learn more</Link>
          </Button>
          <Button size="sm" className="bg-emerald-600 text-white hover:bg-emerald-500" asChild>
            <Link href="#cta">Get started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
