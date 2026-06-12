"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const units = [
  { id: "unit-1", name: "Begrüßung & Vorstellung", desc: "Begrüßen und vorstellen", color: "#22c55e", lessons: [
    { id: "lesson-1", name: "Hallo! Begrüßungen", xp: 15, done: false, current: true },
    { id: "lesson-2", name: "Wie heißt du?", xp: 15, done: false, locked: true },
    { id: "lesson-3", name: "Woher kommst du?", xp: 15, done: false, locked: true },
  ]},
  { id: "unit-2", name: "Zahlen & Zeit", desc: "Zahlen und Uhrzeit", color: "#3b82f6", lessons: [
    { id: "lesson-4", name: "Zahlen von 1-100", xp: 15, done: false, locked: true },
    { id: "lesson-5", name: "Uhrzeit und Wochentage", xp: 15, done: false, locked: true },
  ]},
  { id: "unit-3", name: "Familie & Menschen", desc: "Familie und Körper", color: "#f59e0b", lessons: [
    { id: "lesson-6", name: "Meine Familie", xp: 15, done: false, locked: true },
    { id: "lesson-7", name: "Körper und Farben", xp: 15, done: false, locked: true },
  ]},
];

export default function CoursePage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Link href="/learn" className="text-primary hover:underline text-sm mb-4 inline-block">← Zurück zum Lernpfad</Link>
      <h1 className="text-3xl font-display font-bold mb-8">Deutsch im Alltag - A1</h1>

      <div className="space-y-8">
        {units.map((unit, ui) => (
          <div key={unit.id}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: unit.color }}>
                {ui + 1}
              </div>
              <div>
                <h2 className="text-xl font-display font-semibold">{unit.name}</h2>
                <p className="text-sm text-muted-foreground">{unit.desc}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 ml-5">
              {unit.lessons.map((lesson, li) => (
                <div key={lesson.id} className={`relative ${li < unit.lessons.length - 1 ? "after:content-[''] after:absolute after:top-1/2 after:left-full after:w-4 after:h-0.5 after:bg-border" : ""}`}>
                  {lesson.locked ? (
                    <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-2xl cursor-not-allowed">
                      🔒
                    </div>
                  ) : lesson.current ? (
                    <Link href={`/learn/a1/${lesson.id}`}>
                      <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-2xl animate-pulse-glow hover:scale-110 transition-transform cursor-pointer">
                        📖
                      </div>
                    </Link>
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-green-500 flex items-center justify-center text-2xl">
                      ✅
                    </div>
                  )}
                  <p className="text-xs text-center mt-1 text-muted-foreground w-16 truncate">{lesson.name.split(" ")[0]}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
