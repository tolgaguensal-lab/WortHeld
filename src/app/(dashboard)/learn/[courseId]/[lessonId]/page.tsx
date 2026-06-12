"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LessonStartPage() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Link href="/learn/a1" className="text-primary hover:underline text-sm mb-4 inline-block">← Zurück zur Einheit</Link>
      <Card className="text-center">
        <CardHeader>
          <div className="text-6xl mb-4">📖</div>
          <CardTitle className="text-2xl font-display">Hallo! Begrüßungen</CardTitle>
          <p className="text-muted-foreground">Einfache Begrüßungen auf Deutsch lernen</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center gap-8 text-sm text-muted-foreground">
            <div><span className="text-lg">⏱️</span><br />~5 Min.</div>
            <div><span className="text-lg">📝</span><br />15 Übungen</div>
            <div><span className="text-lg">⚡</span><br />+15 XP</div>
          </div>
          <div className="space-y-2 text-left text-sm">
            <h3 className="font-semibold">Themen in dieser Lektion:</h3>
            <ul className="text-muted-foreground space-y-1">
              <li>• Begrüßungen: Hallo, Guten Morgen, Guten Tag</li>
              <li>• Verabschiedung: Tschüss, Auf Wiedersehen</li>
              <li>• Höflichkeit: Danke, Bitte</li>
              <li>• Artikel: der, die, das</li>
            </ul>
          </div>
          <Link href="/exercise/lesson-1">
            <Button size="lg" className="w-full text-lg py-6">Lektion starten</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
