"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ReviewPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-display font-bold mb-2">Wiederholung</h1>
      <p className="text-muted-foreground mb-8">Wiederhole gelernte Vokabeln mit Spaced Repetition</p>

      <Card className="text-center py-12">
        <CardContent>
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-xl font-display font-semibold mb-2">Keine Wiederholungen fällig!</h2>
          <p className="text-muted-foreground mb-6">Schau später wieder vorbei oder lerne neue Lektionen.</p>
          <Button asChild><a href="/learn">Neue Lektionen lernen</a></Button>
        </CardContent>
      </Card>
    </div>
  );
}
