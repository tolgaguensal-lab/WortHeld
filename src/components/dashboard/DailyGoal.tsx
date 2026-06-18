"use client";

import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { cn } from "@/lib/utils";

interface DailyGoalProps {
  current: number;
  target: number;
  className?: string;
}

export function DailyGoal({ current, target, className }: DailyGoalProps) {
  const percent = Math.min(100, Math.round((current / target) * 100));

  const motivationalText = percent >= 100
    ? "Ziel erreicht!"
    : percent >= 70
      ? "Fast geschafft!"
      : percent >= 30
        ? "Gut dabei!"
        : "Leg los!";

  const textColor = percent >= 100
    ? "text-success"
    : percent >= 70
      ? "text-primary"
      : "text-muted-foreground";

  return (
    <Card variant="elevated" className={cn("p-5", className)}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-foreground">Tagesziel</h4>
        <span className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">{current}</span> / {target} XP
        </span>
      </div>

      <ProgressBar value={percent} size="lg" showLabel={false} />

      <p className={cn("text-xs mt-2 font-medium", textColor)}>
        {percent >= 100 ? "🎉 " : ""}{motivationalText}
        {percent < 100 && ` — noch ${target - current} XP`}
      </p>
    </Card>
  );
}
