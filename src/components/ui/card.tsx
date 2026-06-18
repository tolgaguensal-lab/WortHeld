import * as React from "react";
import { cn } from "@/lib/utils";

type CardVariant = "default" | "elevated" | "outline" | "paper" | "dark" | "glass";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

const cardStyles: Record<CardVariant, string> = {
  default: "rounded-2xl bg-card text-card-foreground shadow-[0_1px_3px_0_rgb(0_0_0/0.04)]",
  elevated: "rounded-2xl bg-card-elevated text-card-foreground shadow-[0_2px_8px_0_rgb(0_0_0/0.06)]",
  outline: "rounded-2xl border border-border bg-transparent text-card-foreground",
  paper: "rounded-2xl border border-border/50 bg-card text-card-foreground",
  dark: "rounded-2xl bg-dark-card text-dark-text shadow-[0_1px_3px_0_rgb(0_0_0/0.15)]",
  glass: "rounded-2xl border border-border/30 bg-background/70 backdrop-blur-xl text-card-foreground",
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, variant = "default", ...props }, ref) => (
  <div ref={ref} className={cn(cardStyles[variant], className)} {...props} />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight font-display", className)} {...props} />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
