"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

interface Props {
  correct: boolean;
  correctAnswer?: string;
  xpEarned?: number;
  onDismiss: () => void;
}

export function FeedbackOverlay({ correct, correctAnswer, xpEarned, onDismiss }: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDismiss, 300);
    }, 1500);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onClick={() => { setVisible(false); onDismiss(); }}
    >
      <div className={`absolute inset-0 ${correct ? "bg-green-500/90" : "bg-red-500/90"}`} />
      <div className="relative text-center text-primary-foreground z-10">
        {correct ? (
          <>
            <CheckCircle className="h-20 w-20 mx-auto mb-4 animate-bounce" />
            <h2 className="text-3xl font-display font-bold mb-2">Richtig!</h2>
            {xpEarned && xpEarned > 0 && <p className="text-xl">+{xpEarned} XP</p>}
          </>
        ) : (
          <>
            <XCircle className="h-20 w-20 mx-auto mb-4" />
            <h2 className="text-3xl font-display font-bold mb-2">Falsch!</h2>
            {correctAnswer && <p className="text-lg opacity-90">{correctAnswer}</p>}
          </>
        )}
      </div>
    </div>
  );
}
