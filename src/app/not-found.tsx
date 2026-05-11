import Link from "next/link";
import { ArrowRight, Compass, Home, Search } from "lucide-react";

const helpfulLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/stack", label: "Stack" },
  { href: "/knowledge", label: "Knowledge" },
  { href: "/contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <main className="min-h-screen overflow-hidden bg-sky-50 px-4 py-20 text-slate-950 dark:bg-slate-950 dark:text-slate-100">
      <div className="absolute inset-0 grid-pattern opacity-20 dark:opacity-25" />
      <section className="relative mx-auto flex min-h-[calc(100vh-10rem)] max-w-4xl items-center justify-center">
        <div className="w-full rounded-lg border bg-background/90 p-6 shadow-2xl shadow-slate-900/10 backdrop-blur-xl sm:p-8">
          <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border bg-primary/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-primary">
                <Compass className="h-3.5 w-3.5" />
                404
              </div>
              <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">
                This route drifted away.
              </h1>
              <p className="mt-4 leading-7 text-muted-foreground">
                The page does not exist, but the portfolio is still ready. Pick
                a main section and keep exploring.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/"
                  className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:-translate-y-0.5 hover:bg-primary/90"
                >
                  <Home className="h-4 w-4" />
                  Back home
                </Link>
                <Link
                  href="/projects"
                  className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-bold transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
                >
                  View work
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="grid gap-3">
              <div className="rounded-lg border bg-muted/40 p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-bold">
                  <Search className="h-4 w-4 text-primary" />
                  Quick paths
                </div>
                <div className="grid gap-2">
                  {helpfulLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="focus-ring flex items-center justify-between rounded-lg border bg-background px-3 py-2 text-sm font-semibold transition hover:border-primary/40 hover:text-primary"
                    >
                      {item.label}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
