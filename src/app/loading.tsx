import { Cloud, Sparkles } from "lucide-react";

const skeletonCards = ["Projects", "Stack", "Knowledge"];

export default function Loading() {
  return (
    <main className="min-h-screen overflow-hidden bg-sky-50 text-slate-950 dark:bg-slate-950 dark:text-slate-100">
      <div className="absolute inset-0 grid-pattern opacity-20 dark:opacity-25" />
      <div className="absolute inset-0 space-dust opacity-15 dark:opacity-25" />
      <section className="relative mx-auto flex min-h-screen max-w-6xl items-center px-4 py-20">
        <div className="grid w-full gap-10 lg:grid-cols-[1fr_360px] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-white/75 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-cyan-800 shadow-sm backdrop-blur dark:border-cyan-300/20 dark:bg-white/10 dark:text-cyan-100">
              <Cloud className="h-3.5 w-3.5" />
              Preparing portfolio
            </div>

            <div className="mt-6 space-y-3">
              <div className="h-10 max-w-2xl animate-pulse rounded-lg bg-cyan-900/10 dark:bg-white/10 sm:h-14" />
              <div className="h-10 max-w-xl animate-pulse rounded-lg bg-cyan-900/10 dark:bg-white/10 sm:h-14" />
            </div>

            <div className="mt-6 max-w-xl space-y-3">
              <div className="h-4 animate-pulse rounded-full bg-slate-900/10 dark:bg-white/10" />
              <div className="h-4 w-5/6 animate-pulse rounded-full bg-slate-900/10 dark:bg-white/10" />
              <div className="h-4 w-2/3 animate-pulse rounded-full bg-slate-900/10 dark:bg-white/10" />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="h-11 w-32 animate-pulse rounded-full bg-cyan-600/30" />
              <div className="h-11 w-28 animate-pulse rounded-full bg-slate-900/10 dark:bg-white/10" />
            </div>
          </div>

          <div className="grid gap-3">
            {skeletonCards.map((item, index) => (
              <div
                key={item}
                className="rounded-lg border bg-background/75 p-4 shadow-lg shadow-slate-900/5 backdrop-blur-xl dark:bg-white/[0.07]"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{item}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Loading section {index + 1}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 animate-pulse rounded-full bg-primary/15" />
                  <div className="h-3 w-3/4 animate-pulse rounded-full bg-primary/10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
