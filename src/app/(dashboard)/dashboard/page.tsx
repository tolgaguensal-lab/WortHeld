"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Hallo! 👋</h1>
          <p className="text-muted-foreground">Willkommen zurück bei DeutschQuest</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Level", value: "A1", icon: "🎯", color: "text-green-600" },
          { label: "XP heute", value: "0", icon: "⚡", color: "text-amber-600" },
          { label: "Streak", value: "0 Tage", icon: "🔥", color: "text-orange-500" },
          { label: "Herzen", value: "5/5", icon: "❤️", color: "text-red-500" },
        ].map((stat, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <p className={`text-2xl font-bold font-display ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-display font-semibold">Tagesziel</h2>
              <p className="text-white/80">0 / 50 XP heute</p>
            </div>
            <div className="text-4xl font-bold">0%</div>
          </div>
          <Progress value={0} className="mt-4 bg-white/20" />
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-display">Nächste Lektion</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Hallo! Begrüßungen</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <span>📖 Einheit 1</span>
              <span>•</span>
              <span>~5 Minuten</span>
              <span>•</span>
              <span>+15 XP</span>
            </div>
            <Link href="/learn">
              <Button className="w-full">Weiterlernen</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-display">Wiederholungen fällig</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Keine Wiederholungen fällig</p>
            <Link href="/review">
              <Button variant="outline" className="w-full">Jetzt wiederholen</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-display">Letzte Aktivitäten</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">Noch keine Aktivitäten. Starte deine erste Lektion!</p>
        </CardContent>
      </Card>
    </div>
  );
}
