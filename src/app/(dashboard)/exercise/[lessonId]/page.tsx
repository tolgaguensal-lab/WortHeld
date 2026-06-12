"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const exercises = [
  { id: 1, type: "multiple_choice", question: 'Was bedeutet "Hallo"?', options: ["Hello", "Goodbye", "Please", "Thanks"], correct: 0 },
  { id: 2, type: "multiple_choice", question: 'Was bedeutet "Danke"?', options: ["Please", "Thank you", "Sorry", "Hello"], correct: 1 },
  { id: 3, type: "article", question: 'Welcher Artikel gehört zu "Tisch"?', options: ["der", "die", "das"], correct: 0 },
  { id: 4, type: "article", question: 'Welcher Artikel gehört zu "Frau"?', options: ["der", "die", "das"], correct: 1 },
  { id: 5, type: "article", question: 'Welcher Artikel gehört zu "Haus"?', options: ["der", "die", "das"], correct: 2 },
  { id: 6, type: "multiple_choice", question: 'Was bedeutet "Tschüss"?', options: ["Hello", "Bye", "Thanks", "Please"], correct: 1 },
  { id: 7, type: "fill_blank", question: 'Fülle die Lücke: "Ich ___ Anna."', answer: "heiße" },
  { id: 8, type: "multiple_choice", question: 'Was bedeutet "Bitte"?', options: ["Thank you", "Sorry", "Please", "Yes"], correct: 2 },
  { id: 9, type: "translation", question: 'Übersetze: "Good morning"', answer: "Guten Morgen" },
  { id: 10, type: "multiple_choice", question: 'Was bedeutet "Ja"?', options: ["No", "Maybe", "Yes", "Hello"], correct: 2 },
];

export default function ExercisePage() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [textInput, setTextInput] = useState("");
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState<boolean | null>(null);

  const exercise = exercises[current];
  const progress = ((current) / exercises.length) * 100;

  function handleCheck() {
    if (!exercise) return;
    let isCorrect = false;
    if ("options" in exercise && selected !== null) {
      isCorrect = selected === exercise.correct;
    } else if ("answer" in exercise) {
      isCorrect = textInput.trim().toLowerCase() === (exercise as any).answer.toLowerCase();
    }
    setCorrect(isCorrect);
    setChecked(true);
    if (isCorrect) setScore((s) => s + 1);
  }

  function handleNext() {
    if (current + 1 >= exercises.length) {
      router.push(`/exercise/result?score=${score + (correct ? 1 : 0)}&total=${exercises.length}`);
      return;
    }
    setCurrent((c) => c + 1);
    setSelected(null);
    setTextInput("");
    setChecked(false);
    setCorrect(null);
  }

  if (!exercise) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="p-4 border-b bg-card">
        <div className="flex items-center gap-4 max-w-2xl mx-auto">
          <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>✕</Button>
          <Progress value={progress} className="flex-1" />
          <span className="text-sm text-muted-foreground">❤️ 5</span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-lg">
          <CardContent className="p-8">
            <h2 className="text-xl font-display font-semibold mb-6 text-center">{exercise.question}</h2>

            {"options" in exercise && exercise.options && (
              <div className="grid grid-cols-2 gap-3 mb-6">
                {exercise.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => !checked && setSelected(i)}
                    className={`p-4 rounded-xl border-2 text-left transition-all font-medium ${
                      checked
                        ? i === exercise.correct
                          ? "border-green-500 bg-green-50 text-green-800"
                          : i === selected
                          ? "border-red-500 bg-red-50 text-red-800"
                          : "border-border opacity-50"
                        : selected === i
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {"answer" in exercise && (
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Deine Antwort..."
                disabled={checked}
                className="w-full p-4 border-2 rounded-xl text-lg text-center font-medium focus:outline-none focus:border-primary disabled:opacity-50"
              />
            )}

            {checked && (
              <div className={`mt-4 p-4 rounded-xl text-center ${correct ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>
                {correct ? "Richtig! 🎉" : `Falsch! Die richtige Antwort ist: ${"options" in exercise && exercise.options ? exercise.options[exercise.correct] : (exercise as any).answer}`}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="p-4 border-t bg-card">
        <div className="max-w-lg mx-auto">
          {!checked ? (
            <Button onClick={handleCheck} disabled={"options" in exercise ? selected === null : textInput.trim() === ""} className="w-full">
              Prüfen
            </Button>
          ) : (
            <Button onClick={handleNext} className="w-full">
              {current + 1 >= exercises.length ? "Ergebnis ansehen" : "Weiter"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
