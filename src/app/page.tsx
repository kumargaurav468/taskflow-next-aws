"use client";

import React from "react";
import { useLearning } from "@/context/LearningContext";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { ProgressOverview } from "@/components/dashboard/ProgressOverview";
import { TaskManager } from "@/components/dashboard/TaskManager";
import { RecentActivityList } from "@/components/dashboard/RecentActivityList";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Layers,
  Percent,
  Sparkles,
  Cloud,
  ArrowRight,
  ServerOff,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const {
    totalTopics,
    completedTopicsEstimated,
    inProgressModules,
    progressPercentage,
  } = useLearning();

  return (
    <div className="space-y-6">
      {/* Mentor Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 p-6 text-white border border-slate-800 shadow-lg">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              AWS Deployment Mentor • Welcome to CloudTrack
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Master Next.js Static Deployment on AWS
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Learn how to package Next.js with{" "}
              <code className="bg-slate-800 px-1.5 py-0.5 rounded text-amber-400 font-mono text-xs">
                output: &apos;export&apos;
              </code>{" "}
              and host it serverlessly on{" "}
              <strong className="text-white">Amazon S3</strong> and{" "}
              <strong className="text-white">Amazon CloudFront</strong> with
              zero recurring EC2 server costs.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <Link
              href="/playground"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs sm:text-sm font-bold shadow-md transition-all hover:scale-102">
              <Terminal className="w-4 h-4" />
              <span>Interactive Pipeline</span>
            </Link>
            <Link
              href="/roadmap"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-white text-xs sm:text-sm font-semibold border border-slate-700 transition-all">
              <span>Explore Roadmap</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Metrics Row (5 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <MetricCard
          title="Total AWS Topics"
          value={totalTopics}
          subtitle="Across 11 cloud modules"
          icon={<BookOpen className="w-5 h-5" />}
          color="slate"
        />

        <MetricCard
          title="Topics Completed"
          value={completedTopicsEstimated}
          subtitle="Foundations & Security"
          icon={<CheckCircle2 className="w-5 h-5" />}
          color="emerald"
        />

        <MetricCard
          title="Modules In Progress"
          value={inProgressModules}
          subtitle="S3, CloudFront & Next.js"
          icon={<Clock className="w-5 h-5" />}
          color="amber"
        />

        <MetricCard
          title="Deployment Projects"
          value="4"
          subtitle="S3, Amplify & ECS"
          icon={<Layers className="w-5 h-5" />}
          color="sky"
        />

        <MetricCard
          title="Curriculum Progress"
          value={`${progressPercentage}%`}
          subtitle="Towards AWS readiness"
          icon={<Percent className="w-5 h-5" />}
          color="purple"
        />
      </div>

      {/* Visual Curriculum Progress Overview */}
      <ProgressOverview />

      {/* Middle Section: Personal Tasks & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TaskManager />
        </div>
        <div className="lg:col-span-1">
          <RecentActivityList />
        </div>
      </div>

      {/* Architecture Learning Callout */}
      <Card className="bg-slate-900 text-white border-slate-800 p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2">
              <ServerOff className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white">
                Why Static Export with LocalStorage on AWS?
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              CloudTrack runs without an expensive Node.js runtime server or
              database. By using{" "}
              <code className="text-amber-300 font-mono bg-slate-800 px-1 py-0.5 rounded">
                output: &apos;export&apos;
              </code>{" "}
              and client-side{" "}
              <span className="text-white font-medium">LocalStorage</span>, your
              application is 100% immune to server crashes, requires zero
              maintenance, costs almost nothing on AWS S3 &amp; CloudFront, and
              updates state instantly for the user!
            </p>
          </div>

          <Link
            href="/concepts"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-amber-400 border border-slate-700 shrink-0 transition-colors">
            <span>Compare Static vs SSR</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </Card>
    </div>
  );
}
