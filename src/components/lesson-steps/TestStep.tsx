"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface Props {
  content: string;
  title: string;
  onComplete: () => void;
}

interface TestQuestion {
  question: string;
  options: string[];
  correct: number;
}

export function TestStep({ content, onComplete }: Props) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  let questions: TestQuestion[] = [];
  try {
    questions = JSON.parse(content);
  } catch {
    questions = [
      { question: "Wie geht es Ihnen?", options: ["Fine, thanks", "Goodbye", "Please", "Hello"], correct: 0 },
      { question: "Was bedeutet 'Arbeit'?", options: ["Free time", "Work", "Family", "Money"], correct: 1 },
    ];
  }

  const q = questions[current];
  const progress = (current / questions.length) * 100;

  function handleCheck() {
    setChecked(true);
    if (selected === q.correct) setScore((s) => s + 1);
  }

  function handleNext() {
    if (current + 1 >= questions.length) {
      setFinished(true);
      return;
    }
    setCurrent(current + 1);
    setSelected(null);
    setChecked(false);
  }

  if (finished) {
    const percent = Math.round((score / questions.length) * 100);
    return (
      <div className="text-center py-8">
        <div className="text-5xl mb-4">{percent >= 70 ? "🎉" : "💪"}</div>
        <h3 className="text-2xl font-bold mb-2">Test abgeschlossen!</h3>
        <p className="text-muted-foreground mb-2">
          {score} von {questions.length} richtig ({percent}%)
        </p>
        <p className="text-sm text-muted-foreground mb-6">
          {percent >= 90 ? "Hervorragend!" : percent >= 70 ? "Gut gemacht!" : percent >= 50 ? "Weiter üben!" : "Nicht aufgeben!"}
        </p>
        <Button onClick={onComplete} size="lg">Weiter</Button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-muted-foreground mt-1">Frage {current + 1} von {questions.length}</p>
      </div>
      <h3 className="text-lg font-semibold mb-6">{q.question}</h3>
      <div className="space-y-3 mb-6">
        {q.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => !checked && setSelected(idx)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
              checked
                ? idx === q.correct
                  ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                  : idx === selected
                  ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                  : "border-border opacity-50"
                : selected === idx
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      <div className="text-center">
        {!checked ? (
          <Button onClick={handleCheck} disabled={selected === null} size="lg">
            Prüfen
          </Button>
        ) : (
          <Button onClick={handleNext} size="lg">
            {current + 1 >= questions.length ? "Ergebnis" : "Weiter"}
          </Button>
        )}
      </div>
    </div>
  );
}
