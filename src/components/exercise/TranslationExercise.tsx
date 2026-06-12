"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  question: string;
  sourceText: string;
  correctAnswer: string;
  direction: "de-en" | "en-de";
  onAnswer: (answer: string, isCorrect: boolean) => void;
  disabled?: boolean;
}

export function TranslationExercise({ question, sourceText, correctAnswer, direction, onAnswer, disabled }: Props) {
  const [answer, setAnswer] = useState("");
  const [answered, setAnswered] = useState(false);

  function handleCheck() {
    if (!answer.trim()) return;
    setAnswered(true);
    const isCorrect = answer.trim().toLowerCase() === correctAnswer.toLowerCase();
    onAnswer(answer, isCorrect);
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-display font-semibold text-center">{question}</h2>

      <div className="text-center p-6 bg-muted/50 rounded-xl">
        <span className="text-2xl font-medium">{sourceText}</span>
        <div className="mt-2 text-sm text-muted-foreground">
          {direction === "de-en" ? "🇩🇪 → 🇬🇧" : "🇬🇧 → 🇩🇪"}
        </div>
      </div>

      {!answered ? (
        <div className="flex gap-2">
          <Input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Übersetzung eingeben..."
            disabled={disabled}
            onKeyDown={(e) => e.key === "Enter" && handleCheck()}
            className="text-center text-lg"
          />
          <Button onClick={handleCheck} disabled={!answer.trim()}>
            Prüfen
          </Button>
        </div>
      ) : (
        <div className="text-center p-4 bg-green-50 rounded-xl text-green-800">
          Richtige Antwort: <strong>{correctAnswer}</strong>
        </div>
      )}
    </div>
  );
}
