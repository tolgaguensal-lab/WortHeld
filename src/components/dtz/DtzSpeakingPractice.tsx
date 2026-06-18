"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FeedbackCard } from "@/components/shared/FeedbackCard";
import { Mic, MicOff, Play, RotateCcw, MessageSquare, User, Bot, Loader2 } from "lucide-react";

interface DtzRoleplayProps {
  scenario: DtzScenario;
  onComplete: (score: number) => void;
}

export interface DtzScenario {
  id: string;
  title: string;
  context: string;
  role: string;
  partnerRole: string;
  prompts: string[];
  tips: string[];
}

const scenarios: DtzScenario[] = [
  {
    id: "dtz-party",
    title: "Gemeinsam eine Party planen",
    context: "Sie und Ihr Nachbar möchten eine gemeinsame Geburtstagsparty organisieren.",
    role: "Sie",
    partnerRole: "Ihr Nachbar / Ihre Nachbarin",
    prompts: [
      "Schlagen Sie vor, wann und wo die Party stattfinden soll.",
      "Fragen Sie, wer eingeladen werden soll.",
      "Besprechen Sie, wer was mitbringt (Essen, Getränke, Musik).",
      "Einigen Sie sich auf einen Plan.",
    ],
    tips: [
      "Nutzen Sie 'Wir könnten...' für Vorschläge.",
      "Nutzen Sie 'Was hältst du von...?' für Meinungen.",
      "Nutzen Sie 'Einverstanden' oder 'Gute Idee' für Zustimmung.",
    ],
  },
  {
    id: "dtz-doctor",
    title: "Einen Arzttermin vereinbaren",
    context: "Sie rufen in einer Arztpraxis an, um einen Termin zu vereinbaren.",
    role: "Sie (Patient/in)",
    partnerRole: "Arzthelfer/in",
    prompts: [
      "Nennen Sie Ihren Namen und Ihr Anliegen.",
      "Beschreiben Sie kurz Ihre Symptome.",
      "Fragen Sie nach einem passenden Termin.",
      "Bestätigen Sie den Termin und fragen Sie, was Sie mitbringen müssen.",
    ],
    tips: [
      "Nutzen Sie 'Ich möchte einen Termin vereinbaren.' als Einleitung.",
      "Nutzen Sie 'Seit wann haben Sie die Beschwerden?' als Gegenfrage.",
      "Die Versichertenkarte nicht vergessen!",
    ],
  },
  {
    id: "dtz-housing",
    title: "Eine Wohnung besichtigen",
    context: "Sie besichtigen eine Wohnung und sprechen mit dem Vermieter.",
    role: "Sie (Mietinteressent/in)",
    partnerRole: "Vermieter/in",
    prompts: [
      "Stellen Sie sich vor und sagen Sie, warum Sie die Wohnung interessiert.",
      "Fragen Sie nach der Miete, Nebenkosten und Kaution.",
      "Fragen Sie nach der Einrichtung und ob Haustiere erlaubt sind.",
      "Vereinbaren Sie die nächsten Schritte.",
    ],
    tips: [
      "Nutzen Sie 'Wie hoch ist die Warmmiete?' für Mietfragen.",
      "Nutzen Sie 'Ist die Wohnung möbliert?' für Einrichtungsfragen.",
      "Fragen Sie nach der Kaution: 'Wie viele Monatsmieten Kaution?'",
    ],
  },
  {
    id: "dtz-office",
    title: "Bei der Meldebehörde",
    context: "Sie sind beim Bürgeramt, um sich anzumelden.",
    role: "Sie (Bürger/in)",
    partnerRole: "Sachbearbeiter/in",
    prompts: [
      "Sagen Sie, warum Sie heute da sind.",
      "Geben Sie Ihre persönlichen Daten an (Name, Adresse, Geburtsdatum).",
      "Fragen Sie, welche Dokumente benötigt werden.",
      "Erkundigen Sie sich, wie lange die Bearbeitung dauert.",
    ],
    tips: [
      "Nutzen Sie 'Ich möchte mich anmelden.' als Einleitung.",
      "Halten Sie Personalausweis/Reisepass und Wohnungsgeberbestätigung bereit.",
      "Nutzen Sie 'Welche Unterlagen brauche ich noch?' für Nachfragen.",
    ],
  },
  {
    id: "dtz-school",
    title: "Ein Elterngespräch in der Schule",
    context: "Sie sprechen mit der Lehrerin Ihres Kindes über seine Fortschritte.",
    role: "Sie (Elternteil)",
    partnerRole: "Lehrer/in",
    prompts: [
      "Begrüßen Sie und fragen Sie nach dem allgemeinen Eindruck.",
      "Erkundigen Sie sich nach den Stärken Ihres Kindes.",
      "Fragen Sie, wo noch Verbesserungsbedarf besteht.",
      "Besprechen Sie, wie Sie zu Hause unterstützen können.",
    ],
    tips: [
      "Nutzen Sie 'Wie kommt mein Kind im Unterricht mit?' als Einstiegsfrage.",
      "Nutzen Sie 'Was können wir zu Hause üben?' für Unterstützungsideen.",
      "Bleiben Sie positiv und lösungsorientiert.",
    ],
  },
];

