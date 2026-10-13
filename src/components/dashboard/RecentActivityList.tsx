"use client";

import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { useLearning } from "@/context/LearningContext";
import { Activity, Compass, Layers, CheckSquare, Clock } from "lucide-react";

export function RecentActivityList() {
  const { activities, isHydrated } = useLearning();

  const getIcon = (type: string) => {
    switch (type) {
      case "module":
        return <Compass className="w-3.5 h-3.5 text-amber-500" />;
      case "project":
        return <Layers className="w-3.5 h-3.5 text-sky-500" />;
      case "task":
        return <CheckSquare className="w-3.5 h-3.5 text-emerald-500" />;
      default:
        return <Activity className="w-3.5 h-3.5 text-purple-500" />;
    }
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-amber-500" />
          <CardTitle>Recent Activity</CardTitle>
        </div>
      </CardHeader>

      <div className="space-y-3.5 flex-1 overflow-y-auto max-h-[380px] pr-1">
        {!isHydrated ? (
          <div className="py-8 text-center text-sm text-slate-400">
            Loading activity log...
          </div>
        ) : activities.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400">
            No recent activity recorded yet.
          </div>
        ) : (
          activities.map((act) => (
            <div
              key={act.id}
              className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800/60">
              <div className="p-2 rounded-lg bg-white dark:bg-slate-800 shadow-xs border border-slate-200/60 dark:border-slate-700/60 shrink-0">
                {getIcon(act.type)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                    {act.title}
                  </p>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 shrink-0">
                    <Clock className="w-2.5 h-2.5" />
                    {act.timestamp}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                  {act.description}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
