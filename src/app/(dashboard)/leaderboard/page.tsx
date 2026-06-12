"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LeaderboardPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-display font-bold">Rangliste</h1>

      <div className="flex gap-4 mb-6">
        {["Woche", "Monat", "Gesamt"].map((tab, i) => (
          <Badge key={tab} variant={i === 0 ? "default" : "outline"} className="cursor-pointer px-4 py-2 text-sm">
            {tab}
          </Badge>
        ))}
      </div>

      <div className="flex justify-center gap-6 mb-8">
        {[
          { medal: "🥈", name: "---", xp: "0 XP", rank: 2 },
          { medal: "🥇", name: "---", xp: "0 XP", rank: 1 },
          { medal: "🥉", name: "---", xp: "0 XP", rank: 3 },
        ].map((p, i) => (
          <Card key={i} className={`text-center ${p.rank === 1 ? "ring-2 ring-amber-400 scale-105" : ""}`}>
            <CardContent className="p-4">
              <div className="text-4xl mb-2">{p.medal}</div>
              <p className="font-semibold">{p.name}</p>
              <p className="text-sm text-muted-foreground">{p.xp}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle className="font-display">Rangliste</CardTitle></CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">Noch keine Einträge in der Rangliste.</p>
        </CardContent>
      </Card>
    </div>
  );
}
