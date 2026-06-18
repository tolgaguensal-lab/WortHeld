"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface DTZTest {
  id: string;
  name: string;
  level: string;
  skill: string;
  timeLimit: number;
  xpReward: number;
  _count: { results: number };
}

const skillIcons: Record<string, string> = {
  LESEN: "📖",
  HOEREN: "👂",
  SCHREIBEN: "✍️",
  SPRECHEN: "🗣️",
};

const skillLabels: Record<string, string> = {
  LESEN: "Leseverstehen",
  HOEREN: "Hörverstehen",
  SCHREIBEN: "Schreiben",
  SPRECHEN: "Sprechen",
};

const levelColors: Record<string, string> = {
  A2: "from-blue-500 to-blue-600",
  B1: "from-orange-500 to-orange-600",
};

export default function DTZPage() {
  const [tests, setTests] = useState<DTZTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/dtz-tests")
      .then((r) => r.json())
      .then((data) => setTests(data))
      .finally(() => setLoading(false));
  }, []);

  const filteredTests = selectedLevel ? tests.filter((t) => t.level === selectedLevel) : tests;

  if (loading) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-12 w-64 bg-muted rounded-lg" />
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-48 rounded-2xl bg-muted" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-display font-bold text-primary">DTZ-Prüfungsvorbereitung</h1>
        <p className="text-lg text-muted-foreground">
          Deutsch-Test für Zuwanderer – Vorbereitung für alle 4 Fertigkeiten
        </p>
      </div>

      {/* Level Filter */}
      <div className="flex gap-4">
        <Button
          variant={selectedLevel === null ? "primary" : "outline"}
          onClick={() => setSelectedLevel(null)}
          className="px-6 py-6 text-lg"
        >
          Alle Niveaus
        </Button>
        {["A2", "B1"].map((level) => (
          <Button
            key={level}
            variant={selectedLevel === level ? "primary" : "outline"}
            onClick={() => setSelectedLevel(level)}
            className="px-6 py-6 text-lg"
          >
            Niveau {level}
          </Button>
        ))}
      </div>

      {/* Tests Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredTests.map((test) => {
          const gradient = levelColors[test.level] || "from-gray-500 to-gray-600";
          const hasResult = test._count.results > 0;

          return (
            <Card
              key={test.id}
              className={`overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] ${
                hasResult ? "ring-2 ring-success/50" : ""
              }`}
            >
              <div className={`relative bg-gradient-to-r ${gradient} p-6 text-white`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-primary-muted/50 flex items-center justify-center text-4xl">
                      {skillIcons[test.skill] || "📝"}
                    </div>
                    <div>
                      <Badge className="bg-primary-muted text-primary-foreground border-0 mb-2">{test.level}</Badge>
                      <h2 className="text-2xl font-display font-bold">{skillLabels[test.skill] || test.skill}</h2>
                      <p className="text-primary-foreground/80 text-sm mt-1">
                        {test.timeLimit} Minuten • +{test.xpReward} XP
                      </p>
                    </div>
                  </div>
                  {hasResult && (
                    <Badge className="bg-success text-primary-foreground border-0 px-3 py-1">
                      ✅ Abgeschlossen
                    </Badge>
                  )}
                </div>
              </div>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Dieser Test bereitet dich auf den DTZ vor. Du musst mindestens 60% richtige Antworten haben, um zu bestehen.
                  </p>
                  <Link href={`/dtz/${test.id}`}>
                    <Button className="w-full bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-700 text-lg py-6">
                      {hasResult ? "Test wiederholen" : "Test starten"} →
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredTests.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl font-semibold mb-2">Keine Tests gefunden</p>
            <p className="text-muted-foreground">Wähle ein anderes Niveau oder warte auf weitere Inhalte.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
