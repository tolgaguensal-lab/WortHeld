"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FeedbackCard } from "@/components/shared/FeedbackCard";
import { checkGrammar } from "@/lib/api/external";
import { Sparkles, Loader2, Send, CheckCircle2 } from "lucide-react";

interface Props {
  question: string;
  prompt: string;
  exampleSentence?: string;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  disabled?: boolean;
}

export function WritingExercise({
  question,
  prompt,
  exampleSentence,
  onAnswer,
  disabled,
}: Props) {
  const [text, setText] = useState("");
  const [grammarErrors, setGrammarErrors] = useState<any[]>([]);
  const [checking, setChecking] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showExample, setShowExample] = useState(false);
  const [result, setResult] = useState<{ passed: boolean; feedback: string } | null>(null);

  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const charCount = text.length;
  const canSubmit = text.trim().length >= 5;

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
    const passed = !hasErrors && text.trim().length >= 10;

    setResult({
      passed,
      feedback: passed
        ? "Sehr gut! Dein Text ist grammatikalisch korrekt."
        : hasErrors
          ? `Dein Text enthält ${grammarErrors.length} Grammatik-Hinweise. Überarbeite ihn und versuche es erneut.`
          : "Dein Text ist etwas kurz. Versuche, mindestens 10 Zeichen zu schreiben.",
    });

    if (passed) {
      onAnswer(text, true);
    }
  }

  function handleRetry() {
    setSubmitted(false);
    setResult(null);
    setGrammarErrors([]);
  }

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-display font-semibold text-center text-foreground">
        {question}
      </h2>

      <div className="p-4 bg-card rounded-xl border border-border/50 text-center">
        <p className="text-muted-foreground text-sm leading-relaxed">{prompt}</p>
      </div>

      {exampleSentence && (
        <div>
          <button
            onClick={() => setShowExample(!showExample)}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors underline-offset-2 hover:underline"
          >
            {showExample ? "Beispiel ausblenden" : "Beispiel anzeigen"}
          </button>
          {showExample && (
            <p className="mt-2 p-3 bg-primary-muted/30 rounded-lg text-sm text-foreground italic">
              &ldquo;{exampleSentence}&rdquo;
            </p>
          )}
        </div>
      )}

      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          if (submitted) handleRetry();
        }}
        placeholder="Schreibe deinen Text hier auf Deutsch..."
        disabled={disabled}
        className="w-full h-36 p-4 border-2 border-input rounded-xl resize-none bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm leading-relaxed"
      />

      <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
        <span>{charCount} Zeichen</span>
        <span>{wordCount} Wörter</span>
      </div>

      {grammarErrors.length > 0 && !submitted && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-warning flex items-center gap-1.5">
            <Sparkles size={12} />
            {grammarErrors.length} Grammatik-Hinweise
          </p>
          {grammarErrors.slice(0, 3).map((err, i) => (
            <FeedbackCard
              key={i}
              type="warning"
              title={err.message}
              message={
                err.suggestions?.length > 0
                  ? `Vorschlag: ${err.suggestions.slice(0, 2).join(", ")}`
                  : "Kein automatischer Vorschlag verfügbar."
              }
            />
          ))}
        </div>
      )}

      {result && (
        <FeedbackCard
          type={result.passed ? "success" : "error"}
          title={result.passed ? "Richtig!" : "Noch nicht ganz"}
          message={result.feedback}
        />
      )}

      {!submitted ? (
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleCheckGrammar}
            disabled={!text.trim() || checking}
            size="md"
          >
            {checking ? (
              <>
                <Loader2 size={14} className="animate-spin mr-1.5" />
                Prüfe...
              </>
            ) : (
              <>
                <Sparkles size={14} className="mr-1.5" />
                Grammatik prüfen
              </>
            )}
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!canSubmit || checking}
            className="flex-1"
            size="md"
          >
            <Send size={14} className="mr-1.5" />
            Absenden
          </Button>
        </div>
      ) : (
        <div className="flex gap-2">
          {!result?.passed && (
            <Button variant="outline" onClick={handleRetry} size="md">
              Überarbeiten
            </Button>
          )}
          {result?.passed && (
            <Button variant="primary" disabled className="flex-1" size="md">
              <CheckCircle2 size={14} className="mr-1.5" />
              Eingereicht
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
