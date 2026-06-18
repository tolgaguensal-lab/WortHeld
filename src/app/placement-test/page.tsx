"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, ChevronLeft, CheckCircle2, BrainCircuit, GraduationCap, BookOpen, Brain, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Professional Questions for the placement test
const PLACEMENT_QUESTIONS = [
  {
    id: "q1",
    level: "A1",
    skill: "VOCABULARY",
    question: "Wie sagt man 'Hello' auf Deutsch?",
    options: ["Ich bin 20 Jahre alt.", "Hallo", "Tschüss", "Danke"],
    correctOption: "Hallo",
  },
  {
    id: "q2",
    level: "A1",
    skill: "GRAMMAR",
    question: "Ich ___ aus Berlin.",
    options: ["bin", "komme", "ist", "sind"],
    correctOption: "komme",
  },
  {
    id: "q3",
    level: "A2",
    skill: "VOCABULARY",
    question: "Was bedeutet 'das Rathaus'?",
    options: ["Hospital", "City Hall", "School", "Library"],
    correctOption: "City Hall",
  },
  {
    id: "q4",
    level: "A2",
    skill: "GRAMMAR",
    question: "Gestern ___ ich im Kino.",
    options: ["bin", "war", "habe", "hatte"],
    correctOption: "war",
  },
  {
    id: "q5",
    level: "B1",
    skill: "GRAMMAR",
    question: "Ich glaube, dass er heute ___ kommt.",
    options: ["nicht", "kein", "keine", "keinen"],
    correctOption: "nicht",
  },
  {
    id: "q6",
    level: "B1",
    skill: "VOCABULARY",
    question: "Was bedeutet 'verantwortungsbewusst'?",
    options: [" Sehr schnell", "Zuverlässig", "Unfreundlich", "Laut"],
    correctOption: "Zuverlässig",
  },
  {
    id: "q7",
    level: "B2",
    skill: "GRAMMAR",
    question: "Trotz ___ starken Regens gingen sie spazieren.",
    options: ["des", "dem", "den", "der"],
    correctOption: "des",
  },
  {
    id: "q8",
    level: "B2",
    skill: "VOCABULARY",
    question: "Welches Wort ist ein Synonym für 'effizient'?",
    options: ["langsam", "wirkungsvoll", "kompliziert", "teuer"],
    correctOption: "wirkungsvoll",
  },
  {
    id: "q9",
    level: "C1",
    skill: "GRAMMAR",
    question: "Hätte er mehr gelernt, ___ die Prüfung bestanden.",
    options: ["würde er", "hätte er", "hatte er", "wäre er"],
    correctOption: "hätte er",
  },
  {
    id: "q10",
    level: "C1",
    skill: "VOCABULARY",
    question: "Was bedeutet 'ambivalent'?",
    options: ["Eindeutig", "Zweideutig", "Sehr stark", "Unwichtig"],
    correctOption: "Zweideutig",
  },
];

