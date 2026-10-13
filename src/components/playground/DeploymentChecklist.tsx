"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useLearning } from "@/context/LearningContext";
import {
  CheckSquare,
  CheckCircle2,
  Circle,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";

export function DeploymentChecklist() {
  const { checklist, toggleChecklistItem, isHydrated } = useLearning();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    "all",
    "Preparation",
    "Build",
    "S3 Bucket",
    "CloudFront",
    "Testing & Maintenance",
  ];

  const filteredItems = checklist.filter((item) => {
    if (selectedCategory === "all") return true;
    return item.category === selectedCategory;
  });

  const completedCount = checklist.filter((i) => i.completed).length;
  const progressPercent =
    checklist.length > 0
      ? Math.round((completedCount / checklist.length) * 100)
      : 0;

  return (
    <Card className="space-y-4">
      <CardHeader>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-amber-500" />
            <CardTitle>Production Deployment Readiness Checklist</CardTitle>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Follow this production checklist step-by-step when deploying
            CloudTrack to AWS.
          </p>
        </div>

        <div className="text-right">
          <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">
            {completedCount} of {checklist.length} Completed ({progressPercent}
            %)
          </div>
          <div className="w-36 mt-1.5 ml-auto">
            <ProgressBar progress={progressPercent} size="sm" color="emerald" />
          </div>
        </div>
      </CardHeader>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-lg font-medium transition-colors whitespace-nowrap ${
              selectedCategory === cat
                ? "bg-amber-500 text-slate-950 font-bold shadow-xs"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}>
            {cat === "all" ? "All Steps" : cat}
          </button>
        ))}
      </div>

      {/* Checklist items */}
      <div className="space-y-2.5">
        {!isHydrated ? (
          <div className="py-6 text-center text-xs text-slate-400">
            Loading checklist...
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleChecklistItem(item.id)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                item.completed
                  ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200/60 dark:border-emerald-800/40 text-slate-600 dark:text-slate-400"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-700"
              }`}>
              <button
                className="mt-0.5 text-slate-400 hover:text-amber-500 transition-colors shrink-0"
                aria-label={
                  item.completed ? "Mark incomplete" : "Mark complete"
                }>
                {item.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span
                    className={`text-sm font-semibold ${
                      item.completed
                        ? "line-through text-slate-400 dark:text-slate-500"
                        : "text-slate-900 dark:text-white"
                    }`}>
                    {item.title}
                  </span>
                  <Badge size="sm" variant="neutral">
                    {item.category}
                  </Badge>
                  {item.critical && (
                    <Badge size="sm" variant="danger" className="gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Critical
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
