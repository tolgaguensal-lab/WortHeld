"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  trend?: { value: string; positive: boolean };
  className?: string;
}

export function StatCard({ icon, value, label, trend, className }: StatCardProps) {
  return (
    <Card variant="elevated" className={cn("p-5 relative overflow-hidden", className)}>
      <div className="absolute top-3 right-3 text-primary/15">{icon}</div>
      <div className="relative space-y-1">
        <div className="text-3xl font-display font-bold text-foreground">{value}</div>
        <div className="text-xs text-muted-foreground uppercase tracking-wider">{label}</div>
        {trend && (
          <div className={cn("flex items-center gap-1 text-xs font-medium", trend.positive ? "text-success" : "text-destructive")}>
            {trend.positive ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
            {trend.value}
          </div>
        )}
      </div>
    </Card>
  );
}
