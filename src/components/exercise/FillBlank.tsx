"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  question: string;
  sentence: string;
  correctAnswer: string;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  disabled?: boolean;
}

export function FillBlank({ question, sentence, correctAnswer, onAnswer, disabled }: Props) {
  const [answer, setAnswer] = useState("");
  const [answered, setAnswered] = useState(false);

  function handleCheck() {
    if (!answer.trim()) return;
    setAnswered(true);
    const isCorrect = answer.trim().toLowerCase() === correctAnswer.toLowerCase();
    onAnswer(answer, isCorrect);
  }

  const parts = sentence.split("______");

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-display font-semibold text-center">{question}</h2>
      <div className="text-lg text-center p-6 bg-muted/50 rounded-xl">
        {parts.map((part, i) => (
          <span key={i}>
            {part}
            {i < parts.length - 1 && (
              <span className="inline-block w-24 mx-1 border-b-2 border-primary text-center text-primary font-bold">
                {answered ? correctAnswer : answer || " "}
              </span>
            )}
          </span>
        ))}
      </div>
      {!answered && (
        <div className="flex gap-2">
          <Input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Deine Antwort..."
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
