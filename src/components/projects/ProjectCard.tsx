"use client";

import React, { useState } from "react";
import { DeploymentProject } from "@/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  Clock,
  Layers,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
  Cloud,
  Network,
  ListOrdered,
} from "lucide-react";

interface ProjectCardProps {
  project: DeploymentProject;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="flex flex-col h-full hover:border-slate-300 dark:hover:border-slate-700 transition-all">
      <div className="space-y-3 flex-1">
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              {project.category}
            </span>
            <Badge
              size="sm"
              variant={
                project.difficulty === "Beginner"
                  ? "success"
                  : project.difficulty === "Intermediate"
                    ? "warning"
                    : "danger"
              }>
              {project.difficulty}
            </Badge>
          </div>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {project.estimatedTime}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
          {project.title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {project.description}
        </p>

        {/* Architecture Flow Box */}
        <div className="p-3 rounded-xl bg-slate-900 text-slate-200 text-xs font-mono border border-slate-800">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold mb-1.5 text-[11px] uppercase tracking-wider">
            <Network className="w-3.5 h-3.5" />
            Deployment Architecture:
          </div>
          <p className="text-slate-300 leading-relaxed break-words">
            {project.architecture}
          </p>
        </div>

        {/* Learning Objectives */}
        <div className="space-y-1.5 pt-1">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Key Learning Objectives:
          </div>
          <ul className="space-y-1">
            {project.learningObjectives.map((obj, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Expand / Collapse Button */}
      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-1.5 flex-wrap">
          {project.awsServices.map((svc) => (
            <span
              key={svc}
              className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 font-mono text-slate-600 dark:text-slate-400">
              <Cloud className="w-3 h-3 text-amber-500" />
              {svc}
            </span>
          ))}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors">
          <span>{expanded ? "Hide Steps" : "Step-by-Step Guide"}</span>
          {expanded ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Expanded Walkthrough & Pros/Cons */}
      {expanded && (
        <div className="mt-4 pt-4 border-t border-dashed border-slate-200 dark:border-slate-800 space-y-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              <ListOrdered className="w-3.5 h-3.5 text-amber-500" />
              <span>Step-by-Step Implementation Steps:</span>
            </div>
            <ol className="space-y-2 text-xs text-slate-700 dark:text-slate-300 list-decimal list-inside pl-1">
              {project.steps.map((step, i) => (
                <li key={i} className="leading-relaxed pl-1">
                  <span className="font-medium">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-800/30">
              <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Architecture Advantages:</span>
              </div>
              <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                {project.pros.map((p, i) => (
                  <li key={i}>• {p}</li>
                ))}
              </ul>
            </div>

            <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/20 border border-rose-200/50 dark:border-rose-800/30">
              <div className="flex items-center gap-1 text-xs font-bold text-rose-700 dark:text-rose-400 mb-1.5">
                <XCircle className="w-3.5 h-3.5" />
                <span>Trade-offs & Constraints:</span>
              </div>
              <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                {project.cons.map((c, i) => (
                  <li key={i}>• {c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
