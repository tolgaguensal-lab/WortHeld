"use client";

import { cn } from "@/lib/utils";
import { Check, Lock } from "lucide-react";

interface TimelineStep {
  code: string;
  label: string;
  status: "completed" | "current" | "locked";
}

interface ProgressionTimelineProps {
  steps: TimelineStep[];
  className?: string;
}

export function ProgressionTimeline({ steps, className }: ProgressionTimelineProps) {
  return (
    <div className={cn("flex items-start justify-between", className)}>
      {steps.map((step, i) => (
        <div key={step.code} className="flex flex-col items-center flex-1 relative">
          {/* Connector line */}
          {i < steps.length - 1 && (
            <div
              className={cn(
                "absolute top-3 left-1/2 w-full h-0.5",
                step.status === "completed" ? "bg-primary" : "bg-border"
              )}
            />
          )}

          {/* Node */}
          <div
            className={cn(
              "relative z-10 w-6 h-6 rounded-full flex items-center justify-center",
              step.status === "completed" && "bg-primary",
              step.status === "current" && "border-2 border-primary bg-background animate-pulse-soft",
              step.status === "locked" && "bg-muted"
            )}
          >
            {step.status === "completed" && <Check size={12} className="text-primary-foreground" />}
            {step.status === "locked" && <Lock size={10} className="text-muted-foreground" />}
          </div>

          {/* Label */}
          <div className="mt-2 text-center">
            <div className={cn(
              "text-[10px] font-semibold uppercase tracking-wider",
              step.status === "completed" && "text-primary",
              step.status === "current" && "text-foreground",
              step.status === "locked" && "text-muted-foreground"
            )}>
              {step.code}
            </div>
            <div className={cn(
              "text-[9px] mt-0.5",
              step.status === "locked" ? "text-muted-foreground/50" : "text-muted-foreground"
            )}>
              {step.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
