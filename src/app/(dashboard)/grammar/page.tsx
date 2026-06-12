"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GrammarPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-display font-bold mb-2">Grammatiktrainer</h1>
      <p className="text-muted-foreground mb-8">Deutsche Grammatik systematisch lernen</p>
      <Card>
        <CardHeader><CardTitle className="font-display">Grammatikthemen</CardTitle></CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">Grammatikthemen werden bald verfügbar sein.</p>
        </CardContent>
      </Card>
    </div>
  );
}
