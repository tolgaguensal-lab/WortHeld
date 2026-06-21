"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen, GraduationCap, Clock, ChevronRight, Sparkles, Target, Library, ArrowRight, Lock, ShoppingCart } from "lucide-react";

const levelMeta: Record<string, { label: string; accent: string; border: string; text: string }> = {
  A1: { label: "Anfanger", accent: "from-primary to-primary-hover", border: "border-primary/20", text: "text-primary dark:text-primary-foreground/80" },
  A2: { label: "Grundlagen", accent: "from-sky-500 to-sky-600", border: "border-sky-500/20", text: "text-sky-600 dark:text-sky-400" },
  B1: { label: "Fortgeschritten", accent: "from-amber-500 to-amber-600", border: "border-amber-500/20", text: "text-amber-600 dark:text-amber-400" },
  B2: { label: "Selbstandig", accent: "from-primary to-primary/80", border: "border-purple-500/20", text: "text-purple-600 dark:text-purple-400" },
  C1: { label: "Experte", accent: "from-rose-500 to-rose-600", border: "border-rose-500/20", text: "text-rose-600 dark:text-rose-400" },
};

interface Course { id: string; level: string; name: string; description: string; totalLessons: number; totalUnits: number; }

export default function LearnPage() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryLevel = searchParams.get("level");
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const placementLevel = (queryLevel || (session?.user as any)?.placementLevel) as string | null;

  useEffect(() => {
    fetch("/api/courses").then((r) => r.json()).then((data) => setCourses(data)).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-6 max-w-6xl mx-auto space-y-6">
        <div className="animate-pulse space-y-6">
          <div className="h-10 w-48 bg-muted rounded-lg" />
          <div className="h-6 w-80 bg-muted rounded" />
          {[1, 2, 3].map((i) => (<div key={i} className="h-52 rounded-2xl bg-muted" />))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 md:p-8 max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">Lernpfad</h1>
        <p className="text-muted-foreground max-w-xl mx-auto text-sm">
          Wahle einen Kurs und starte deine Deutschreise – von A1 bis C1.
        </p>
      </div>

      {placementLevel ? (
        <div className="card-premium p-5 md:p-6 flex items-center gap-4 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Target size={24} className="text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-foreground">
              Empfohlenes Niveau: <span className="text-xl font-display font-bold text-primary">{placementLevel}</span>
              <span className="text-muted-foreground font-normal"> &mdash; {levelMeta[placementLevel]?.label}</span>
            </p>
            <p className="text-sm text-muted-foreground mt-0.5">Basierend auf deinem Einstufungstest.</p>
          </div>
        </div>
      ) : (
        <div className="card-premium p-5 md:p-6 flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200/50 dark:border-amber-800/30">
          <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
            <Sparkles size={24} className="text-amber-600 dark:text-amber-400" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="font-semibold text-foreground">Noch kein Einstufungstest gemacht</p>
            <p className="text-sm text-muted-foreground mt-0.5">Finde in 5 Minuten dein perfektes Startniveau.</p>
          </div>
          <Link href="/placement-test">
            <Button className="shrink-0 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-lg shadow-amber-600/20">
              Test starten <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      )}

      <div className="space-y-5">
        {courses.map((course: any) => {
          const meta = levelMeta[course.level] || { label: course.level, accent: "from-gray-500 to-gray-600", border: "border-gray-500/20", text: "text-gray-600" };
          const isRecommended = placementLevel === course.level;
          const hasAccess = course.levelAccess !== false;
          return (
            <div key={course.id} className={`card-premium overflow-hidden ${isRecommended ? "ring-2 ring-primary/30" : ""} ${!hasAccess ? "opacity-70" : ""}`}>
              <div className={`bg-gradient-to-r ${meta.accent} p-6 md:p-8 text-primary-foreground relative ${!hasAccess ? "grayscale-[30%]" : ""}`}>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNjBWMGg2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgcmVmPSJhIi8+PC9zdmc+')] opacity-50" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-primary-muted/50 flex items-center justify-center backdrop-blur-sm">
                      {hasAccess ? <GraduationCap size={32} className="text-primary-foreground" /> : <Lock size={32} className="text-primary-foreground/70" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="badge-premium bg-primary-muted/50 text-primary-foreground border-0 text-sm">{course.level}</span>
                        {isRecommended && <span className="badge-premium bg-primary-muted text-primary-foreground border-0 text-xs animate-pulse">Empfohlen</span>}
                        {!hasAccess && <span className="badge-premium bg-muted/50 text-primary-foreground/60 border-0 text-xs">In-App-Kauf</span>}
                      </div>
                      <h2 className="text-xl md:text-2xl font-display font-bold">{course.name}</h2>
                      <p className="text-primary-foreground/80 text-sm mt-0.5">{course.description}</p>
                    </div>
                  </div>
                  {hasAccess ? (
                    <Link href={`/learn/${course.id}`}>
                      <Button className="bg-card text-foreground hover:bg-card/90 shadow-xl shrink-0 group">
                        Starten <ChevronRight size={16} className="ml-1 group-hover:translate-x-0.5 transition-transform" />
                      </Button>
                    </Link>
                  ) : (
                    <Button className="bg-muted text-primary-foreground border border-border hover:bg-primary-muted/50 shadow-xl shrink-0 group" variant="outline">
                      <ShoppingCart size={16} className="mr-2" />Freischalten
                    </Button>
                  )}
                </div>
              </div>
              <CardContent className="p-4 bg-card border-t border-border/40">
                <div className="flex items-center justify-center gap-6 text-xs md:text-sm">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Library size={14} /><span className="font-medium">{course.totalUnits} Einheiten</span>
                  </div>
                  <div className="w-px h-4 bg-border" />
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <BookOpen size={14} /><span className="font-medium">{course.totalLessons} Lektionen</span>
                  </div>
                  <div className="w-px h-4 bg-border" />
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock size={14} /><span className="font-medium">~{Math.ceil(course.totalLessons * 5 / 60)} Std.</span>
                  </div>
                </div>
              </CardContent>
            </div>
          );
        })}
      </div>
    </div>
  );
}
