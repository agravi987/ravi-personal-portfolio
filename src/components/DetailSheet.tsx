"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface DetailSheetProps {
  title: string;
  eyebrow?: string;
  children: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
}

export function DetailSheet({
  title,
  eyebrow,
  children,
  footer,
  onClose,
}: DetailSheetProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-slate-950/70 p-0 backdrop-blur-md md:items-center md:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} details`}
      onMouseDown={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 26, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 26, scale: 0.98 }}
        transition={{ duration: 0.22 }}
        onMouseDown={(event) => event.stopPropagation()}
        className="mobile-safe-bottom max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-t-2xl border border-primary/15 bg-background p-4 shadow-2xl shadow-primary/20 sm:p-6 md:max-h-[88vh] md:rounded-lg"
      >
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-muted-foreground/25 md:hidden" />
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="min-w-0">
            {eyebrow && (
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                {eyebrow}
              </p>
            )}
            <h3 className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">
              {title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="focus-ring rounded-full border p-2 text-muted-foreground transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
            aria-label="Close details"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div>{children}</div>

        {footer && <div className="mt-6 border-t pt-5">{footer}</div>}
      </motion.div>
    </div>
  );
}