export function DtzSpeakingPractice({ scenario, onComplete }: DtzRoleplayProps) {
  const [step, setStep] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const currentPrompt = scenario.prompts[step];
  const isComplete = step >= scenario.prompts.length;

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
      mediaRecorderRef.current = mediaRecorder;

      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = async () => {
        setIsProcessing(true);
        // In production: send audio blob to speech-to-text + AI feedback API
        // For now: simulate processing
        await new Promise((r) => setTimeout(r, 1500));
        const simulatedText = `[Aufnahme zu: "${currentPrompt}"]`;
        setTranscript((prev) => [...prev, simulatedText]);
        setFeedback("Gut gesprochen! Deine Aussprache wird besser. Achte auf die Satzmelodie bei Fragen.");
        setScore((prev) => prev + 1);
        setIsProcessing(false);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch {
      // Fallback: simulate recording without actual microphone
      setIsRecording(true);
    }
  }

  function stopRecording() {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((t) => t.stop());
    } else {
      // Simulated mode
      setIsProcessing(true);
      setTimeout(() => {
        const simulatedText = `[Aufnahme zu: "${currentPrompt}"]`;
        setTranscript((prev) => [...prev, simulatedText]);
        setFeedback("Weiter so! Versuche, vollständige Sätze zu bilden.");
        setScore((prev) => prev + 1);
        setIsProcessing(false);
      }, 1500);
    }
    setIsRecording(false);
  }

  function nextStep() {
    setFeedback(null);
    if (step < scenario.prompts.length - 1) {
      setStep((s) => s + 1);
    } else {
      onComplete(score);
    }
  }

  if (isComplete) {
    const percent = Math.round((score / scenario.prompts.length) * 100);
    return (
      <div className="space-y-6 text-center py-8">
        <div className="w-20 h-20 mx-auto rounded-full bg-success-muted flex items-center justify-center">
          <MessageSquare size={32} className="text-success" />
        </div>
        <h3 className="text-xl font-display font-semibold text-foreground">Rollenspiel abgeschlossen!</h3>
        <p className="text-muted-foreground">
          Du hast {score} von {scenario.prompts.length} Gesprächssituationen gemeistert ({percent}%).
        </p>
        <FeedbackCard
          type={percent >= 70 ? "success" : "info"}
          title={percent >= 70 ? "Bereit für die DTZ!" : "Gut dabei!"}
          message={
            percent >= 70
              ? "Deine Kommunikationsfähigkeit ist auf DTZ-Niveau. Weiter so!"
              : "Übe weiter. Die DTZ-Sprechprüfung bewertet Verständlichkeit und kommunikative Kompetenz."
          }
        />
        <Button variant="outline" onClick={() => onComplete(score)}>
          Zurück zur Übersicht
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Scenario Header */}
      <Card variant="elevated" className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-primary-muted flex items-center justify-center">
            <MessageSquare size={16} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-sm">{scenario.title}</h3>
            <p className="text-xs text-muted-foreground">{scenario.context}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Schritt {step + 1} von {scenario.prompts.length}</span>
          <div className="flex-1 h-1 bg-muted rounded-full">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${((step + 1) / scenario.prompts.length) * 100}%` }}
            />
          </div>
        </div>
      </Card>

      {/* Current Prompt */}
      <div className="p-5 bg-card rounded-xl border border-border/50">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Bot size={16} className="text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">{scenario.partnerRole}</p>
            <p className="text-foreground font-medium">{currentPrompt}</p>
          </div>
        </div>
      </div>

      {/* Recording Area */}
      <div className="p-6 bg-card rounded-xl border-2 border-dashed border-border/50 text-center">
        {isProcessing ? (
          <div className="space-y-2">
            <Loader2 size={24} className="animate-spin mx-auto text-primary" />
            <p className="text-sm text-muted-foreground">Verarbeite deine Antwort...</p>
          </div>
        ) : isRecording ? (
          <div className="space-y-3">
            <div className="w-16 h-16 mx-auto rounded-full bg-destructive/10 flex items-center justify-center animate-pulse">
              <Mic size={24} className="text-destructive" />
            </div>
            <p className="text-sm text-destructive font-medium">Aufnahme läuft...</p>
            <Button variant="destructive" size="sm" onClick={stopRecording}>
              <MicOff size={14} className="mr-1.5" />
              Aufnahme beenden
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <Button variant="outline" size="lg" onClick={startRecording} className="gap-2">
              <Mic size={16} />
              Antwort aufnehmen
            </Button>
            <p className="text-xs text-muted-foreground">
              Drücke den Button und sprich deine Antwort laut aus.
            </p>
          </div>
        )}
      </div>

      {/* Tips */}
      <Card variant="outline" className="p-4">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Tipps für diese Situation</h4>
        <ul className="space-y-1">
          {scenario.tips.map((tip, i) => (
            <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
              <span className="text-primary shrink-0 mt-0.5">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </Card>

      {/* Transcript & Feedback */}
      {transcript.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Deine Antworten</h4>
          {transcript.map((t, i) => (
            <div key={i} className="flex items-start gap-2 p-2 bg-muted/30 rounded-lg">
              <User size={14} className="text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">{t}</p>
            </div>
          ))}
        </div>
      )}

      {feedback && (
        <FeedbackCard type="info" title="Feedback" message={feedback} />
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="ghost" size="sm" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
          Zurück
        </Button>
        <Button variant="primary" size="sm" onClick={nextStep} disabled={isRecording || isProcessing}>
          {step === scenario.prompts.length - 1 ? "Abschließen" : "Nächster Schritt"}
          <Play size={14} className="ml-1.5" />
        </Button>
      </div>
    </div>
  );
}

export function DtzSpeakingOverview({ onSelectScenario }: { onSelectScenario: (s: DtzScenario) => void }) {
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-xl font-display font-semibold text-foreground mb-2">DTZ Sprechen — Übungsraum</h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Übe die mündliche DTZ-Prüfung mit realistischen Rollenspielen.
          Sprich deine Antworten laut aus und erhalte Feedback.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        {scenarios.map((s) => (
          <Card
            key={s.id}
            variant="default"
            className="p-4 cursor-pointer hover:shadow-md transition-all hover:-translate-y-0.5"
            onClick={() => onSelectScenario(s)}
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-muted flex items-center justify-center shrink-0">
                <MessageSquare size={16} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm mb-1">{s.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{s.context}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                    {s.prompts.length} Schritte
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary-muted text-primary">
                    DTZ Teil 3
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
