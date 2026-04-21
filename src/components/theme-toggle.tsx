"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative h-10 w-10 overflow-hidden rounded-full border bg-background shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
      aria-label="Toggle theme"
    >
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.22),transparent_45%)] opacity-0 transition dark:opacity-100" />
      <Sun className="absolute left-1/2 top-1/2 h-[1.15rem] w-[1.15rem] -translate-x-1/2 -translate-y-1/2 rotate-0 scale-100 text-amber-500 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute left-1/2 top-1/2 h-[1.15rem] w-[1.15rem] -translate-x-1/2 -translate-y-1/2 rotate-90 scale-0 text-cyan-300 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  );
}
