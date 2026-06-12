"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function VocabularyPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-display font-bold mb-2">Vokabeltrainer</h1>
      <p className="text-muted-foreground mb-8">Verwalte und übe deine Vokabeln</p>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Gesamt", value: "0", icon: "📚" },
          { label: "Gelernt", value: "0", icon: "✅" },
          { label: "Fällig", value: "0", icon: "🔄" },
        ].map((s, i) => (
          <Card key={i} className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl mb-1">{s.icon}</div>
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle className="font-display">Meine Vokabeln</CardTitle></CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">Noch keine Vokabeln gesammelt. Starte eine Lektion!</p>
        </CardContent>
      </Card>
    </div>
  );
}
