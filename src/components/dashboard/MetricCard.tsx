"use client";

import React from "react";
import { Card } from "@/components/ui/Card";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: string;
  color?: "amber" | "emerald" | "sky" | "purple" | "slate";
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  color = "amber",
}: MetricCardProps) {
  const iconBackgrounds = {
    amber:
      "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400",
    emerald:
      "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400",
    sky: "bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-400",
    purple:
      "bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400",
    slate: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300",
  };

  return (
    <Card className="relative overflow-hidden p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {title}
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400 pt-0.5">
              {subtitle}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl shrink-0 ${iconBackgrounds[color]}`}>
          {icon}
        </div>
      </div>
      {trend && (
        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
          <span className="text-slate-500 dark:text-slate-400">{trend}</span>
        </div>
      )}
    </Card>
  );
}
