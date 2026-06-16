"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ReviewPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-display font-bold gradient-text">Wiederholung</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Wiederhole gelernte Vokabeln mit Spaced Repetition für nachhaltigen Lernerfolg
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Wiederholungen heute", value: "0", icon: "🔄" },
          { label: "Insgesamt gelernt", value: "0", icon: "📚" },
          { label: "Lernserie", value: "0 Tage", icon: "🔥" },
        ].map((s, i) => (
          <Card key={i} className="text-center shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="text-4xl mb-2">{s.icon}</div>
              <p className="text-3xl font-display font-bold text-primary">{s.value}</p>
              <p className="text-sm text-muted-foreground font-medium">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-8">
          <div className="text-6xl">✅</div>
        </div>
        <CardContent className="p-12 text-center">
          <h2 className="text-2xl font-display font-bold mb-4">Keine Wiederholungen fällig!</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Du bist aktuell auf dem neuesten Stand. Schau später wieder vorbei oder lerne neue Lektionen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/learn">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg py-6 px-8">
                Neue Lektionen lernen →
              </Button>
            </a>
            <a href="/dashboard">
              <Button size="lg" variant="outline" className="border-2 text-lg py-6 px-8">
                Zum Dashboard
              </Button>
            </a>
          </div>
        </CardContent>
      </div>
    </div>
  );
}
