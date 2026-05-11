"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress =
        scrollable > 0 ? Math.min((scrollTop / scrollable) * 100, 100) : 0;

      setProgress(nextProgress);
      setIsVisible(scrollTop > 560);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`focus-ring fixed bottom-28 right-4 z-50 grid h-12 w-12 place-items-center rounded-full text-primary-foreground shadow-xl shadow-primary/20 transition duration-300 md:bottom-6 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
      style={{
        background: `conic-gradient(hsl(var(--primary)) ${progress * 3.6}deg, hsl(var(--primary) / 0.16) 0deg)`,
      }}
      aria-label="Scroll back to top"
    >
      <span className="grid h-9 w-9 place-items-center rounded-full bg-primary shadow-inner">
        <ArrowUp className="h-5 w-5" />
      </span>
    </button>
  );
}
