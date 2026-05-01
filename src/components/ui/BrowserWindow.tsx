import { cn } from "@/lib/utils";
import React from "react";

interface BrowserWindowProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  url?: string;
}

export default function BrowserWindow({ children, className, title, url }: BrowserWindowProps) {
  return (
    <div className={cn("group overflow-hidden rounded-xl border border-white/10 bg-zinc-950/50 shadow-2xl transition-all duration-500 hover:border-blue-500/30 hover:shadow-blue-500/10", className)}>
      {/* Browser Header */}
      <div className="flex items-center justify-between border-b border-white/5 bg-zinc-900/80 px-4 py-2">
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500/40 group-hover:bg-red-500/80 transition-colors" />
          <div className="h-2.5 w-2.5 rounded-full bg-amber-500/40 group-hover:bg-amber-500/80 transition-colors" />
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/40 group-hover:bg-emerald-500/80 transition-colors" />
        </div>
        
        {/* Address Bar */}
        <div className="mx-4 flex h-6 flex-1 items-center justify-center rounded-md bg-zinc-950/50 px-3 text-[10px] text-white/20 transition-colors group-hover:text-white/40 group-hover:bg-zinc-950/80">
          <div className="truncate font-mono tracking-tighter">
            {url || "https://adytia.dev/workspace"}
          </div>
        </div>

        {/* Action Menu (dots) */}
        <div className="flex gap-1">
          <div className="h-1 w-1 rounded-full bg-white/10" />
          <div className="h-1 w-1 rounded-full bg-white/10" />
          <div className="h-1 w-1 rounded-full bg-white/10" />
        </div>
      </div>

      {/* Content Area */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
}
