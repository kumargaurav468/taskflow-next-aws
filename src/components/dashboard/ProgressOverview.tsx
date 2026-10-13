"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useLearning } from "@/context/LearningContext";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

export function ProgressOverview() {
  const {
    progressPercentage,
    completedModules,
    inProgressModules,
    notStartedModules,
    totalModules,
    totalTopics,
    completedTopicsEstimated,
  } = useLearning();

  return (
    <Card className="bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-900 dark:to-slate-900/60 border-slate-200/80 dark:border-slate-800">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Side: Summary and Progress bar */}
        <div className="space-y-4 flex-1">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Curriculum Mastery
            </span>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              AWS Deployment Readiness: {progressPercentage}%
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
              Track your progression from AWS foundations to zero-server Next.js
              static deployments on Amazon S3 and CloudFront.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
              <span>Overall Completion</span>
              <span className="font-bold text-slate-900 dark:text-white">
                {completedTopicsEstimated} / {totalTopics} Topics Estimated
              </span>
            </div>
            <ProgressBar
              progress={progressPercentage}
              size="md"
              color="amber"
            />
          </div>

          {/* Module Breakdown Counts */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-800/40">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Completed</span>
              </div>
              <p className="text-lg font-bold text-slate-900 dark:text-white">
                {completedModules}{" "}
                <span className="text-xs text-slate-400 font-normal">
                  / {totalModules}
                </span>
              </p>
            </div>

            <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-800/40">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1">
                <Clock className="w-3.5 h-3.5" />
                <span>In Progress</span>
              </div>
              <p className="text-lg font-bold text-slate-900 dark:text-white">
                {inProgressModules}{" "}
                <span className="text-xs text-slate-400 font-normal">
                  / {totalModules}
                </span>
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Not Started</span>
              </div>
              <p className="text-lg font-bold text-slate-900 dark:text-white">
                {notStartedModules}{" "}
                <span className="text-xs text-slate-400 font-normal">
                  / {totalModules}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Quick Action Card */}
        <div className="lg:w-72 p-4 rounded-xl bg-slate-900 text-white dark:bg-slate-800/90 border border-slate-800 dark:border-slate-700 space-y-3 shrink-0">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Next Action Recommended
          </div>
          <h4 className="font-semibold text-sm leading-snug">
            Configure S3 + CloudFront with Origin Access Control (OAC)
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Protect your S3 bucket from public internet exposure and route all
            requests through CloudFront.
          </p>
          <Link
            href="/roadmap"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 pt-1 group">
            <span>Open Roadmap Modules</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </Card>
  );
}
