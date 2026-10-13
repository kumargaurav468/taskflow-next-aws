"use client";

import React, { useState } from "react";
import {
  Menu,
  Sun,
  Moon,
  Globe,
  RotateCcw,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useLearning } from "@/context/LearningContext";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import Link from "next/link";

interface HeaderProps {
  onMobileMenuToggle: () => void;
}

export function Header({ onMobileMenuToggle }: HeaderProps) {
  const { theme, toggleTheme, isMounted } = useTheme();
  const { resetToSampleData } = useLearning();
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleConfirmReset = () => {
    resetToSampleData();
    setResetSuccess(true);
    setTimeout(() => {
      setResetSuccess(false);
      setShowResetModal(false);
    }, 1200);
  };

  return (
    <>
      <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between">
        {/* Left Section: Mobile Menu + Architecture Badge */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMobileMenuToggle}
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
            aria-label="Open mobile menu">
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 text-xs font-medium text-slate-700 dark:text-slate-300">
            <Globe className="w-3.5 h-3.5 text-sky-500 shrink-0" />
            <span>Target AWS Region:</span>
            <span className="font-semibold text-slate-900 dark:text-white">
              Global (CloudFront + S3 us-east-1)
            </span>
          </div>
        </div>

        {/* Right Section: Status Pills & Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick link to Deployment Playground */}
          <Link
            href="/playground"
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition-colors">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Deployment Guide</span>
          </Link>

          {/* Reset Demo Data Button */}
          <button
            onClick={() => setShowResetModal(true)}
            title="Reset sample progress and tasks"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Reset sample data">
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Dark / Light Mode Switch */}
          {isMounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>
          )}

          {/* User AWS Profile Simulator */}
          <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-slate-200 dark:border-slate-800">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
              AWS
            </div>
            <div className="hidden xl:block text-left">
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-tight">
                Cloud Learner
              </p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-tight">
                Self-Hosted Static
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Reset Confirmation Modal */}
      <Modal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        title="Reset Learning Dashboard Data"
        maxWidth="sm">
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            This will reset all roadmap module statuses, custom learning tasks,
            and deployment checklist items stored in your browser&apos;s
            LocalStorage back to their default sample data.
          </p>

          <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-lg text-xs text-amber-800 dark:text-amber-300">
            <strong>Note:</strong> All data is stored in your client browser
            (LocalStorage). Zero database or server changes will be made on AWS.
          </div>

          {resetSuccess ? (
            <div className="p-2 text-center text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              ✓ Successfully restored initial sample data!
            </div>
          ) : (
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowResetModal(false)}>
                Cancel
              </Button>
              <Button variant="danger" size="sm" onClick={handleConfirmReset}>
                Reset to Defaults
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
