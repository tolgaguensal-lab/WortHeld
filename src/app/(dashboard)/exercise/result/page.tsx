"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function ResultContent() {
  const params = useSearchParams();
  const score = parseInt(params.get("score") ?? "0");
  const total = parseInt(params.get("total") ?? "10");
  const percentage = Math.round((score / total) * 100);
  const xpEarned = score * 5;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-md text-center">
        <CardContent className="p-8 space-y-6">
          <div className="text-6xl">{percentage >= 80 ? "🎉" : percentage >= 50 ? "👍" : "💪"}</div>
          <h1 className="text-3xl font-display font-bold">
            {percentage >= 80 ? "Ausgezeichnet!" : percentage >= 50 ? "Gut gemacht!" : "Weiter üben!"}
          </h1>
          <div className="text-5xl font-bold text-primary">{percentage}%</div>
          <p className="text-muted-foreground">{score} von {total} richtig</p>

          <div className="grid grid-cols-3 gap-4 py-4">
            <div><p className="text-2xl font-bold text-amber-500">+{xpEarned}</p><p className="text-xs text-muted-foreground">XP</p></div>
            <div><p className="text-2xl font-bold text-green-500">{score}</p><p className="text-xs text-muted-foreground">Richtig</p></div>
            <div><p className="text-2xl font-bold text-red-500">{total - score}</p><p className="text-xs text-muted-foreground">Falsch</p></div>
          </div>

          <div className="space-y-3">
            <Link href="/learn/a1/lesson-1"><Button className="w-full">Nochmal üben</Button></Link>
            <Link href="/dashboard"><Button variant="outline" className="w-full">Zum Dashboard</Button></Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ResultPage() {
  return <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Laden...</div>}><ResultContent /></Suspense>;
}
