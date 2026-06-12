"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  question: string;
  verb: string;
  pronoun: string;
  correctAnswer: string;
  tense: string;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  disabled?: boolean;
}

export function VerbConjugation({ question, verb, pronoun, correctAnswer, tense, onAnswer, disabled }: Props) {
  const [answer, setAnswer] = useState("");
  const [answered, setAnswered] = useState(false);

  function handleCheck() {
    if (!answer.trim()) return;
    setAnswered(true);
    onAnswer(answer, answer.trim().toLowerCase() === correctAnswer.toLowerCase());
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <span className="inline-block px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm font-medium mb-2">{tense}</span>
        <h2 className="text-xl font-display font-semibold">{question}</h2>
      </div>

      <div className="text-center p-6 bg-muted/50 rounded-xl">
        <span className="text-lg text-muted-foreground">{pronoun}</span>
        <span className="text-2xl font-bold text-primary ml-2">
          {answered ? correctAnswer : answer || "_____"}
        </span>
      </div>

      {!answered && (
        <div className="flex gap-2">
          <Input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Konjugierte Form..."
            disabled={disabled}
            onKeyDown={(e) => e.key === "Enter" && handleCheck()}
            className="text-center text-lg"
          />
          <Button onClick={handleCheck} disabled={!answer.trim()}>
            Prüfen
          </Button>
        </div>
      )}
    </div>
  );
}
