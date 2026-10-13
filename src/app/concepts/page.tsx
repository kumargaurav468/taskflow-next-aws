"use client";

import React, { useState, useMemo } from "react";
import { AWS_CONCEPTS } from "@/data/initialConcepts";
import { ConceptCard } from "@/components/concepts/ConceptCard";
import { ComparisonTable } from "@/components/concepts/ComparisonTable";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  BookOpen,
  Search,
  Server,
  Database,
  Cloud,
  HardDrive,
  Info,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function ConceptsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = useMemo(() => {
    return ["all", ...Array.from(new Set(AWS_CONCEPTS.map((c) => c.category)))];
  }, []);

  const filteredConcepts = useMemo(() => {
    return AWS_CONCEPTS.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.practicalExample.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || c.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="p-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <BookOpen className="w-5 h-5" />
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            AWS Deployment Concepts &amp; Architecture
          </h1>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Master essential cloud infrastructure primitives: S3, CloudFront, IAM,
          EC2, Lambda, and Amplify.
        </p>
      </div>

      {/* Static vs SSR Comparison Matrix */}
      <div>
        <ComparisonTable />
      </div>

      {/* Crucial Concept Callout: LocalStorage & Static Export */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-5 bg-slate-900 text-white border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <HardDrive className="w-4 h-4" />
            <span>Where is Data Stored in this Application?</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            In CloudTrack, your roadmap progress, learning tasks, and completed
            checklist items are stored in your{" "}
            <strong>client browser&apos;s LocalStorage</strong>.
          </p>
          <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-slate-300">
            <strong>Key Benefit:</strong> Because all state is stored
            client-side, this Next.js app needs zero database servers, zero
            database credentials, and costs <strong>$0.00</strong> in AWS
            database charges.
          </div>
        </Card>

        <Card className="p-5 bg-slate-900 text-white border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
            <Info className="w-4 h-4" />
            <span>What Can and Cannot Run in Static Export?</span>
          </div>
          <div className="space-y-1.5 text-xs text-slate-300">
            <div className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supported:</strong> Pre-rendered HTML, Client
                Components, React Hooks (`useEffect`), CSS modules, Tailwind
                CSS, static assets.
              </span>
            </div>
            <div className="flex items-start gap-1.5">
              <XCircle className="w-3.5 h-3.5 text-rose-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unsupported:</strong> Dynamic Server-Side Rendering
                (`getServerSideProps`), API Routes (`/api/*`), Server Actions
                (`use server`), runtime `cookies()` or `headers()`.
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Services Breakdown Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              AWS Service Deep Dive
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select or search a service to view its role, practical usage, and
              AWS console paths.
            </p>
          </div>

          {/* Search & Category Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search concepts..."
                className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs py-1.5 px-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500">
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === "all" ? "All Categories" : c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Concept Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConcepts.map((concept) => (
            <ConceptCard key={concept.id} concept={concept} />
          ))}
        </div>
      </div>
    </div>
  );
}
