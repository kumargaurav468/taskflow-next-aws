"use client";

import React from "react";
import { ARCHITECTURE_STEPS } from "@/data/architectureSteps";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { TerminalSnippet } from "./TerminalSnippet";
import {
  FileCode,
  CheckCircle2,
  Terminal,
  ExternalLink,
  HelpCircle,
  Lightbulb,
} from "lucide-react";

interface StepExplanationProps {
  stepId: string;
}

export function StepExplanation({ stepId }: StepExplanationProps) {
  const step =
    ARCHITECTURE_STEPS.find((s) => s.id === stepId) || ARCHITECTURE_STEPS[0];

  return (
    <Card className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="orange" size="sm">
              Step {step.stepNumber} of {ARCHITECTURE_STEPS.length}
            </Badge>
            <span className="text-xs font-semibold text-slate-400">
              {step.subtitle}
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            {step.title}
          </h3>
        </div>
        <div className="px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/40 text-xs font-medium">
          {step.role}
        </div>
      </div>

      {/* Description in simple beginner-friendly language */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
          What Happens Here? (In Simple Terms)
        </h4>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-xl border border-slate-200/70 dark:border-slate-700/60">
          {step.description}
        </p>
      </div>

      {/* Key Artifacts & Output */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
          <FileCode className="w-3.5 h-3.5 text-amber-500" />
          Key Files & Artifacts Involved:
        </h4>
        <div className="flex items-center gap-2 flex-wrap">
          {step.keyArtifacts.map((art, i) => (
            <span
              key={i}
              className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
              {art}
            </span>
          ))}
        </div>
      </div>

      {/* Terminal Commands */}
      {step.terminalCommands && step.terminalCommands.length > 0 && (
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-amber-500" />
            Relevant Terminal Commands:
          </h4>
          <div className="space-y-1.5">
            {step.terminalCommands.map((cmd, i) => (
              <TerminalSnippet key={i} command={cmd} />
            ))}
          </div>
        </div>
      )}

      {/* AWS Console Action (if applicable) */}
      {step.awsConsoleAction && (
        <div className="p-3.5 rounded-xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200/60 dark:border-sky-800/40 text-xs">
          <div className="font-bold text-sky-800 dark:text-sky-300 flex items-center gap-1.5 mb-1">
            <ExternalLink className="w-3.5 h-3.5" />
            AWS Management Console Path:
          </div>
          <p className="text-slate-700 dark:text-slate-300 font-mono">
            {step.awsConsoleAction}
          </p>
        </div>
      )}

      {/* Best Practices */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
          Deployment Mentor Best Practices:
        </h4>
        <ul className="space-y-2">
          {step.bestPractices.map((bp, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
              <span>{bp}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
