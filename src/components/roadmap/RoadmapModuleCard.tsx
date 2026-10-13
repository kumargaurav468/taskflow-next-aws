"use client";

import React, { useState } from "react";
import { RoadmapModule, ModuleStatus } from "@/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  Clock,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  PlayCircle,
  CircleDashed,
  Terminal,
  Cloud,
} from "lucide-react";

interface RoadmapModuleCardProps {
  module: RoadmapModule;
  onStatusChange: (id: string, status: ModuleStatus) => void;
}

export function RoadmapModuleCard({
  module,
  onStatusChange,
}: RoadmapModuleCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusConfig: Record<
    ModuleStatus,
    {
      label: string;
      variant: "neutral" | "warning" | "success";
      icon: React.ReactNode;
    }
  > = {
    "not-started": {
      label: "Not Started",
      variant: "neutral",
      icon: <CircleDashed className="w-3.5 h-3.5" />,
    },
    "in-progress": {
      label: "In Progress",
      variant: "warning",
      icon: <PlayCircle className="w-3.5 h-3.5" />,
    },
    completed: {
      label: "Completed",
      variant: "success",
      icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    },
  };

  const currentConfig = statusConfig[module.status];

  return (
    <Card className="transition-all hover:border-slate-300 dark:hover:border-slate-700">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        {/* Module Header Info */}
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              {module.category}
            </span>
            <Badge
              size="sm"
              variant={
                module.difficulty === "Beginner"
                  ? "info"
                  : module.difficulty === "Intermediate"
                    ? "purple"
                    : "danger"
              }>
              {module.difficulty}
            </Badge>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {module.duration}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            {module.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {module.description}
          </p>
        </div>

        {/* Status Switcher Control */}
        <div className="flex flex-col sm:items-end gap-2 shrink-0">
          <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
            Current Status
          </div>

          <div className="inline-flex rounded-lg bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200/80 dark:border-slate-700/80">
            {(
              ["not-started", "in-progress", "completed"] as ModuleStatus[]
            ).map((status) => {
              const active = module.status === status;
              const config = statusConfig[status];
              return (
                <button
                  key={status}
                  onClick={() => onStatusChange(module.id, status)}
                  className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                    active
                      ? status === "completed"
                        ? "bg-emerald-600 text-white shadow-xs"
                        : status === "in-progress"
                          ? "bg-amber-500 text-slate-950 shadow-xs"
                          : "bg-slate-700 text-white shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}>
                  {config.icon}
                  <span className="hidden md:inline">{config.label}</span>
                </button>
              );
            })}
          </div>

          <Badge variant={currentConfig.variant} size="sm" className="mt-1">
            {currentConfig.label}
          </Badge>
        </div>
      </div>

      {/* Topics Summary & Expand Button */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          {module.awsServices.map((srv) => (
            <span
              key={srv}
              className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 font-mono text-slate-600 dark:text-slate-400">
              <Cloud className="w-3 h-3 text-amber-500" />
              {srv}
            </span>
          ))}
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors">
          <span>
            {isExpanded
              ? "Hide Details"
              : `View ${module.topics.length} Topics`}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Expanded Content: Topics Checklist & CLI Commands */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-dashed border-slate-200 dark:border-slate-800 space-y-4">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Curriculum Core Topics:
            </h4>
            <ul className="space-y-1.5">
              {module.topics.map((topic, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </div>

          {module.keyCommands && module.keyCommands.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-amber-500" />
                Key AWS CLI Commands for this Module:
              </h4>
              <div className="bg-slate-900 rounded-lg p-3 space-y-1.5 overflow-x-auto text-xs font-mono text-emerald-400">
                {module.keyCommands.map((cmd, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-slate-500 select-none">$</span>
                    <span>{cmd}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
