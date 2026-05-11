"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Portfolio route error:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-sky-50 px-4 py-20 text-slate-950 dark:bg-slate-950 dark:text-slate-100">
      <section className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-3xl items-center justify-center">
        <div className="w-full rounded-lg border bg-background/90 p-6 text-center shadow-2xl shadow-slate-900/10 backdrop-blur-xl sm:p-8">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-destructive/10 text-destructive">
            <AlertTriangle className="h-7 w-7" />
          </div>
          <p className="mt-5 text-xs font-black uppercase tracking-[0.2em] text-primary">
            Recovery mode
          </p>
          <h1 className="mt-3 text-2xl font-black tracking-tight sm:text-4xl">
            Something paused the portfolio.
          </h1>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-muted-foreground">
            The page hit a temporary issue. You can retry the same view or jump
            back to the main portfolio without losing your path.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={reset}
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:-translate-y-0.5 hover:bg-primary/90"
            >
              <RotateCcw className="h-4 w-4" />
              Try again
            </button>
            <Link
              href="/"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-bold transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
          </div>

          {error.digest && (
            <p className="mt-5 text-xs text-muted-foreground">
              Reference: {error.digest}
            </p>
          )}
        </div>
      </section>

    </main>
  );
}
