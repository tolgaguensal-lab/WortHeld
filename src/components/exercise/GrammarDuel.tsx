"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  question: string;
  sentences: { correct: string; wrong: string }[];
  onAnswer: (score: number) => void;
}

export function GrammarDuel({ question, sentences, onAnswer }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [gameOver, setGameOver] = useState(false);

  const current = sentences[currentIdx];

  function handleSelect(choice: string) {
    if (selected) return;
    setSelected(choice);
    const isCorrect = choice === current.correct;

    if (isCorrect) {
      setScore((s) => s + 1);
      setFeedback("correct");
    } else {
      setFeedback("wrong");
    }

    setTimeout(() => {
      if (currentIdx + 1 >= sentences.length) {
        setGameOver(true);
        onAnswer(score + (isCorrect ? 1 : 0));
      } else {
        setCurrentIdx((i) => i + 1);
        setSelected(null);
        setFeedback(null);
      }
    }, 1000);
  }

  if (gameOver) {
    return (
      <div className="text-center space-y-4">
        <div className="text-6xl">{score === sentences.length ? "🏆" : "💪"}</div>
        <div className="text-4xl font-bold text-primary">{score}/{sentences.length}</div>
        <p className="text-muted-foreground">Richtig beantwortet</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-display font-semibold">{question}</h2>
        <span className="text-sm text-muted-foreground">{currentIdx + 1}/{sentences.length}</span>
      </div>

      <div className="space-y-3">
        {[current.correct, current.wrong].sort(() => Math.random() - 0.5).map((sentence, i) => (
          <button
            key={i}
            onClick={() => handleSelect(sentence)}
            disabled={!!selected}
            className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
              feedback && sentence === current.correct
                ? "border-green-500 bg-green-50"
                : feedback === "wrong" && sentence === selected
                ? "border-red-500 bg-red-50"
                : "border-border hover:border-primary/50"
            }`}
          >
            {sentence}
          </button>
        ))}
      </div>

      <div className="text-center text-sm text-muted-foreground">
        Richtig: {score} | {currentIdx + 1} von {sentences.length}
      </div>
    </div>
  );
}
