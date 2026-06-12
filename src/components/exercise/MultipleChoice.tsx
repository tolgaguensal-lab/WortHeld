"use client";

import { useState } from "react";
import { speak } from "@/lib/tts";
import { Button } from "@/components/ui/button";

interface Props {
  question: string;
  options: { text: string; isCorrect: boolean }[];
  onAnswer: (answer: string, isCorrect: boolean) => void;
  disabled?: boolean;
}

export function MultipleChoice({ question, options, onAnswer, disabled }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  function handleSelect(idx: number) {
    if (disabled || answered) return;
    setSelected(idx);
  }

  function handleCheck() {
    if (selected === null) return;
    setAnswered(true);
    onAnswer(options[selected].text, options[selected].isCorrect);
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-display font-semibold text-center">{question}</h2>
      <div className="grid grid-cols-2 gap-3">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            disabled={disabled || answered}
            className={`p-4 rounded-xl border-2 text-left transition-all font-medium min-h-[60px] ${
              answered
                ? opt.isCorrect
                  ? "border-green-500 bg-green-50 text-green-800"
                  : i === selected
                  ? "border-red-500 bg-red-50 text-red-800"
                  : "border-border opacity-50"
                : selected === i
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50 active:scale-95"
            }`}
          >
            {opt.text}
          </button>
        ))}
      </div>
      {!answered && (
        <Button onClick={handleCheck} disabled={selected === null} className="w-full">
          Prüfen
        </Button>
      )}
    </div>
  );
}
