"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const lessons = [
  { id: "lesson-1", name: "Hallo! Begrüßungen", unit: "Begrüßung", level: "A1", exercises: 15, status: "Veröffentlicht" },
  { id: "lesson-2", name: "Wie heißt du?", unit: "Begrüßung", level: "A1", exercises: 0, status: "Entwurf" },
  { id: "lesson-3", name: "Woher kommst du?", unit: "Begrüßung", level: "A1", exercises: 0, status: "Entwurf" },
  { id: "lesson-4", name: "Zahlen von 1-100", unit: "Zahlen", level: "A1", exercises: 0, status: "Entwurf" },
];

export default function AdminContentPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-bold">Inhalte verwalten</h1>
        <Button>Neue Lektion erstellen</Button>
      </div>

      <Card>
        <CardHeader><CardTitle className="font-display">Lektionen</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Einheit</th>
                  <th className="pb-3 font-medium">Level</th>
                  <th className="pb-3 font-medium">Übungen</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {lessons.map((l) => (
                  <tr key={l.id} className="border-b">
                    <td className="py-3 font-medium">{l.name}</td>
                    <td className="py-3 text-muted-foreground">{l.unit}</td>
                    <td className="py-3"><Badge variant="a1" className="text-xs">{l.level}</Badge></td>
                    <td className="py-3">{l.exercises}</td>
                    <td className="py-3">
                      <Badge variant={l.status === "Veröffentlicht" ? "success" : "warning"} className="text-xs">{l.status}</Badge>
                    </td>
                    <td className="py-3"><Button variant="ghost" size="sm">Bearbeiten</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
