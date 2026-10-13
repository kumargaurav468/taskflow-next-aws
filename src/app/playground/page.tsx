"use client";

import React, { useState } from "react";
import { ArchitectureDiagram } from "@/components/playground/ArchitectureDiagram";
import { StepExplanation } from "@/components/playground/StepExplanation";
import { DeploymentChecklist } from "@/components/playground/DeploymentChecklist";
import { TerminalSnippet } from "@/components/playground/TerminalSnippet";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  Terminal,
  HelpCircle,
  FolderTree,
  FileCheck2,
  AlertCircle,
  Copy,
} from "lucide-react";

export default function PlaygroundPage() {
  const [selectedStepId, setSelectedStepId] = useState("developer");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="p-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Terminal className="w-5 h-5" />
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            AWS Deployment Playground
          </h1>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Explore how Next.js transforms into static files and flows through
          Amazon S3 and CloudFront into the browser.
        </p>
      </div>

      {/* Interactive Architecture Diagram */}
      <ArchitectureDiagram
        selectedStepId={selectedStepId}
        onSelectStep={setSelectedStepId}
      />

      {/* Step Explanation & Quick Commands */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <StepExplanation stepId={selectedStepId} />
        </div>

        {/* Directory Structure & Essential Commands Helper */}
        <div className="space-y-6">
          <Card>
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white mb-2">
              <FolderTree className="w-4 h-4 text-amber-500" />
              <span>Generated `out/` Directory Anatomy</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              With{" "}
              <code className="text-amber-600 dark:text-amber-400 font-mono text-xs">
                trailingSlash: true
              </code>
              , Next.js generates static folder indices:
            </p>
            <div className="p-3 bg-slate-950 text-slate-200 font-mono text-[11px] rounded-lg border border-slate-800 space-y-1">
              <div className="text-amber-400">out/</div>
              <div className="pl-3">├── 404.html</div>
              <div className="pl-3">
                ├── index.html{" "}
                <span className="text-slate-500">(Dashboard)</span>
              </div>
              <div className="pl-3">├── roadmap/</div>
              <div className="pl-6 text-emerald-400">└── index.html</div>
              <div className="pl-3">├── projects/</div>
              <div className="pl-6 text-emerald-400">└── index.html</div>
              <div className="pl-3">├── playground/</div>
              <div className="pl-6 text-emerald-400">└── index.html</div>
              <div className="pl-3">├── concepts/</div>
              <div className="pl-6 text-emerald-400">└── index.html</div>
              <div className="pl-3">
                └── _next/{" "}
                <span className="text-slate-500">(JS & CSS assets)</span>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white mb-2">
              <FileCheck2 className="w-4 h-4 text-emerald-500" />
              <span>Core Terminal Deployment Workflow</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
              The 3 commands to test, sync, and deploy updates:
            </p>
            <div className="space-y-2">
              <TerminalSnippet
                command="npm run build"
                title="1. Compile static files"
                description="Generates out/ directory"
              />
              <TerminalSnippet
                command="aws s3 sync out/ s3://my-bucket --delete"
                title="2. Sync assets to private S3"
                description="Uploads files safely"
              />
              <TerminalSnippet
                command='aws cloudfront create-invalidation --distribution-id <ID> --paths "/*"'
                title="3. Invalidate CDN cache"
                description="Refreshes worldwide edges"
              />
            </div>
          </Card>
        </div>
      </div>

      {/* Deployment Readiness Checklist */}
      <DeploymentChecklist />
    </div>
  );
}