export default function PlacementTestPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = PLACEMENT_QUESTIONS.length + 1; 
  const progress = (step / totalSteps) * 100;

  const handleStart = () => setStep(1);

  const handleAnswer = (option: string) => {
    const question = PLACEMENT_QUESTIONS[step - 1];
    const answer = {
      questionId: question.id,
      selectedOptionId: option,
      isCorrect: option === question.correctOption,
      level: question.level,
      skill: question.skill,
    };
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    
    if (step < PLACEMENT_QUESTIONS.length) {
      setStep(step + 1);
    } else {
      setStep(step + 1); 
      submitResults(newAnswers);
    }
  };

  const submitResults = async (finalAnswers: any[]) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/placement-test/result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: finalAnswers }),
      });
      if (res.ok) {
        router.push("/(dashboard)/onboarding/result");
      } else {
        alert("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
      }
    } catch (e) {
      alert("Netzwerkfehler.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Einstufungstest</h1>
          <p className="text-slate-600">Finde dein perfektes Sprachniveau für einen optimalen Lernstart.</p>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2 text-slate-500">
            <span>Fortschritt</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="border-none shadow-xl bg-white overflow-hidden">
                <div className="h-2 bg-blue-600" />
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                    <GraduationCap size={32} />
                  </div>
                  <CardTitle className="text-2xl">Willkommen zum Test</CardTitle>
                  <CardDescription className="text-base">
                    Dieser Test analysiert dein Wissen von A1 bis C1. <br />
                    Beantworte die Fragen ehrlich, um den idealen Lernpfad zu erhalten.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center py-6">
                  <ul className="text-left max-w-xs mx-auto space-y-3 text-slate-600 text-sm">
                    <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> 10 gezielte Fragen</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Analyse von Grammatik & Wortschatz</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Sofortige Niveaustufung (GER/CEFR)</li>
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-center pb-8">
                  <Button size="lg" className="px-8 py-6 text-lg rounded-full bg-blue-600 hover:bg-blue-700" onClick={handleStart}>
                    Jetzt starten <ChevronRight className="ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}

          {step > 0 && step <= PLACEMENT_QUESTIONS.length && (
            <motion.div 
              key={`question-${step}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="border-none shadow-xl bg-white">
                <CardHeader>
                  <div className="flex justify-between items-center mb-4">
                    <Badge level={PLACEMENT_QUESTIONS[step-1].level} />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {PLACEMENT_QUESTIONS[step-1].skill}
                    </span>
                  </div>
                  <CardTitle className="text-xl leading-relaxed">
                    {PLACEMENT_QUESTIONS[step-1].question}
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-3 py-6">
                  {PLACEMENT_QUESTIONS[step-1].options.map((option, idx) => (
                    <Button 
                      key={idx} 
                      variant="outline" 
                      className="text-left justify-start h-auto py-4 px-4 hover:bg-blue-50 hover:border-blue-300 transition-all rounded-xl"
                      onClick={() => handleAnswer(option)}
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 text-xs flex items-center justify-center mr-3 shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      {option}
                    </Button>
                  ))}
                </CardContent>
                <CardFooter className="flex justify-between py-6 border-t border-slate-50">
                  <Button 
                    variant="ghost" 
                    onClick={() => setStep(step - 1)} 
                    disabled={step === 1}
                    className="text-slate-400"
                  >
                    <ChevronLeft size={16} className="mr-2" /> Zurück
                  </Button>
                  <div className="text-slate-300">
                    <BrainCircuit size={20} />
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          )}

          {step > PLACEMENT_QUESTIONS.length && (
            <motion.div 
              key="final"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className="border-none shadow-xl bg-white text-center">
                <CardHeader>
                  <div className="mx-auto w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 size={40} />
                  </div>
                  <CardTitle className="text-2xl">Test abgeschlossen!</CardTitle>
                  <CardDescription className="text-base">
                    Wir analysieren nun deine Antworten, um deinen Lernpfad zu erstellen.
                  </CardDescription>
                </CardHeader>
                <CardContent className="py-8">
                  <p className="text-slate-500 text-sm mb-6">
                    Du hast alle {PLACEMENT_QUESTIONS.length} Fragen beantwortet. <br />
                    Klicke auf den Button, um dein Ergebnis zu sehen.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-center pb-8">
                  <Button 
                    size="lg" 
                    className="px-12 py-6 text-lg rounded-full bg-blue-600 hover:bg-blue-700" 
                    onClick={() => submitResults(answers)}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Analysiere..." : "Ergebnis anzeigen"}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function Badge({ level }: { level: string }) {
  const colors: Record<string, string> = {
    A1: "bg-green-100 text-green-700",
    A2: "bg-blue-100 text-blue-700",
    B1: "bg-indigo-100 text-indigo-700",
    B2: "bg-purple-100 text-purple-700",
    C1: "bg-red-100 text-red-700",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tighter ${colors[level] || "bg-slate-100 text-slate-700"}`}>
      {level}
    </span>
  );
}
