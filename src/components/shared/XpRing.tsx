"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface XpRingProps {
  percent: number
  levelCode: string
  size?: "sm" | "md" | "lg"
  className?: string
}

export function XpRing({
  percent = 0,
  levelCode,
  size = "md",
  className,
}: XpRingProps) {
  const sizeMap = {
    sm: { container: 56, stroke: 4, radius: 24 },
    md: { container: 80, stroke: 6, radius: 34 },
    lg: { container: 120, stroke: 8, radius: 54 },
  }

  const { container, stroke, radius } = sizeMap[size]
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference

  return (
    <div 
      className={cn("relative flex items-center justify-center", className)} 
      style={{ width: container, height: container }}
    >
      <svg 
        width={container} 
        height={container} 
        className="transform -rotate-90"
      >
        {/* Background Circle */}
        <circle
          cx={container / 2}
          cy={container / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={stroke}
          fill="transparent"
          className="text-secondary"
        />
        {/* Progress Circle */}
        <circle
          cx={container / 2}
          cy={container / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={stroke}
          fill="transparent"
          strokeDasharray={circumference}
          style={{ strokeDashoffset: offset }}
          strokeLinecap="round"
          className="text-primary transition-[stroke-dashoffset] duration-800 ease-out"
        />
      </svg>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
        <span className="font-display font-bold text-foreground">
          {Math.round(percent)}%
        </span>
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {levelCode}
        </span>
      </div>
    </div>
  )
}
