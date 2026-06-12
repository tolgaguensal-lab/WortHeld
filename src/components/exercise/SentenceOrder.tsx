"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  question: string;
  words: string[];
  correctAnswer: string;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  disabled?: boolean;
}

export function SentenceOrder({ question, words, correctAnswer, onAnswer, disabled }: Props) {
  const [available, setAvailable] = useState<string[]>(() => [...words].sort(() => Math.random() - 0.5));
  const [placed, setPlaced] = useState<string[]>([]);
  const [answered, setAnswered] = useState(false);

  function handlePlace(word: string, idx: number) {
    if (disabled || answered) return;
    setAvailable((a) => a.filter((_, i) => i !== idx));
    setPlaced((p) => [...p, word]);
  }

  function handleRemove(idx: number) {
    if (answered) return;
    const word = placed[idx];
    setPlaced((p) => p.filter((_, i) => i !== idx));
    setAvailable((a) => [...a, word]);
  }

  function handleCheck() {
    setAnswered(true);
    const userAnswer = placed.join(" ");
    onAnswer(userAnswer, userAnswer === correctAnswer);
  }

  function handleReset() {
    setAvailable([...words].sort(() => Math.random() - 0.5));
    setPlaced([]);
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-display font-semibold text-center">{question}</h2>

      <div className="min-h-[60px] p-4 bg-muted/50 rounded-xl flex flex-wrap gap-2 items-center justify-center">
        {placed.length === 0 && <span className="text-muted-foreground">Tippe auf Wörter, um sie einzufügen</span>}
        {placed.map((word, i) => (
          <button
            key={i}
            onClick={() => handleRemove(i)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/80 transition-colors"
          >
            {word}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {available.map((word, i) => (
          <button
            key={`${word}-${i}`}
            onClick={() => handlePlace(word, i)}
            disabled={disabled || answered}
            className="px-4 py-2 border-2 border-border rounded-lg font-medium hover:border-primary/50 transition-all active:scale-95 disabled:opacity-50"
          >
            {word}
          </button>
        ))}
      </div>

      {!answered && (
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset} disabled={placed.length === 0}>
            Zurücksetzen
          </Button>
          <Button onClick={handleCheck} disabled={placed.length !== words.length} className="flex-1">
            Prüfen
          </Button>
        </div>
      )}
    </div>
  );
}
