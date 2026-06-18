"use client"

import React from "react"
import { CheckCircle2, XCircle, Info, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

type FeedbackType = "success" | "error" | "info" | "warning"

interface FeedbackCardProps {
  type: FeedbackType
  title: string
  message: string
  className?: string
}

const typeConfigs = {
  success: {
    bg: "bg-success-muted",
    border: "border-success",
    text: "text-success",
    icon: CheckCircle2,
  },
  error: {
    bg: "bg-destructive-muted",
    border: "border-destructive",
    text: "text-destructive",
    icon: XCircle,
  },
  info: {
    bg: "bg-info-muted",
    border: "border-info",
    text: "text-info",
    icon: Info,
  },
  warning: {
    bg: "bg-warning-muted",
    border: "border-warning",
    text: "text-warning",
    icon: AlertTriangle,
  },
}

export function FeedbackCard({ type, title, message, className }: FeedbackCardProps) {
  const config = typeConfigs[type]
  const Icon = config.icon

  return (
    <div 
      className={cn(
        "flex items-start gap-4 p-4 rounded-2xl border",
        config.bg,
        config.border,
        className
      )}
    >
      <Icon className={cn("size-5 shrink-0 mt-0.5", config.text)} />
      <div className="flex flex-col gap-1">
        <h4 className={cn("font-semibold text-sm", config.text)}>
          {title}
        </h4>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {message}
        </p>
      </div>
    </div>
  )
}
