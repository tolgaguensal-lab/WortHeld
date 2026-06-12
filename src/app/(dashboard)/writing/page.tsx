"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WritingPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-display font-bold mb-2">Schreibtrainer</h1>
      <p className="text-muted-foreground mb-8">Übe dein Schreiben mit automatischem Feedback</p>
      <Card>
        <CardHeader><CardTitle className="font-display">Schreibübungen</CardTitle></CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">Schreibübungen mit LanguageTool-Feedback werden bald verfügbar sein.</p>
        </CardContent>
      </Card>
    </div>
  );
}
