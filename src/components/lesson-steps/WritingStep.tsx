"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  content: string;
  title: string;
  onComplete: () => void;
}

interface WritingPrompt {
  prompt: string;
  hints?: string[];
  minWords?: number;
}

export function WritingStep({ content, onComplete }: Props) {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  let prompts: WritingPrompt[] = [];
  try {
    prompts = JSON.parse(content);
  } catch {
    prompts = [{ prompt: content || "Schreibe einen kurzen Text zu diesem Thema...", hints: ["Satzanfang: ..."] }];
  }

  const prompt = prompts[0];

  return (
    <div>
      <div className="p-5 rounded-xl border bg-card mb-6">
        <h3 className="font-semibold text-lg mb-3">{prompt.prompt}</h3>
        {prompt.hints && prompt.hints.length > 0 && (
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Hilfe:</p>
            {prompt.hints.map((h, i) => (
              <p key={i} className="text-sm text-muted-foreground/70">• {h}</p>
            ))}
          </div>
        )}
        {prompt.minWords && (
          <p className="text-sm text-muted-foreground mt-2">Mindestens {prompt.minWords} Wörter</p>
        )}
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={submitted}
        placeholder="Schreibe deinen Text hier..."
        rows={6}
        className="w-full p-4 rounded-xl border text-base focus:outline-none focus:border-primary disabled:opacity-50 resize-y"
      />

      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-muted-foreground">
          {text.trim().split(/\s+/).filter(Boolean).length} Wörter
        </span>
        {!submitted ? (
          <Button onClick={() => setSubmitted(true)} disabled={text.trim().length < 10} size="lg">
            Abschicken
          </Button>
        ) : (
          <Button onClick={onComplete} size="lg">
            Weiter
          </Button>
        )}
      </div>

      {submitted && (
        <div className="mt-4 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 text-sm">
          <p className="font-medium mb-1">📝 Gut geschrieben!</p>
          <p>Dein Text wurde gespeichert. Ein Lehrer kann ihn später korrigieren.</p>
        </div>
      )}
    </div>
  );
}
