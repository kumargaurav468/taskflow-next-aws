"use client";

import React, { useState } from "react";
import { INITIAL_PROJECTS } from "@/data/initialProjects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Card } from "@/components/ui/Card";
import { Layers, Rocket, Sparkles } from "lucide-react";
import { DifficultyLevel } from "@/types";

export default function ProjectsPage() {
  const [difficultyFilter, setDifficultyFilter] = useState<
    "All" | DifficultyLevel
  >("All");

  const filteredProjects = INITIAL_PROJECTS.filter((proj) => {
    if (difficultyFilter === "All") return true;
    return proj.difficulty === difficultyFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Layers className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              AWS Deployment Projects
            </h1>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-world architectures ranging from zero-server static hosting on
            S3 to fullstack Next.js SSR and Docker ECS.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800/80 p-1 border border-slate-200/80 dark:border-slate-700/80 text-xs shrink-0">
          {(["All", "Beginner", "Intermediate", "Advanced"] as const).map(
            (diff) => (
              <button
                key={diff}
                onClick={() => setDifficultyFilter(diff)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  difficultyFilter === diff
                    ? "bg-amber-500 text-slate-950 font-bold shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}>
                {diff}
              </button>
            ),
          )}
        </div>
      </div>

      {/* Featured Callout */}
      <Card className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-amber-300/60 dark:border-amber-700/50 p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-amber-500 text-slate-950 font-bold shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Primary Goal: Next.js Static Export on S3 & CloudFront
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
              This dashboard is designed to be built using{" "}
              <strong>Project #2</strong>. It teaches you how Next.js
              pre-renders every page into pure static assets that S3 can hold
              and CloudFront can deliver globally with Origin Access Control
              (OAC).
            </p>
          </div>
        </div>
      </Card>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
