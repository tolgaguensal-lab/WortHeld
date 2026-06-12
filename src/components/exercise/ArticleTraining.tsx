"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  question: string;
  correctAnswer: string;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  disabled?: boolean;
}

export function ArticleTraining({ question, correctAnswer, onAnswer, disabled }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  const articles = [
    { text: "der", color: "bg-blue-100 border-blue-400 text-blue-800 hover:bg-blue-200", activeColor: "bg-blue-200 border-blue-600" },
    { text: "die", color: "bg-pink-100 border-pink-400 text-pink-800 hover:bg-pink-200", activeColor: "bg-pink-200 border-pink-600" },
    { text: "das", color: "bg-green-100 border-green-400 text-green-800 hover:bg-green-200", activeColor: "bg-green-200 border-green-600" },
  ];

  function handleCheck() {
    if (!selected) return;
    setAnswered(true);
    onAnswer(selected, selected === correctAnswer);
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-display font-semibold text-center">{question}</h2>
      <div className="flex justify-center gap-4">
        {articles.map((art) => (
          <button
            key={art.text}
            onClick={() => !answered && setSelected(art.text)}
            disabled={disabled || answered}
            className={`w-20 h-20 rounded-2xl border-3 text-2xl font-bold font-display transition-all active:scale-95 ${
              answered
                ? art.text === correctAnswer
                  ? "bg-green-100 border-green-500 text-green-800 scale-110"
                  : art.text === selected
                  ? "bg-red-100 border-red-500 text-red-800"
                  : art.color + " opacity-50"
                : selected === art.text
                ? art.activeColor
                : art.color
            }`}
          >
            {art.text}
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
