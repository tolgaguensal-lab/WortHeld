"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  description?: string
  children?: React.ReactNode
  className?: string
}

export function PageHeader({
  title,
  description,
  children,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn("flex items-center justify-between border-b border-border pb-6 mb-8", className)}>
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-display font-bold text-foreground">
          {title}
        </h1>
        {description && (
          <p className="text-muted-foreground font-body text-sm">
            {description}
          </p>
        )}
      </div>
      <div className="flex items-center gap-3">
        {children}
      </div>
    </header>
  )
}
