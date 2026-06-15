"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  content: string;
  title: string;
  onComplete: () => void;
}

interface ReadingBlock {
  text: string;
  questions: { q: string; a: string }[];
}

export function ReadingStep({ content, onComplete }: Props) {
  const [showQuestions, setShowQuestions] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  let blocks: ReadingBlock[] = [];
  try {
    blocks = JSON.parse(content);
  } catch {
    blocks = [{ text: content || "Text wird vorbereitet...", questions: [] }];
  }

  const block = blocks[0];

  function handleSubmit() {
    setSubmitted(true);
  }

  return (
    <div>
      {!showQuestions ? (
        <div>
          <div className="prose prose-sm dark:prose-invert max-w-none mb-6 p-5 rounded-xl border bg-card whitespace-pre-line">
            {block.text}
          </div>
          <div className="text-center">
            <Button onClick={() => setShowQuestions(true)} size="lg">
              Text gelesen — Fragen beantworten
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="space-y-4 mb-8">
            {block.questions.map((q, idx) => (
              <div key={idx} className="p-4 rounded-xl border bg-card">
                <p className="font-medium mb-2">{q.q}</p>
                <input
                  type="text"
                  value={answers[q.q] || ""}
                  onChange={(e) => setAnswers({ ...answers, [q.q]: e.target.value })}
                  disabled={submitted}
                  placeholder="Deine Antwort..."
                  className="w-full p-3 rounded-lg border text-sm focus:outline-none focus:border-primary disabled:opacity-50"
                />
                {submitted && (
                  <p className={`mt-2 text-sm ${answers[q.q]?.toLowerCase().includes(q.a.toLowerCase()) ? "text-green-600" : "text-red-600"}`}>
                    ✓ Richtige Antwort: {q.a}
                  </p>
                )}
              </div>
            ))}
          </div>
          {!submitted ? (
            <div className="text-center">
              <Button onClick={handleSubmit} size="lg">
                Antworten prüfen
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <Button onClick={onComplete} size="lg">
                Weiter
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
