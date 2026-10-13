"use client";

import React, { useState } from "react";
import { AWSConcept } from "@/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  Cloud,
  CheckCircle2,
  Compass,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Tag,
  Zap,
} from "lucide-react";

interface ConceptCardProps {
  concept: AWSConcept;
}

export function ConceptCard({ concept }: ConceptCardProps) {
  const [expanded, setExpanded] = useState(false);

  const categoryVariants = {
    Storage: "warning",
    CDN: "info",
    Compute: "orange",
    Security: "danger",
    Hosting: "purple",
    Networking: "default",
  } as const;

  return (
    <Card className="flex flex-col h-full hover:border-slate-300 dark:hover:border-slate-700 transition-all">
      <div className="space-y-3 flex-1">
        {/* Header */}
        <div className="flex items-center justify-between gap-2">
          <Badge
            size="sm"
            variant={categoryVariants[concept.category] || "default"}>
            {concept.category}
          </Badge>
          <span className="text-[11px] font-mono text-slate-400">
            {concept.fullName}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Cloud className="w-5 h-5 text-amber-500 shrink-0" />
          <span>{concept.name}</span>
        </h3>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {concept.summary}
        </p>

        {/* Practical Example Box */}
        <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30 text-xs">
          <div className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5 mb-1 text-[11px] uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            CloudTrack Practical Example:
          </div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            {concept.practicalExample}
          </p>
        </div>

        {/* Key Features */}
        <div className="space-y-1.5 pt-1">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Core Features:
          </div>
          <ul className="space-y-1">
            {concept.keyFeatures.map((feat, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Expand / Details Toggle */}
      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
          <Tag className="w-3 h-3 text-amber-500" />
          <span>Best for: {concept.idealFor}</span>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors">
          <span>{expanded ? "Hide Details" : "Console & Cost"}</span>
          {expanded ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Expanded Console Path & Cost Notes */}
      {expanded && (
        <div className="mt-4 pt-4 border-t border-dashed border-slate-200 dark:border-slate-800 space-y-3">
          <div className="p-3 rounded-lg bg-slate-900 text-slate-200 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-sky-400 font-bold mb-1 text-[11px] uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              AWS Console Path:
            </div>
            <p className="text-slate-300">{concept.awsConsolePath}</p>
          </div>

          <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-800/30 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-400 font-bold mb-1 text-[11px] uppercase tracking-wider">
              <DollarSign className="w-3.5 h-3.5" />
              AWS Free Tier & Cost Architecture:
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              {concept.costNotes}
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}
