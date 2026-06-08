import Link from "next/link";
import { MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <span className="flex size-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <MapPin className="size-3.5" />
          </span>
          PathMatrix
        </Link>

        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} PathMatrix. All rights reserved.
        </p>

        <div className="flex gap-6 text-sm text-muted-foreground">
          <a href="#features" className="transition-colors hover:text-foreground">
            Features
          </a>
          <a href="#how-it-works" className="transition-colors hover:text-foreground">
            How it works
          </a>
          <a href="#cta" className="transition-colors hover:text-foreground">
            Get started
          </a>
        </div>
      </div>
    </footer>
  );
}
