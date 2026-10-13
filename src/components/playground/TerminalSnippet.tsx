"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

interface TerminalSnippetProps {
  command: string;
  title?: string;
  description?: string;
}

export function TerminalSnippet({
  command,
  title,
  description,
}: TerminalSnippetProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-100 font-mono text-xs my-2">
      {title && (
        <div className="flex items-center justify-between px-3.5 py-2 bg-slate-900 border-b border-slate-800 text-[11px] text-slate-400">
          <span>{title}</span>
          {description && (
            <span className="text-[10px] text-slate-500">{description}</span>
          )}
        </div>
      )}
      <div className="flex items-center justify-between p-3 gap-3">
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-amber-400 select-none">$</span>
          <span className="text-emerald-300 whitespace-pre">{command}</span>
        </div>
        <button
          onClick={handleCopy}
          className="shrink-0 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Copy command to clipboard"
          aria-label="Copy command">
          {copied ? (
            <Check className="w-4 h-4 text-emerald-400" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}
