"use client";

import Link from "next/link";
import {
  useCallback,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

export function HorizontalCardRail({
  children,
  itemCount,
  ariaLabel,
  viewMoreHref,
  viewMoreLabel = "View more",
  className = "",
  railClassName = "",
}: {
  children: ReactNode;
  itemCount: number;
  ariaLabel: string;
  viewMoreHref?: string;
  viewMoreLabel?: string;
  className?: string;
  railClassName?: string;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const safeActiveIndex = Math.min(Math.max(activeIndex, 0), itemCount - 1);
  const progress =
    itemCount > 1 ? ((safeActiveIndex + 1) / itemCount) * 100 : 100;

  const updateActiveIndex = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;

    const items = Array.from(rail.children) as HTMLElement[];
    if (!items.length) {
      setActiveIndex(0);
      return;
    }

    const railCenter = rail.scrollLeft + rail.clientWidth / 2;
    const closestIndex = items.reduce(
      (closest, item, index) => {
        const itemCenter = item.offsetLeft + item.offsetWidth / 2;
        const distance = Math.abs(itemCenter - railCenter);
        return distance < closest.distance ? { index, distance } : closest;
      },
      { index: 0, distance: Number.POSITIVE_INFINITY }
    ).index;

    setActiveIndex(closestIndex);
  }, []);

  const scrollToIndex = (index: number) => {
    const rail = railRef.current;
    const item = rail?.children[index] as HTMLElement | undefined;
    if (!rail || !item) return;

    rail.scrollTo({
      left: item.offsetLeft - rail.offsetLeft,
      behavior: "smooth",
    });
  };

  const scrollRail = (direction: "previous" | "next") => {
    const nextIndex =
      direction === "next"
        ? Math.min(safeActiveIndex + 1, itemCount - 1)
        : Math.max(safeActiveIndex - 1, 0);

    scrollToIndex(nextIndex);
  };

  if (itemCount === 0) return null;

  return (
    <div className={className}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div
            className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1.5 text-xs font-bold text-muted-foreground shadow-sm backdrop-blur"
            aria-live="polite"
          >
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span>
              {safeActiveIndex + 1} / {itemCount}
            </span>
            <span className="hidden sm:inline">cards</span>
          </div>
          <div className="mt-2 h-1 w-32 overflow-hidden rounded-full bg-primary/10">
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => scrollRail("previous")}
            className="focus-ring grid h-9 w-9 place-items-center rounded-full border bg-background/85 text-foreground shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary disabled:pointer-events-none disabled:opacity-40"
            aria-label={`Scroll ${ariaLabel} left`}
            disabled={safeActiveIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollRail("next")}
            className="focus-ring grid h-9 w-9 place-items-center rounded-full border bg-background/85 text-foreground shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary disabled:pointer-events-none disabled:opacity-40"
            aria-label={`Scroll ${ariaLabel} right`}
            disabled={safeActiveIndex >= itemCount - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative">
        {itemCount > 1 && (
          <>
            <button
              type="button"
              onClick={() => scrollRail("previous")}
              className="focus-ring absolute left-1 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border bg-background/90 text-foreground shadow-xl shadow-slate-900/10 backdrop-blur transition hover:-translate-x-0.5 hover:border-primary/40 hover:text-primary disabled:pointer-events-none disabled:opacity-0 sm:grid"
              aria-label={`Scroll ${ariaLabel} left`}
              disabled={safeActiveIndex === 0}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollRail("next")}
              className="focus-ring absolute right-1 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border bg-background/90 text-foreground shadow-xl shadow-slate-900/10 backdrop-blur transition hover:translate-x-0.5 hover:border-primary/40 hover:text-primary disabled:pointer-events-none disabled:opacity-0 sm:grid"
              aria-label={`Scroll ${ariaLabel} right`}
              disabled={safeActiveIndex >= itemCount - 1}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        <motion.div
          ref={railRef}
          onScroll={updateActiveIndex}
          whileInView={
            shouldReduceMotion ? undefined : { x: [0, -10, 5, 0] }
          }
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: "easeOut", delay: 0.15 }}
          className={`-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-5 pt-1 scrollbar-none md:gap-5 ${railClassName}`}
        >
          {children}
        </motion.div>
      </div>

      {itemCount > 1 && (
        <div className="mt-1 flex justify-center gap-1.5">
          {Array.from({ length: itemCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollToIndex(index)}
              className={`focus-ring h-2 rounded-full transition-all ${
                safeActiveIndex === index
                  ? "w-8 bg-primary"
                  : "w-2 bg-primary/20 hover:bg-primary/45"
              }`}
              aria-label={`Go to ${ariaLabel} card ${index + 1}`}
              aria-current={safeActiveIndex === index ? "true" : undefined}
            />
          ))}
        </div>
      )}

      {viewMoreHref && (
        <div className="mt-5 flex justify-center">
          <Link
            href={viewMoreHref}
            className="focus-ring inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-sm font-bold text-foreground shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
          >
            {viewMoreLabel}
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
