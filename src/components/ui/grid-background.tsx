"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface GridBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  gridSize?: number;
  gridColor?: string;
}

export const GridBackground = ({
  children,
  className,
  gridSize = 50,
  gridColor = "rgba(59, 130, 246, 0.1)",
}: GridBackgroundProps) => {
  return (
    <div className={cn("relative w-full h-full", className)}>
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(${gridColor} 1px, transparent 1px),
            linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
          `,
          backgroundSize: `${gridSize}px ${gridSize}px`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
