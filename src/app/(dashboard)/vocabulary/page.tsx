"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function VocabularyPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-display font-bold gradient-text">Vokabeltrainer</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Verwalte und übe deine Vokabeln für nachhaltigen Lernerfolg
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Gesamtvokabeln", value: "0", icon: "📚", color: "from-blue-500 to-indigo-600" },
          { label: "Gelernt", value: "0", icon: "✅", color: "from-green-500 to-emerald-600" },
          { label: "Fällig zur Wiederholung", value: "0", icon: "🔄", color: "from-amber-500 to-orange-600" },
        ].map((s, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${s.color}`} />
            <div className="absolute inset-0 bg-white/10" />
            <CardContent className="p-8 text-center relative z-10 text-white">
              <div className="text-6xl mb-3">{s.icon}</div>
              <p className="text-5xl font-display font-bold">{s.value}</p>
              <p className="text-white/90 font-medium mt-2">{s.label}</p>
            </CardContent>
          </div>
        ))}
      </div>

      {/* Vocabulary List */}
      <div className="rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
          <h2 className="text-2xl font-display font-bold text-white">Meine Vokabeln</h2>
        </div>
        <CardContent className="p-12 text-center">
          <div className="text-7xl mb-6">📖</div>
          <p className="text-xl font-semibold mb-2">Noch keine Vokabeln gesammelt</p>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Starte eine Lektion, um deine erste Vokabel zu lernen und hier zu speichern.
          </p>
          <a href="/learn">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg py-6 px-8">
              Erste Lektion starten →
            </Button>
          </a>
        </CardContent>
      </div>
    </div>
  );
}
