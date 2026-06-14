"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

interface Question {
  id: number;
  level: string;
  type: "grammar" | "vocabulary" | "reading" | "listening";
  question: string;
  options: string[];
  correctAnswer: number;
}

const questions: Question[] = [
  // A1 Fragen
  { id: 1, level: "A1", type: "grammar", question: '"Ich ___ aus der Türkei."', options: ["komme", "kommst", "kommt", "kommen"], correctAnswer: 0 },
  { id: 2, level: "A1", type: "vocabulary", question: 'Was bedeutet "Tisch"?', options: ["chair", "table", "door", "window"], correctAnswer: 1 },
  { id: 3, level: "A1", type: "grammar", question: '"Das ist ___ Frau."', options: ["ein", "eine", "einer", "eines"], correctAnswer: 1 },
  { id: 4, level: "A1", type: "reading", question: '"Hallo, ich heiße Maria. Ich wohne in Berlin." Wer wohnt in Berlin?', options: ["Hallo", "Maria", "Berlin", "Ich"], correctAnswer: 1 },
  { id: 5, level: "A1", type: "vocabulary", question: 'Welcher Tag kommt nach "Mittwoch"?', options: ["Dienstag", "Donnerstag", "Freitag", "Montag"], correctAnswer: 1 },

  // A2 Fragen
  { id: 6, level: "A2", type: "grammar", question: '"Gestern ___ ich im Kino."', options: ["bin", "war", "habe", "hatte"], correctAnswer: 1 },
  { id: 7, level: "A2", type: "vocabulary", question: 'Was bedeutet "der Termin"?', options: ["the train", "the appointment", "the money", "the letter"], correctAnswer: 1 },
  { id: 8, level: "A2", type: "grammar", question: '"Ich möchte ___ Arzttermin vereinbaren."', options: ["einen", "eine", "einem", "einer"], correctAnswer: 0 },
  { id: 9, level: "A2", type: "reading", question: '"Die Wohnung hat 3 Zimmer, eine Küche und ein Bad. Die Miete ist 850 Euro warm." Wie viele Zimmer hat die Wohnung?', options: ["2", "3", "4", "5"], correctAnswer: 1 },
  { id: 10, level: "A2", type: "grammar", question: '"Kannst du mir ___ helfen?"', options: ["bitte", "mal", "danke", "auch"], correctAnswer: 0 },

  // B1 Fragen
  { id: 11, level: "B1", type: "grammar", question: '"Wenn ich Zeit ___, würde ich mehr Deutsch lernen."', options: ["habe", "hätte", "hatte", "haben"], correctAnswer: 1 },
  { id: 12, level: "B1", type: "vocabulary", question: 'Was bedeutet "die Arbeitserlaubnis"?', options: ["the working hours", "the work permit", "the job interview", "the salary"], correctAnswer: 1 },
  { id: 13, level: "B1", type: "grammar", question: '"Der Mann, ___ gestern angerufen hat, war mein Chef."', options: ["der", "den", "dem", "dessen"], correctAnswer: 0 },
  { id: 14, level: "B1", type: "reading", question: '"Sehr geehrte Damen und Herren, hiermit bewerbe ich mich um die Stelle als Verkäufer." Das ist ein ___ .', options: ["Vertrag", "Brief", "Antrag", "Formular"], correctAnswer: 1 },
  { id: 15, level: "B1", type: "grammar", question: '"Ich habe mich ___ die Stelle beworben."', options: ["für", "um", "auf", "über"], correctAnswer: 1 },

  // B2 Fragen
  { id: 16, level: "B2", type: "grammar", question: '"Der Vertrag, ___ wir gestern unterschrieben haben, ist gültig."', options: ["der", "den", "dem", "dessen"], correctAnswer: 1 },
  { id: 17, level: "B2", type: "vocabulary", question: 'Was bedeutet "die Kündigungsfrist"?', options: ["the notice period", "the termination letter", "the contract clause", "the severance pay"], correctAnswer: 0 },
  { id: 18, level: "B2", type: "grammar", question: '"Es wird erwartet, dass ___ pünktlich erscheint."', options: ["man", "er", "wer", "jemand"], correctAnswer: 0 },
  { id: 19, level: "B2", type: "vocabulary", question: '"Die Firma sucht einen Mitarbeiter ___ guter Deutschkenntnisse."', options: ["mit", "bei", "durch", "für"], correctAnswer: 0 },
  { id: 20, level: "B2", type: "reading", question: '"Laut Geschäftsbericht konnte das Unternehmen seinen Umsatz im letzten Quartal um 15% steigern." Was ist passiert?', options: ["Der Umsatz ist gefallen", "Der Umsatz ist gestiegen", "Der Umsatz ist gleich", "Das Unternehmen ist pleite"], correctAnswer: 1 },
];

