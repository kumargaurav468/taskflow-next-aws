"use client";

import React from "react";

interface ProgressBarProps {
  progress: number; // 0 to 100
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  color?: "amber" | "blue" | "emerald" | "purple";
  className?: string;
}

export function ProgressBar({
  progress,
  size = "md",
  showLabel = false,
  color = "amber",
  className = "",
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(progress)));

  const sizeHeights = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-3.5",
  };

  const colorStyles = {
    amber: "bg-amber-500",
    blue: "bg-sky-500",
    emerald: "bg-emerald-500",
    purple: "bg-purple-500",
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
          <span>Completion</span>
          <span className="font-semibold text-slate-900 dark:text-slate-200">
            {clamped}%
          </span>
        </div>
      )}
      <div
        className={`w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden ${sizeHeights[size]}`}>
        <div
          className={`${sizeHeights[size]} ${colorStyles[color]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${clamped}%` }}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
