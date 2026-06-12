"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  question: string;
  sentence: string;
  errors: string[];
  onAnswer: (answer: string, isCorrect: boolean) => void;
  disabled?: boolean;
}

export function ErrorFinder({ question, sentence, errors, onAnswer, disabled }: Props) {
  const [selectedWords, setSelectedWords] = useState<number[]>([]);
  const [answered, setAnswered] = useState(false);
  const words = sentence.split(" ");

  function handleWordClick(idx: number) {
    if (answered || disabled) return;
    setSelectedWords((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  }

  function handleCheck() {
    setAnswered(true);
    const selectedTexts = selectedWords.map((i) => words[i]);
    const allErrorsFound = errors.every((e) => selectedTexts.some((s) => s.toLowerCase().includes(e.toLowerCase())));
    const noFalsePositives = selectedTexts.every((s) => errors.some((e) => s.toLowerCase().includes(e.toLowerCase())));
    onAnswer(selectedTexts.join(", "), allErrorsFound && noFalsePositives);
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-display font-semibold text-center">{question}</h2>
      <p className="text-center text-muted-foreground text-sm">Tippe auf die Wörter mit Fehlern</p>

      <div className="flex flex-wrap gap-2 justify-center p-6 bg-muted/50 rounded-xl">
        {words.map((word, i) => (
          <button
            key={i}
            onClick={() => handleWordClick(i)}
            disabled={disabled || answered}
            className={`px-3 py-2 rounded-lg font-medium transition-all ${
              answered
                ? errors.some((e) => word.toLowerCase().includes(e.toLowerCase()))
                  ? "bg-green-100 text-green-800 border border-green-300"
                  : selectedWords.includes(i)
                  ? "bg-red-100 text-red-800 border border-red-300"
                  : "bg-muted"
                : selectedWords.includes(i)
                ? "bg-amber-100 text-amber-800 border border-amber-300"
                : "bg-white border border-border hover:border-primary/50"
            }`}
          >
            {word}
          </button>
        ))}
      </div>

      {!answered && (
        <Button onClick={handleCheck} disabled={selectedWords.length === 0} className="w-full">
          Prüfen
        </Button>
      )}

      {answered && (
        <div className="p-4 bg-muted/50 rounded-xl text-sm">
          <p className="font-medium mb-1">Richtige Fehler: {errors.join(", ")}</p>
        </div>
      )}
    </div>
  );
}
