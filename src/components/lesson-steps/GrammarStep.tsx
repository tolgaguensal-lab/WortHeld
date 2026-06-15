"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  content: string;
  title: string;
  onComplete: () => void;
}

interface GrammarBlock {
  rule: string;
  explanation: string;
  examples: string[];
}

export function GrammarStep({ content, title, onComplete }: Props) {
  const [readTime, setReadTime] = useState(0);
  const [confirmed, setConfirmed] = useState(false);

  let blocks: GrammarBlock[] = [];
  try {
    blocks = JSON.parse(content);
  } catch {
    blocks = [
      {
        rule: title || "Grammatikregel",
        explanation: content || "Inhalt wird vorbereitet...",
        examples: ["Beispiel 1", "Beispiel 2"],
      },
    ];
  }

  useEffect(() => {
    const timer = setInterval(() => setReadTime((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <div className="space-y-6 mb-8">
        {blocks.map((block, idx) => (
          <div key={idx} className="p-5 rounded-xl border bg-card">
            <h3 className="font-semibold text-lg mb-2">{block.rule}</h3>
            <p className="text-muted-foreground mb-4">{block.explanation}</p>
            {block.examples.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Beispiele:</p>
                {block.examples.map((ex, i) => (
                  <div key={i} className="p-3 rounded-lg bg-muted/50 text-sm italic">
                    „{ex}”
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {!confirmed ? (
        <div className="text-center">
          <Button onClick={() => setConfirmed(true)} disabled={readTime < 3} size="lg">
            {readTime < 3 ? `Gelesen (${3 - readTime}s)` : "Verstanden! Weiter"}
          </Button>
        </div>
      ) : (
        <div className="text-center">
          <Button onClick={onComplete} size="lg">
            Weiter zur Übung
          </Button>
        </div>
      )}
    </div>
  );
}
