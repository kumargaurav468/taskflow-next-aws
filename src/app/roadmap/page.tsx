"use client";

import React, { useState, useMemo } from "react";
import { useLearning } from "@/context/LearningContext";
import { RoadmapModuleCard } from "@/components/roadmap/RoadmapModuleCard";
import { RoadmapFilters } from "@/components/roadmap/RoadmapFilters";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Compass, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { ModuleStatus } from "@/types";

export default function RoadmapPage() {
  const {
    modules,
    updateModuleStatus,
    progressPercentage,
    completedModules,
    inProgressModules,
    notStartedModules,
    totalModules,
    isHydrated,
  } = useLearning();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | ModuleStatus>("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(modules.map((m) => m.category)));
  }, [modules]);

  // Filter modules
  const filteredModules = useMemo(() => {
    return modules.filter((m) => {
      // Search
      const matchesSearch =
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.awsServices.some((s) =>
          s.toLowerCase().includes(searchQuery.toLowerCase()),
        ) ||
        m.topics.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      // Status
      const matchesStatus = statusFilter === "all" || m.status === statusFilter;

      // Category
      const matchesCategory =
        selectedCategory === "all" || m.category === selectedCategory;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [modules, searchQuery, statusFilter, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Compass className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              AWS Learning Roadmap
            </h1>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track your mastery across 11 core AWS topics required for deploying
            web applications.
          </p>
        </div>

        {/* Status Counts Pill */}
        <div className="flex items-center gap-2 shrink-0">
          <Badge variant="success" size="md">
            {completedModules} Completed
          </Badge>
          <Badge variant="warning" size="md">
            {inProgressModules} In Progress
          </Badge>
          <Badge variant="neutral" size="md">
            {notStartedModules} Not Started
          </Badge>
        </div>
      </div>

      {/* Progress Card */}
      <Card className="p-4 bg-white dark:bg-slate-900">
        <div className="flex items-center justify-between text-xs sm:text-sm font-semibold mb-2">
          <span className="text-slate-700 dark:text-slate-300">
            Roadmap Completion: {completedModules} of {totalModules} Modules
            Done
          </span>
          <span className="text-amber-600 dark:text-amber-400 font-bold">
            {progressPercentage}%
          </span>
        </div>
        <ProgressBar progress={progressPercentage} size="md" color="amber" />
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
          Statuses are stored locally in your browser and automatically update
          your overall deployment score.
        </p>
      </Card>

      {/* Filter & Search Bar */}
      <RoadmapFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />

      {/* Modules List */}
      <div className="space-y-4">
        {!isHydrated ? (
          <div className="py-12 text-center text-sm text-slate-400">
            Loading roadmap modules...
          </div>
        ) : filteredModules.length === 0 ? (
          <Card className="py-12 text-center space-y-2">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
            <h4 className="text-base font-semibold text-slate-900 dark:text-white">
              No modules match your filter
            </h4>
            <p className="text-xs text-slate-500">
              Try adjusting your search terms or clearing status filters.
            </p>
          </Card>
        ) : (
          filteredModules.map((module) => (
            <RoadmapModuleCard
              key={module.id}
              module={module}
              onStatusChange={updateModuleStatus}
            />
          ))
        )}
      </div>
    </div>
  );
}
