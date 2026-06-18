"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface ProgressBarProps {
  value: number
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
  className?: string
}

export function ProgressBar({
  value = 0,
  size = "md",
  showLabel = false,
  className,
}: ProgressBarProps) {
  const sizeMap = {
    sm: "h-1",
    md: "h-1.5",
    lg: "h-2.5",
  }

  const clampedValue = Math.min(Math.max(value, 0), 100)

  return (
    <div className={cn("flex items-center gap-3 w-full", className)}>
      <div className={cn("flex-1 bg-secondary rounded-full overflow-hidden", sizeMap[size])}>
        <div 
          className={cn(
            "bg-primary h-full rounded-full transition-all duration-500 ease-out",
          )} 
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-muted-foreground tabular-nums min-w-[3ch] text-right">
          {Math.round(clampedValue)}%
        </span>
      )}
    </div>
  )
}
