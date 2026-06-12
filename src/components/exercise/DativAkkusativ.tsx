"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  question: string;
  sentence: string;
  correctAnswer: string;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  disabled?: boolean;
}

export function DativAkkusativ({ question, sentence, correctAnswer, onAnswer, disabled }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  const cases = [
    { label: "Akkusativ", value: "akkusativ", desc: "Wen? Was?" },
    { label: "Dativ", value: "dativ", desc: "Wem? Was?" },
  ];

  function handleCheck() {
    if (!selected) return;
    setAnswered(true);
    onAnswer(selected, selected === correctAnswer);
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-display font-semibold text-center">{question}</h2>

      <div className="text-center p-6 bg-muted/50 rounded-xl text-lg">
        {sentence}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {cases.map((c) => (
          <button
            key={c.value}
            onClick={() => !answered && setSelected(c.value)}
            disabled={disabled || answered}
            className={`p-6 rounded-xl border-2 text-center transition-all ${
              answered
                ? c.value === correctAnswer
                  ? "border-green-500 bg-green-50"
                  : c.value === selected
                  ? "border-red-500 bg-red-50"
                  : "border-border opacity-50"
                : selected === c.value
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50"
            }`}
          >
            <div className="text-lg font-bold font-display">{c.label}</div>
            <div className="text-sm text-muted-foreground mt-1">{c.desc}</div>
          </button>
        ))}
      </div>

      {!answered && (
        <Button onClick={handleCheck} disabled={!selected} className="w-full">
          Prüfen
        </Button>
      )}
    </div>
  );
}
