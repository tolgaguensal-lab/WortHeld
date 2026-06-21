"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { VocabStep } from "./VocabStep";
import { GrammarStep } from "./GrammarStep";
import { ReadingStep } from "./ReadingStep";
import { WritingStep } from "./WritingStep";
import { TestStep } from "./TestStep";
import { ReviewStep } from "./ReviewStep";

interface Step {
  id: string;
  stepType: string;
  title: string;
  content: string;
  order: number;
  xpReward: number;
}

interface Props {
  steps: Step[];
  onComplete: () => void;
}

const stepIcons: Record<string, string> = {
  WORTSCHATZ: "📖",
  GRAMMATIK: "🔤",
  HOEREN: "🎧",
  LESEN: "📄",
  SCHREIBEN: "✍️",
  SPRECHEN: "🎤",
  MINI_GAME: "🎮",
  TEST: "📝",
  WIEDERHOLUNG: "🔄",
};

const stepColors: Record<string, string> = {
  WORTSCHATZ: "from-blue-500 to-blue-600",
  GRAMMATIK: "from-primary to-primary/80",
  HOEREN: "from-accent to-accent-hover",
  LESEN: "from-orange-500 to-orange-600",
  SCHREIBEN: "from-pink-500 to-pink-600",
  SPRECHEN: "from-teal-500 to-teal-600",
  MINI_GAME: "from-yellow-500 to-yellow-600",
  TEST: "from-red-500 to-red-600",
  WIEDERHOLUNG: "from-indigo-500 to-indigo-600",
};

export function LessonStepRenderer({ steps, onComplete }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  if (steps.length === 0) {
    onComplete();
    return null;
  }

  const step = steps[currentStep];
  const progress = (currentStep / steps.length) * 100;
  const isCompleted = completedSteps.has(currentStep);

  function markComplete() {
    const next = new Set(completedSteps);
    next.add(currentStep);
    setCompletedSteps(next);
    if (currentStep + 1 < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  }

  function renderStepContent() {
    switch (step.stepType) {
      case "WORTSCHATZ":
        return <VocabStep content={step.content} title={step.title} onComplete={markComplete} />;
      case "GRAMMATIK":
        return <GrammarStep content={step.content} title={step.title} onComplete={markComplete} />;
      case "LESEN":
        return <ReadingStep content={step.content} title={step.title} onComplete={markComplete} />;
      case "SCHREIBEN":
        return <WritingStep content={step.content} title={step.title} onComplete={markComplete} />;
      case "TEST":
        return <TestStep content={step.content} title={step.title} onComplete={markComplete} />;
      case "WIEDERHOLUNG":
        return <ReviewStep content={step.content} title={step.title} onComplete={markComplete} />;
      default:
        return (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">{step.content || "Inhalt wird vorbereitet..."}</p>
            <Button onClick={markComplete} size="lg">
              Weiter
            </Button>
          </div>
        );
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header with step navigation */}
      <div className="flex items-center gap-3 mb-6 p-4 bg-card rounded-xl border">
        <div className="flex items-center gap-2 flex-1 overflow-x-auto">
          {steps.map((s, i) => (
            <button
              key={s.id}
              onClick={() => i <= currentStep && setCurrentStep(i)}
              className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all ${
                i === currentStep
                  ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2"
                  : completedSteps.has(i)
                  ? "bg-primary-muted text-primary dark:bg-primary/20 dark:text-primary-foreground/80"
                  : i < currentStep
                  ? "bg-muted text-muted-foreground"
                  : "bg-muted/50 text-muted-foreground/50 cursor-not-allowed"
              }`}
              disabled={i > currentStep}
            >
              {completedSteps.has(i) ? "✓" : i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Schritt {currentStep + 1} von {steps.length}</span>
          <span>+{step.xpReward} XP</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step content */}
      <Card className="mb-6">
        <div className={`bg-gradient-to-r ${stepColors[step.stepType]} p-4 text-primary-foreground rounded-t-xl`}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{stepIcons[step.stepType]}</span>
            <div>
              <Badge className="bg-primary-muted/50 text-primary-foreground border-0 mb-1">{step.stepType}</Badge>
              <h2 className="text-xl font-display font-bold">{step.title}</h2>
            </div>
          </div>
        </div>
        <CardContent className="p-6">
          {renderStepContent()}
        </CardContent>
      </Card>
    </div>
  );
}
