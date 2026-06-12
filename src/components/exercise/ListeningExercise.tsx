"use client";

import { useState } from "react";
import { speak, stopSpeaking } from "@/lib/tts";
import { Button } from "@/components/ui/button";
import { Volume2, RotateCcw } from "lucide-react";

interface Props {
  question: string;
  word: string;
  options: { text: string; isCorrect: boolean }[];
  onAnswer: (answer: string, isCorrect: boolean) => void;
  disabled?: boolean;
}

export function ListeningExercise({ question, word, options, onAnswer, disabled }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [played, setPlayed] = useState(false);

  function handlePlay() {
    stopSpeaking();
    speak(word);
    setPlayed(true);
  }

  function handleCheck() {
    if (selected === null) return;
    setAnswered(true);
    onAnswer(options[selected].text, options[selected].isCorrect);
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-display font-semibold text-center">{question}</h2>

      <div className="flex justify-center">
        <Button
          onClick={handlePlay}
          variant="outline"
          size="lg"
          className="w-24 h-24 rounded-full text-3xl hover:scale-105 transition-transform"
        >
          <Volume2 className="h-10 w-10" />
        </Button>
      </div>

      {played && (
        <div className="flex justify-center">
          <Button variant="ghost" size="sm" onClick={handlePlay}>
            <RotateCcw className="h-4 w-4 mr-1" /> Nochmal anhören
          </Button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => !answered && setSelected(i)}
            disabled={disabled || answered}
            className={`p-4 rounded-xl border-2 text-left font-medium transition-all ${
              answered
                ? opt.isCorrect
                  ? "border-green-500 bg-green-50 text-green-800"
                  : i === selected
                  ? "border-red-500 bg-red-50 text-red-800"
                  : "border-border opacity-50"
                : selected === i
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50"
            }`}
          >
            {opt.text}
          </button>
        ))}
      </div>

      {!answered && played && (
        <Button onClick={handleCheck} disabled={selected === null} className="w-full">
          Prüfen
        </Button>
      )}
    </div>
  );
}
