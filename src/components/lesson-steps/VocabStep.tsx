"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  content: string;
  title: string;
  onComplete: () => void;
}

interface VocabItem {
  word: string;
  translation: string;
  example?: string;
}

export function VocabStep({ content, onComplete }: Props) {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [allRevealed, setAllRevealed] = useState(false);

  let items: VocabItem[] = [];
  try {
    items = JSON.parse(content);
  } catch {
    items = content.split("\n").filter(Boolean).map((line) => {
      const [word, translation, ...rest] = line.split("|");
      return { word: word?.trim() || "", translation: translation?.trim() || "", example: rest.join("|").trim() };
    });
  }

  if (items.length === 0) {
    items = [
      { word: "hallo", translation: "hello" },
      { word: "danke", translation: "thanks" },
      { word: "tschüss", translation: "bye" },
    ];
  }

  function reveal(idx: number) {
    const next = new Set(revealed);
    next.add(idx);
    setRevealed(next);
    if (next.size === items.length) setAllRevealed(true);
  }

  return (
    <div>
      <p className="text-muted-foreground mb-6">
        Lerne die neuen Vokabeln. Klicke auf eine Karte, um die Übersetzung zu sehen.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {items.map((item, idx) => (
          <button
            key={idx}
            onClick={() => reveal(idx)}
            className={`p-4 rounded-xl border-2 text-left transition-all min-h-[80px] ${
              revealed.has(idx)
                ? "border-green-300 bg-green-50 dark:bg-green-900/20 dark:border-green-700"
                : "border-border hover:border-primary/50 bg-card"
            }`}
          >
            <div className="font-semibold text-lg">{item.word}</div>
            {revealed.has(idx) && (
              <div className="mt-2 space-y-1">
                <div className="text-muted-foreground">{item.translation}</div>
                {item.example && <div className="text-sm text-muted-foreground/70 italic">„{item.example}”</div>}
              </div>
            )}
            {!revealed.has(idx) && (
              <div className="text-sm text-muted-foreground/50 mt-2">Zum Anzeigen klicken</div>
            )}
          </button>
        ))}
      </div>
      {allRevealed && (
        <div className="text-center">
          <Button onClick={onComplete} size="lg">
            Weiter zu Grammatik
          </Button>
        </div>
      )}
    </div>
  );
}
