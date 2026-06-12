"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  question: string;
  words: { german: string; english: string }[];
  onAnswer: (score: number) => void;
}

export function WordMemory({ question, words, onAnswer }: Props) {
  const [cards, setCards] = useState(() =>
    words.flatMap((w, i) => [
      { id: i * 2, text: w.german, pairId: i, flipped: false, matched: false },
      { id: i * 2 + 1, text: w.english, pairId: i, flipped: false, matched: false },
    ]).sort(() => Math.random() - 0.5)
  );
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  function handleFlip(id: number) {
    if (flipped.length >= 2) return;
    const card = cards.find((c) => c.id === id);
    if (!card || card.matched || card.flipped) return;

    const newCards = cards.map((c) => (c.id === id ? { ...c, flipped: true } : c));
    setCards(newCards);
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = newFlipped.map((fid) => newCards.find((c) => c.id === fid)!);

      if (first.pairId === second.pairId) {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) => (c.pairId === first.pairId ? { ...c, matched: true, flipped: true } : c))
          );
          setFlipped([]);

          const allMatched = newCards.filter((c) => c.pairId !== first.pairId).every((c) => c.matched);
          if (allMatched || newCards.filter((c) => c.pairId === first.pairId).length > 0) {
            const totalPairs = words.length;
            const matchedPairs = newCards.filter((c) => c.matched).length / 2 + 1;
            if (matchedPairs >= totalPairs) {
              setGameOver(true);
              const score = Math.max(0, 100 - moves * 5);
              onAnswer(score);
            }
          }
        }, 500);
      } else {
        setTimeout(() => {
          setCards((prev) => prev.map((c) => (newFlipped.includes(c.id) && !c.matched ? { ...c, flipped: false } : c)));
          setFlipped([]);
        }, 1000);
      }
    }
  }

  const matchedCount = cards.filter((c) => c.matched).length / 2;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-display font-semibold text-center">{question}</h2>

      <div className="text-center text-sm text-muted-foreground">
        Züge: {moves} | Paare: {matchedCount}/{words.length}
      </div>

      <div className="grid grid-cols-4 gap-2">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleFlip(card.id)}
            disabled={card.matched || gameOver}
            className={`aspect-square rounded-xl text-sm font-medium transition-all ${
              card.matched
                ? "bg-green-100 text-green-800 border-2 border-green-300"
                : card.flipped
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80 border-2 border-border"
            }`}
          >
            {card.flipped || card.matched ? card.text : "?"}
          </button>
        ))}
      </div>

      {gameOver && (
        <div className="text-center p-4 bg-green-50 rounded-xl text-green-800">
          <p className="text-lg font-bold">Gedächtnis-Training abgeschlossen! 🧠</p>
          <p className="text-sm mt-1">In {moves} Zügen geschafft</p>
        </div>
      )}
    </div>
  );
}
