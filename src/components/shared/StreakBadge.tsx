"use client"

import React from "react"
import { Flame, Gem } from "lucide-react"
import { cn } from "@/lib/utils"

interface StreakBadgeProps {
  days: number
  className?: string
}

export function StreakBadge({ days, className }: StreakBadgeProps) {
  const isGhost = days === 0
  
  const getIcon = () => {
    if (days >= 100) return <Gem className="size-3.5" />
    if (days >= 30) return (
      <div className="flex items-center -space-x-1">
        <Flame className="size-3.5" />
        <Flame className="size-3.5" />
      </div>
    )
    if (days >= 7) return <Flame className="size-3.5 text-accent" />
    return <Flame className="size-3.5" />
  }

  return (
    <div 
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-full h-7 px-3 font-semibold text-sm transition-colors",
        isGhost 
          ? "bg-muted text-muted-foreground" 
          : "bg-accent/10 text-accent",
        className
      )}
    >
      {getIcon()}
      <span>{days} Tage</span>
    </div>
  )
}
