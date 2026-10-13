"use client";

import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ARCHITECTURE_COMPARISONS } from "@/data/initialConcepts";
import {
  Scale,
  CheckCircle2,
  AlertTriangle,
  Database,
  Cpu,
} from "lucide-react";

export function ComparisonTable() {
  return (
    <div className="space-y-6">
      {/* Concept Deep Dive Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-amber-300 dark:border-amber-700/60 bg-amber-50/20 dark:bg-amber-950/10">
          <div className="flex items-center gap-2 mb-2 text-amber-700 dark:text-amber-400 font-bold text-sm">
            <Database className="w-4 h-4" />
            <span>Static Hosting Architecture (S3 + CloudFront)</span>
          </div>
          <h4 className="font-bold text-slate-900 dark:text-white text-base">
            What CloudTrack Uses: Next.js Static Export
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            All HTML, JavaScript, and CSS files are pre-built at build time
            (`npm run build`) into the `out/` folder. They sit dormant in Amazon
            S3 until requested. CloudFront caches and serves these files
            directly to users. <strong>Zero servers run 24/7</strong>.
          </p>
          <div className="mt-3 pt-3 border-t border-amber-200/60 dark:border-amber-800/40 text-xs font-semibold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Cost: Free or pennies/month • Complexity: Low • Security: Maximum
          </div>
        </Card>

        <Card className="border-sky-300 dark:border-sky-700/60 bg-sky-50/20 dark:bg-sky-950/10">
          <div className="flex items-center gap-2 mb-2 text-sky-700 dark:text-sky-400 font-bold text-sm">
            <Cpu className="w-4 h-4" />
            <span>
              Server-Side Rendering (SSR) Architecture (Amplify / ECS)
            </span>
          </div>
          <h4 className="font-bold text-slate-900 dark:text-white text-base">
            When Node.js Runs on Every Request
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            Every incoming HTTP request triggers a Node.js process on AWS (via
            AWS Amplify managed compute, AWS Lambda, or Amazon ECS Fargate). The
            server dynamically executes React Server Components, accesses
            database secrets, runs Server Actions, and sends HTML back.
          </p>
          <div className="mt-3 pt-3 border-t border-sky-200/60 dark:border-sky-800/40 text-xs font-semibold text-sky-800 dark:text-sky-300 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            Cost: $15 - $60+/month • Features: Full Next.js SSR & Server Actions
          </div>
        </Card>
      </div>

      {/* Side-by-Side Detailed Comparison Table */}
      <Card className="overflow-hidden p-0">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-amber-500" />
            <CardTitle>Architecture Decision Matrix: Static vs SSR</CardTitle>
          </div>
          <Badge variant="orange" size="sm">
            Production Trade-offs
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-4 w-1/4">Evaluation Aspect</th>
                <th className="p-4 w-1/3 text-amber-700 dark:text-amber-400">
                  Static Export (S3 + CloudFront)
                </th>
                <th className="p-4 w-1/3 text-sky-700 dark:text-sky-400">
                  Server-Side Rendering (Amplify / ECS)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {ARCHITECTURE_COMPARISONS.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-semibold text-slate-900 dark:text-slate-100 align-top">
                    <div>{row.feature}</div>
                    <div className="text-[11px] font-normal text-slate-400 mt-1">
                      {row.verdict}
                    </div>
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-300 align-top leading-relaxed">
                    {row.staticHosting}
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-300 align-top leading-relaxed">
                    {row.serverSideRendering}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
