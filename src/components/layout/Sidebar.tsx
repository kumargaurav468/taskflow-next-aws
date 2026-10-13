"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Compass,
  Layers,
  Terminal,
  BookOpen,
  Cloud,
  CheckCircle2,
  HardDriveDownload,
} from "lucide-react";
import { useLearning } from "@/context/LearningContext";
import { ProgressBar } from "@/components/ui/ProgressBar";

interface SidebarProps {
  onItemClick?: () => void;
}

const NAV_ITEMS = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    name: "AWS Roadmap",
    href: "/roadmap",
    icon: Compass,
    badge: "11 Modules",
  },
  {
    name: "Deployment Projects",
    href: "/projects",
    icon: Layers,
    badge: "4 Projects",
  },
  {
    name: "Deployment Playground",
    href: "/playground",
    icon: Terminal,
    badge: "Interactive",
  },
  {
    name: "AWS Concepts",
    href: "/concepts",
    icon: BookOpen,
    badge: null,
  },
];

export function Sidebar({ onItemClick }: SidebarProps) {
  const pathname = usePathname();
  const { progressPercentage, completedModules, totalModules } = useLearning();

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0 select-none">
      {/* Brand Logo */}
      <div className="p-5 border-b border-slate-100 dark:border-slate-800/80">
        <Link
          href="/"
          onClick={onItemClick}
          className="flex items-center gap-3 group focus:outline-none">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Cloud className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">
                CloudTrack
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                AWS
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Deployment Mentor
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500">
          Navigation
        </div>
        {NAV_ITEMS.map((item) => {
          const active = isLinkActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onItemClick}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                active
                  ? "bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 font-semibold shadow-xs border border-amber-200/60 dark:border-amber-800/40"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white"
              }`}>
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    active
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200"
                  }`}
                />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                    active
                      ? "bg-amber-200/80 dark:bg-amber-900/60 text-amber-950 dark:text-amber-200"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                  }`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Learning Progress Widget */}
      <div className="p-4 mx-3 mb-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
            Roadmap Progress
          </span>
          <span className="font-bold text-amber-600 dark:text-amber-400">
            {progressPercentage}%
          </span>
        </div>
        <ProgressBar progress={progressPercentage} size="sm" color="amber" />
        <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
          {completedModules} of {totalModules} modules completed
        </p>
      </div>

      {/* Static Hosting Status Footer */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex items-start gap-2.5">
          <div className="p-1.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 shrink-0">
            <HardDriveDownload className="w-3.5 h-3.5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              S3 + CloudFront Ready
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
              Static export build (`out/`) with client LocalStorage persistence.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
