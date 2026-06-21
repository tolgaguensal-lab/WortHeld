"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  content: string;
  title: string;
  onComplete: () => void;
}

interface ReviewItem {
  question: string;
  answer: string;
}

export function ReviewStep({ content, onComplete }: Props) {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  let items: ReviewItem[] = [];
  try {
    items = JSON.parse(content);
  } catch {
    items = [
      { question: "Was hast du heute gelernt?", answer: "Zusammenfassung der Lektion..." },
      { question: "Welche Vokabeln waren neu?", answer: "Deine neuen Wörter..." },
    ];
  }

  function toggleReveal(idx: number) {
    const next = new Set(revealed);
    if (next.has(idx)) next.delete(idx);
    else next.add(idx);
    setRevealed(next);
  }

  const allRevealed = revealed.size === items.length;

  return (
    <div>
      <p className="text-muted-foreground mb-6">
        Wiederhole das Gelernte. Klicke auf eine Karte, um die Antwort zu sehen.
      </p>

      <div className="space-y-3 mb-8">
        {items.map((item, idx) => (
          <button
            key={idx}
            onClick={() => toggleReveal(idx)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
              revealed.has(idx)
                ? "border-primary-muted bg-primary-muted/50 dark:bg-primary/20 dark:border-primary/40"
                : "border-border hover:border-primary/50 bg-card"
            }`}
          >
            <div className="font-medium">{item.question}</div>
            {revealed.has(idx) && (
              <div className="mt-2 text-muted-foreground">{item.answer}</div>
            )}
          </button>
        ))}
      </div>

      {allRevealed && (
        <div className="text-center">
          <Button onClick={onComplete} size="lg">
            Lektion abschließen
          </Button>
        </div>
      )}
    </div>
  );
}
