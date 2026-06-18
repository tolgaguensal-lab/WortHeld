"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XpRing } from "@/components/shared/XpRing";
import { Lock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModuleCardProps {
  levelCode: string;
  levelName: string;
  moduleCount: number;
  progressPercent: number;
  href: string;
  locked?: boolean;
  className?: string;
}

export function ModuleCard({ levelCode, levelName, moduleCount, progressPercent, href, locked, className }: ModuleCardProps) {
  return (
    <Card variant="default" className={cn("p-6 relative min-h-[200px] flex flex-col justify-between", locked && "opacity-60", className)}>
      {locked && (
        <div className="absolute inset-0 bg-background/50 rounded-2xl z-10 flex items-center justify-center">
          <Lock size={24} className="text-muted-foreground" />
        </div>
      )}

      <div>
        <div className="text-3xl font-display font-bold text-primary mb-1">{levelCode}</div>
        <div className="text-lg font-semibold text-foreground">{levelName}</div>
        <div className="text-sm text-muted-foreground mt-0.5">{moduleCount} Module</div>
      </div>

      <div className="flex items-end justify-between mt-4">
        <XpRing percent={progressPercent} levelCode={levelCode} size="sm" />
        {!locked && (
          <Link href={href}>
            <Button variant="primary" size="sm">
              Starten
              <ArrowRight size={14} className="ml-1" />
            </Button>
          </Link>
        )}
      </div>
    </Card>
  );
}
