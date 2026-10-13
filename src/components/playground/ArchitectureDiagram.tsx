"use client";

import React from "react";
import { ARCHITECTURE_STEPS } from "@/data/architectureSteps";
import {
  Code,
  Cpu,
  FolderArchive,
  Database,
  Globe2,
  Monitor,
  ArrowRight,
} from "lucide-react";

interface ArchitectureDiagramProps {
  selectedStepId: string;
  onSelectStep: (id: string) => void;
}

export function ArchitectureDiagram({
  selectedStepId,
  onSelectStep,
}: ArchitectureDiagramProps) {
  const getIcon = (id: string) => {
    switch (id) {
      case "developer":
        return <Code className="w-5 h-5" />;
      case "nextjs-build":
        return <Cpu className="w-5 h-5" />;
      case "static-export":
        return <FolderArchive className="w-5 h-5" />;
      case "amazon-s3":
        return <Database className="w-5 h-5" />;
      case "cloudfront-cdn":
        return <Globe2 className="w-5 h-5" />;
      case "browser":
        return <Monitor className="w-5 h-5" />;
      default:
        return <Code className="w-5 h-5" />;
    }
  };

  return (
    <div className="w-full bg-slate-900 rounded-2xl p-5 sm:p-6 text-white border border-slate-800 shadow-xl overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h3 className="text-base sm:text-lg font-bold flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            Static Next.js Deployment Pipeline
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Click on any phase to inspect its architectural role, files, and AWS
            operations.
          </p>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-amber-400 border border-slate-700 w-fit">
          Zero Runtime Server Required
        </span>
      </div>

      {/* Pipeline Visual Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 relative">
        {ARCHITECTURE_STEPS.map((step, index) => {
          const isSelected = selectedStepId === step.id;
          return (
            <div key={step.id} className="relative flex flex-col">
              <button
                onClick={() => onSelectStep(step.id)}
                className={`flex-1 p-3.5 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? "bg-amber-500/10 border-amber-400 text-white ring-2 ring-amber-400/30 shadow-lg shadow-amber-500/10"
                    : "bg-slate-800/80 border-slate-700/80 hover:bg-slate-800 hover:border-slate-600 text-slate-300"
                }`}>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div
                    className={`p-2 rounded-lg ${
                      isSelected
                        ? "bg-amber-500 text-slate-950 font-bold"
                        : "bg-slate-700 text-slate-300"
                    }`}>
                    {getIcon(step.id)}
                  </div>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      isSelected
                        ? "bg-amber-400/20 text-amber-300 font-bold"
                        : "bg-slate-900 text-slate-400"
                    }`}>
                    #{step.stepNumber}
                  </span>
                </div>

                <div>
                  <h4
                    className={`text-xs sm:text-sm font-bold leading-tight ${
                      isSelected ? "text-amber-300" : "text-white"
                    }`}>
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                    {step.subtitle}
                  </p>
                </div>
              </button>

              {/* Arrow Indicator for Desktop */}
              {index < ARCHITECTURE_STEPS.length - 1 && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-600">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Architecture Data Flow Explanation Note */}
      <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-300">Flow:</span>
          <span>
            Local Code → Static Compiler (`out/`) → S3 Storage → CloudFront
            Global Edge → Browser
          </span>
        </div>
        <div className="font-mono text-[11px] text-amber-400/90">
          output: &apos;export&apos; + trailingSlash: true
        </div>
      </div>
    </div>
  );
}
