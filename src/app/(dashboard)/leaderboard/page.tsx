"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function LeaderboardPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-display font-bold gradient-text">Rangliste</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Zeige deine Fähigkeiten und konkurriere mit anderen Lernenden
        </p>
      </div>

      {/* Time Period Tabs */}
      <div className="flex justify-center gap-3">
        {["Woche", "Monat", "Gesamt"].map((tab, i) => (
          <button
            key={tab}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              i === 0
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Podium */}
      <div className="flex justify-center items-end gap-8 py-8">
        {[
          { medal: "🥈", name: "---", xp: "0 XP", rank: 2, height: "h-48" },
          { medal: "🥇", name: "---", xp: "0 XP", rank: 1, height: "h-64" },
          { medal: "🥉", name: "---", xp: "0 XP", rank: 3, height: "h-40" },
        ].map((p, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="text-6xl mb-4 animate-bounce" style={{ animationDelay: `${i * 100}ms` }}>
              {p.medal}
            </div>
            <Card
              className={`w-48 ${
                p.rank === 1
                  ? "ring-4 ring-amber-400 shadow-2xl scale-105"
                  : p.rank === 2
                  ? "ring-2 ring-gray-400 shadow-xl"
                  : "ring-2 ring-amber-700 shadow-lg"
              }`}
            >
              <CardContent className="p-6 text-center">
                <p className="text-lg font-bold">{p.name}</p>
                <p className="text-sm text-muted-foreground">{p.xp}</p>
              </CardContent>
            </Card>
            <div className={`mt-4 ${p.height} w-48 rounded-t-3xl ${
              p.rank === 1
                ? "bg-gradient-to-t from-amber-400 to-amber-200"
                : p.rank === 2
                ? "bg-gradient-to-t from-gray-400 to-gray-300"
                : "bg-gradient-to-t from-amber-700 to-amber-600"
            } shadow-lg`} />
          </div>
        ))}
      </div>

      {/* Leaderboard List */}
      <div className="rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
          <h2 className="text-2xl font-display font-bold text-white">Aktuelle Rangliste</h2>
        </div>
        <CardContent className="p-12 text-center">
          <div className="text-7xl mb-6">🏆</div>
          <p className="text-xl font-semibold mb-2">Noch keine Einträge</p>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Starte Lektionen, sammle XP und lande auf dem Podium!
          </p>
          <a href="/learn">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg py-6 px-8">
              Jetzt lernen →
            </Button>
          </a>
        </CardContent>
      </div>
    </div>
  );
}