export default function PlacementTestPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const q = questions[currentQuestion];
  const progress = ((currentQuestion) / questions.length) * 100;

  // Save results when test completes
  useEffect(() => {
    if (!isComplete || saved || saving) return;
    saveResult();
  }, [isComplete]);

  const saveResult = async () => {
    setSaving(true);
    setSaveError(null);
    const level = calculateResult();
    try {
      const res = await fetch("/api/placement-test/result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score: calculateScore(), level, answers }),
      });
      if (!res.ok) throw new Error("Fehler beim Speichern");
      setSaved(true);
    } catch (err) {
      setSaveError("Ergebnis konnte nicht gespeichert werden. Du kannst später fortfahren.");
    } finally {
      setSaving(false);
    }
  };

  const calculateScore = () => {
    return answers.filter((a, i) => a === questions[i].correctAnswer).length;
  };

  const handleAnswer = () => {
    if (selectedOption === null) return;
    setAnswers([...answers, selectedOption]);
    setSelectedOption(null);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsComplete(true);
    }
  };

  const calculateResult = () => {
    const levelScores: Record<string, { correct: number; total: number }> = {
      A1: { correct: 0, total: 0 },
      A2: { correct: 0, total: 0 },
      B1: { correct: 0, total: 0 },
      B2: { correct: 0, total: 0 },
    };

    questions.forEach((q, i) => {
      levelScores[q.level].total++;
      if (answers[i] === q.correctAnswer) {
        levelScores[q.level].correct++;
      }
    });

    // Determine highest level with >= 60% correct
    const levels = ["A1", "A2", "B1", "B2"];
    let recommendedLevel = "A1";

    for (const level of levels) {
      const s = levelScores[level];
      if (s.total > 0 && s.correct / s.total >= 0.6) {
        recommendedLevel = level;
      }
    }

    // If B2 is achieved, suggest C1
    if (recommendedLevel === "B2" && levelScores["B2"].correct / levelScores["B2"].total >= 0.8) {
      recommendedLevel = "C1";
    }

    return recommendedLevel;
  };

  if (isComplete) {
    const result = calculateResult();
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <Card className="max-w-lg w-full">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">🎯</div>
            <h1 className="text-3xl font-display font-bold mb-2">
              Dein Ergebnis
            </h1>
            <p className="text-muted-foreground mb-6">
              Basierend auf deinen Antworten empfehlen wir:
            </p>
            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-5xl font-bold py-6 rounded-xl mb-6">
              {result}
            </div>

            {saving && (
              <div className="text-sm text-muted-foreground mb-4 animate-pulse">
                Speichere Ergebnis...
              </div>
            )}
            {saveError && (
              <div className="text-sm text-red-500 mb-4">{saveError}</div>
            )}

            <p className="text-sm text-muted-foreground mb-6">
              {result === "A1" && "Du bist Anfänger. Starte mit den Grundlagen."}
              {result === "A2" && "Du hast grundlegende Kenntnisse. Baue sie aus."}
              {result === "B1" && "Gut! Du kannst dich im Alltag verständigen."}
              {result === "B2" && "Sehr gut! Du bist bereit für komplexe Themen."}
              {result === "C1" && "Hervorragend! Du hast schon fortgeschrittene Kenntnisse."}
            </p>
            <div className="flex flex-col gap-3">
              <Button
                onClick={() => router.push(`/learn?level=${result}`)}
                className="w-full text-lg py-6"
                disabled={saving}
              >
                Kurs auf Niveau {result} starten
              </Button>
              <button
                onClick={() => router.push("/onboarding")}
                className="text-sm text-muted-foreground hover:underline"
              >
                Ergebnisse überspringen, Sprache wählen
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardContent className="p-6 md:p-8">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Frage {currentQuestion + 1} von {questions.length}</span>
              <span>Niveau: {q.level}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question Type Badge */}
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
              {q.type === "grammar" && "Grammatik"}
              {q.type === "vocabulary" && "Wortschatz"}
              {q.type === "reading" && "Leseverstehen"}
              {q.type === "listening" && "Hörverstehen"}
            </span>
            <span className="inline-block ml-2 px-3 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              {q.level}
            </span>
          </div>

          {/* Question */}
          <h2 className="text-xl font-semibold mb-6">{q.question}</h2>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {q.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedOption(idx)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  selectedOption === idx
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                }`}
              >
                <span className="font-medium">{String.fromCharCode(65 + idx)}.</span> {option}
              </button>
            ))}
          </div>

          {/* Next Button */}
          <Button
            onClick={handleAnswer}
            disabled={selectedOption === null}
            className="w-full py-6 text-lg"
          >
            {currentQuestion + 1 < questions.length ? "Weiter" : "Ergebnis anzeigen"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
