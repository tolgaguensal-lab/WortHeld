"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight, Target, TrendingUp, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function PlacementResultPage() {
  const router = useRouter();

  // In production, this data would be fetched from the UserProfile API
  const result = {
    level: "A2.1",
    scorePercentage: 68,
    strengths: ["Vocabulary (A1)", "Basic Greetings", "Daily Routine"],
    weaknesses: ["Dative Case", "Sentence Structure (B1)", "Listening Compression"],
    recommendedStart: "Module 3 of A2",
    learningPlan: {
      intensive: "4 weeks (10h/week)",
      standard: "8 weeks (5h/week)",
      relaxed: "12 weeks (2h/week)",
    },
    canDoStatements: [
      "Kann einfache Gespräche über Gesundheit und Arzttermine führen.",
      "Kann kurze Alltagstexte verstehen und schreiben.",
      "Kann einfache Beschreibungen über die eigene Familie geben.",
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold text-slate-900">Dein Analysebericht</h1>
          <p className="text-slate-600">Basierend auf deinen Antworten haben wir deinen Lernpfad optimiert.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Level Card */}
          <Card className="md:col-span-2 border-none shadow-xl bg-white overflow-hidden">
            <div className="h-2 bg-blue-600" />
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold">Dein aktuelles Niveau</CardTitle>
                <CardDescription>Basierend auf GER/CEFR Standards</CardDescription>
              </div>
              <Badge className="text-lg px-4 py-1 bg-blue-600 text-white border-none">
                {result.level}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <Target className="text-blue-600" />
                  <span className="font-medium text-slate-700">Empfohlener Startpunkt:</span>
                </div>
                <span className="font-bold text-blue-700">{result.recommendedStart}</span>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-green-500" /> 
                  Was du bereits beherrschst:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {result.strengths.map((s, i) => (
                    <div key={i} className="p-2 text-sm bg-green-50 text-green-700 rounded-lg border border-green-100">
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                  <AlertCircle size={18} className="text-amber-500" /> 
                  Hier gibt es noch Potenzial:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {result.weaknesses.map((w, i) => (
                    <div key={i} className="p-2 text-sm bg-amber-50 text-amber-700 rounded-lg border border-amber-100">
                      {w}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Learning Plan Card */}
          <Card className="border-none shadow-xl bg-white">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <TrendingUp size={20} className="text-blue-600" />
                Lernplan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(result.learningPlan).map(([type, duration]) => (
                <div key={type} className="p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="text-xs font-bold uppercase text-slate-400 mb-1">
                    {type === 'intensive' ? 'Intensiv' : type === 'standard' ? 'Standard' : 'Entspannt'}
                  </div>
                  <div className="text-sm font-semibold text-slate-700 group-hover:text-blue-600">{duration}</div>
                </div>
              ))}
              <div className="pt-4">
                <Button className="w-full py-6 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-lg" onClick={() => router.push("/dashboard")}>
                  Jetzt starten <ArrowRight className="ml-2" size={18} />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-none shadow-lg bg-white">
          <CardHeader>
            <CardTitle className="text-xl">Deine nächsten konkreten Lernziele</CardTitle>
            <CardDescription>Sobald du startest, fokussieren wir uns auf diese Kompetenzen:</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {result.canDoStatements.map((statement, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="mt-1 w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 text-xs font-bold">
                    {i + 1}
                  </div>
                  <span className="text-slate-700">{statement}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
