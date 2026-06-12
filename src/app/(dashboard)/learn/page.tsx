"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const courses = [
  { id: "a1", level: "A1", name: "Dorfleben", desc: "Grundlagen im Alltag", color: "from-green-400 to-green-600", icon: "🏘️", lessons: 7, progress: 0 },
  { id: "a2", level: "A2", name: "Stadt", desc: "Im Alltag zurechtkommen", color: "from-blue-400 to-blue-600", icon: "🏙️", lessons: 8, progress: 0, locked: true },
  { id: "b1", level: "B1", name: "Arbeitsplatz", desc: "Beruf und Karriere", color: "from-orange-400 to-orange-600", icon: "💼", lessons: 8, progress: 0, locked: true },
  { id: "b2", level: "B2", name: "Universität", desc: "Studium und Forschung", color: "from-purple-400 to-purple-600", icon: "🎓", lessons: 8, progress: 0, locked: true },
  { id: "c1", level: "C1", name: "Meisterklasse", desc: "Fortgeschrittenes Deutsch", color: "from-red-400 to-red-600", icon: "👑", lessons: 8, progress: 0, locked: true },
];

export default function LearnPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-display font-bold mb-2">Lernpfad</h1>
      <p className="text-muted-foreground mb-8">Wähle ein Kurs und starte deine Deutschreise</p>

      <div className="space-y-6">
        {courses.map((course) => (
          <Card key={course.id} className={`overflow-hidden transition-all ${course.locked ? "opacity-60" : "hover:shadow-lg"}`}>
            <div className={`bg-gradient-to-r ${course.color} p-6 text-white`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{course.icon}</span>
                  <div>
                    <Badge className="bg-white/20 text-white border-0 mb-1">{course.level}</Badge>
                    <h2 className="text-2xl font-display font-bold">{course.name}</h2>
                    <p className="text-white/80">{course.desc}</p>
                  </div>
                </div>
                {course.locked ? (
                  <div className="text-3xl">🔒</div>
                ) : (
                  <Link href={`/learn/${course.id}`}>
                    <Button className="bg-white text-gray-900 hover:bg-white/90">Starten</Button>
                  </Link>
                )}
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{course.lessons} Lektionen</span>
                <span>{course.progress}% abgeschlossen</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
