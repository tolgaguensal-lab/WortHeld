"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminImportPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-display font-bold">Inhalte importieren</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="font-display">Tatoeba</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">Deutsche Beispielsätze aus der Tatoeba-Datenbank importieren.</p>
            <Input placeholder="Suchbegriff eingeben..." />
            <div className="flex gap-2">
              <Button>A1</Button>
              <Button>A2</Button>
              <Button>B1</Button>
              <Button>B2</Button>
              <Button>C1</Button>
            </div>
            <Button className="w-full">Suchen & Importieren</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="font-display">Wiktionary</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">Wörterbuchdaten aus Wiktionary importieren.</p>
            <Input placeholder="Wort eingeben..." />
            <Button className="w-full">Nachschlagen & Importieren</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="font-display">Import-Log</CardTitle></CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">Noch keine Imports durchgeführt.</p>
        </CardContent>
      </Card>
    </div>
  );
}
