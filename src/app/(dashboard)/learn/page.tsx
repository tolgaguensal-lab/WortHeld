"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const levelMeta: Record<string, { label: string; color: string; icon: string }> = {
  A1: { label: "Anfänger", color: "from-green-400 to-green-600", icon: "🌱" },
  A2: { label: "Grundlagen", color: "from-blue-400 to-blue-600", icon: "🏙️" },
  B1: { label: "Fortgeschritten", color: "from-orange-400 to-orange-600", icon: "💼" },
  B2: { label: "Selbstständig", color: "from-purple-400 to-purple-600", icon: "🎓" },
  C1: { label: "Experte", color: "from-red-400 to-red-600", icon: "👑" },
};

interface Course {
  id: string;
  level: string;
  name: string;
  description: string;
  totalLessons: number;
  totalUnits: number;
}

export default function LearnPage() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const queryLevel = searchParams.get("level");

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const placementLevel = (queryLevel || (session?.user as any)?.placementLevel) as string | null;

  useEffect(() => {
    fetch("/api/courses")
      .then((r) => r.json())
      .then((data) => setCourses(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-12 w-64 bg-muted rounded-lg" />
          <div className="h-6 w-96 bg-muted rounded" />
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-48 rounded-2xl bg-muted" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-display font-bold gradient-text">Lernpfad</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Wähle einen Kurs und starte deine Deutschreise. Jeder Kurs ist speziell entwickelt, um dich von A1 bis C1 zu begleiten.
        </p>
      </div>

      {placementLevel ? (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-6 flex items-center gap-4 shadow-lg">
          <span className="text-5xl">🎯</span>
          <div className="flex-1">
            <p className="text-lg font-bold text-blue-900 dark:text-blue-100">
              Empfohlenes Niveau: <span className="text-2xl font-display">{placementLevel}</span> &mdash;{" "}
              {levelMeta[placementLevel]?.label || placementLevel}
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
              Basierend auf deinem Einstufungstest. Du kannst jederzeit ein anderes Niveau wählen.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-2xl p-6 flex items-center gap-4 shadow-lg">
          <span className="text-5xl">📋</span>
          <div className="flex-1">
            <p className="text-lg font-bold text-amber-900 dark:text-amber-100">
              Noch kein Einstufungstest gemacht
            </p>
            <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
              Mach den Test (5 Minuten), um dein perfektes Startniveau zu finden.
            </p>
          </div>
          <Link href="/placement-test">
            <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-lg py-6 px-8">
              Test starten →
            </Button>
          </Link>
        </div>
      )}

      <div className="space-y-6">
        {courses.map((course) => {
          const meta = levelMeta[course.level] || { label: course.level, color: "from-gray-400 to-gray-600", icon: "📚" };
          const isRecommended = placementLevel === course.level;
          return (
            <Card
              key={course.id}
              className={`overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] ${
                isRecommended ? "ring-2 ring-blue-500 shadow-xl" : "shadow-lg"
              }`}
            >
              <div className={`relative bg-gradient-to-r ${meta.color} p-8 text-white overflow-hidden`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNjBWMGg2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiByZWY9IiNhIi8+PC9zdmc+')]"></div>
                </div>
                
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center text-5xl shadow-lg">
                      {meta.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className="bg-white/30 text-white border-0 text-base px-4 py-1">{course.level}</Badge>
                        {isRecommended && (
                          <Badge className="bg-blue-500 text-white border-0 text-sm px-4 py-1 animate-gentle-pulse">⭐ Empfohlen</Badge>
                        )}
                      </div>
                      <h2 className="text-3xl font-display font-bold">{course.name}</h2>
                      <p className="text-white/90 text-lg mt-1">{course.description}</p>
                    </div>
                  </div>
                  <Link href={`/learn/${course.id}`}>
                    <Button
                      size="lg"
                      className="bg-white text-gray-900 hover:bg-gray-100 text-lg py-8 px-8 shadow-xl transform hover:scale-105 transition-all"
                    >
                      Starten →
                    </Button>
                  </Link>
                </div>
              </div>
              <CardContent className="p-6 bg-gray-50 dark:bg-gray-900/50">
                <div className="flex items-center justify-center gap-8 text-sm font-medium">
                  <div className="flex items-center gap-2 text-primary">
                    <span className="text-2xl">📚</span>
                    <span className="text-lg">{course.totalUnits} Einheiten</span>
                  </div>
                  <div className="w-px h-8 bg-gray-300 dark:bg-gray-700" />
                  <div className="flex items-center gap-2 text-primary">
                    <span className="text-2xl">🎯</span>
                    <span className="text-lg">{course.totalLessons} Lektionen</span>
                  </div>
                  <div className="w-px h-8 bg-gray-300 dark:bg-gray-700" />
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                    <span className="text-2xl">⚡</span>
                    <span className="text-lg">~{Math.ceil(course.totalLessons * 5 / 60)} Stunden</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
