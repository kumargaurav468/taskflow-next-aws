"use client";

import React from "react";
import { Search } from "lucide-react";
import { ModuleStatus } from "@/types";

interface RoadmapFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: "all" | ModuleStatus;
  onStatusFilterChange: (status: "all" | ModuleStatus) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

export function RoadmapFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  selectedCategory,
  onCategoryChange,
  categories,
}: RoadmapFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search modules, concepts, or AWS services..."
          className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Category Dropdown */}
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="text-xs sm:text-sm py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500">
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Status Pill Filter */}
        <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800/80 p-1 border border-slate-200/80 dark:border-slate-700/80 text-xs">
          <button
            onClick={() => onStatusFilterChange("all")}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              statusFilter === "all"
                ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-semibold shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}>
            All
          </button>
          <button
            onClick={() => onStatusFilterChange("completed")}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              statusFilter === "completed"
                ? "bg-emerald-600 text-white font-semibold shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}>
            Completed
          </button>
          <button
            onClick={() => onStatusFilterChange("in-progress")}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              statusFilter === "in-progress"
                ? "bg-amber-500 text-slate-950 font-semibold shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}>
            In Progress
          </button>
          <button
            onClick={() => onStatusFilterChange("not-started")}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              statusFilter === "not-started"
                ? "bg-slate-700 text-white font-semibold shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}>
            Not Started
          </button>
        </div>
      </div>
    </div>
  );
}
