"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-display font-bold text-primary">Hallo! 👋</h1>
          <p className="text-muted-foreground mt-1">Willkommen zurück bei WortHeld</p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
            Level A1
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Level", value: "A1", icon: "🎯", color: "from-green-500 to-emerald-600" },
          { label: "XP heute", value: "0", icon: "⚡", color: "from-amber-500 to-orange-600" },
          { label: "Streak", value: "0", icon: "🔥", color: "from-orange-500 to-red-600" },
          { label: "Herzen", value: "5", icon: "❤️", color: "from-red-500 to-pink-600" },
        ].map((stat, i) => (
          <Card key={i} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`} />
            <CardContent className="p-6 text-center relative z-10">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <p className="text-3xl font-bold font-display text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Daily Goal Card */}
      <Card className="border-0 shadow-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNjBWMGg2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiByZWY9IiNhIi8+PC9zdmc+')]">
        </div>
        <CardContent className="p-8 relative z-10 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-display font-bold">Tagesziel</h2>
              <p className="text-white/80 mt-1">Erreiche 50 XP um deine Serie zu behalten</p>
            </div>
            <div className="text-5xl font-display font-bold">0%</div>
          </div>
          <div className="mt-6">
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <Progress value={0} className="h-full bg-white" />
            </div>
            <p className="text-white/60 text-sm mt-2">0 / 50 XP heute</p>
          </div>
        </CardContent>
      </Card>

      {/* Action Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
          <CardHeader>
            <CardTitle className="text-xl font-display flex items-center gap-2">
              <span>📚</span> Nächste Lektion
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
              <p className="font-semibold text-lg">Hallo! Begrüßungen</p>
              <p className="text-sm text-muted-foreground mt-1">Lerne die Grundlagen der deutschen Begrüßung</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full font-medium">📖 Einheit 1</span>
              <span className="text-muted-foreground">~5 Minuten</span>
              <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full font-medium">+15 XP</span>
            </div>
            <Link href="/learn">
              <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-lg py-6">
                Weiterlernen →
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
          <CardHeader>
            <CardTitle className="text-xl font-display flex items-center gap-2">
              <span>🔄</span> Wiederholungen
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
              <p className="font-semibold text-lg">Keine Wiederholungen fällig</p>
              <p className="text-sm text-muted-foreground mt-1">Du bist aktuell auf dem neuesten Stand!</p>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>⏰ Nächste Wiederholung: Heute 18:00</span>
            </div>
            <Link href="/review">
              <Button variant="outline" className="w-full border-2 hover:bg-emerald-50 text-lg py-6">
                Jetzt wiederholen
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl font-display">Letzte Aktivitäten</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎯</div>
            <p className="text-lg font-medium text-foreground mb-2">Bereit zu starten?</p>
            <p className="text-muted-foreground mb-6">Starte deine erste Lektion und beginne deine Deutsch-Lern-Reise!</p>
            <Link href="/learn">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                Erste Lektion starten →
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
