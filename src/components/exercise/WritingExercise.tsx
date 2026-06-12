"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { checkGrammar } from "@/lib/api/external";

interface Props {
  question: string;
  prompt: string;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  disabled?: boolean;
}

export function WritingExercise({ question, prompt, onAnswer, disabled }: Props) {
  const [text, setText] = useState("");
  const [grammarErrors, setGrammarErrors] = useState<any[]>([]);
  const [checking, setChecking] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleCheckGrammar() {
    if (!text.trim()) return;
    setChecking(true);
    try {
      const result = await checkGrammar(text);
      setGrammarErrors(result.matches);
    } catch {
      setGrammarErrors([]);
    }
    setChecking(false);
  }

  function handleSubmit() {
    setSubmitted(true);
    const hasErrors = grammarErrors.length > 0;
    onAnswer(text, !hasErrors && text.trim().length > 5);
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-display font-semibold text-center">{question}</h2>

      <div className="p-4 bg-muted/50 rounded-xl text-center">
        <p className="text-muted-foreground">{prompt}</p>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Schreibe deinen Satz hier..."
        disabled={disabled || submitted}
        className="w-full h-32 p-4 border-2 rounded-xl resize-none focus:outline-none focus:border-primary disabled:opacity-50"
      />

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{text.length} Zeichen</span>
        <span>{text.split(/\s+/).filter(Boolean).length} Wörter</span>
      </div>

      {grammarErrors.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-amber-600">Grammatikhinweise:</p>
          {grammarErrors.map((err, i) => (
            <div key={i} className="p-3 bg-amber-50 rounded-lg text-sm">
              <p className="font-medium">{err.message}</p>
              {err.suggestions?.length > 0 && (
                <p className="text-muted-foreground mt-1">Vorschlag: {err.suggestions.join(", ")}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {!submitted && (
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCheckGrammar} disabled={!text.trim() || checking}>
            {checking ? "Prüfe..." : "Grammatik prüfen"}
          </Button>
          <Button onClick={handleSubmit} disabled={!text.trim() || text.length < 5} className="flex-1">
            Absenden
          </Button>
        </div>
      )}
    </div>
  );
}
