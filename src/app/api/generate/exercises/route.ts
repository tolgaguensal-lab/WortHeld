/**
 * POST /api/generate/exercises — KI-generierte personalisierte Übungen
 *
 * Nutzt DeepSeek V4 Flash, um Übungen basierend auf Nutzer-Schwächen zu generieren.
 * Kein Caching – jede Übung ist frisch und personalisiert.
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { analyzeErrorPatterns } from "@/lib/ai/error-patterns";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Nicht authentifiziert" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const focus = body.focus || "grammatik";
  const exerciseType = body.exerciseType || "multiple_choice";
  const count = Math.min(body.count || 3, 5);

  // Get user's error patterns for personalization
  const errorSummary = await analyzeErrorPatterns(session.user.id);
  const profile = await prisma.userProfile.findUnique({
    where: { userId: session.user.id },
    select: { currentLevel: true },
  });
  const level = profile?.currentLevel || "A1";

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "DEEPSEEK_API_KEY nicht konfiguriert" }, { status: 500 });
  }

  const weaknessContext = errorSummary.topPatterns.length > 0
    ? `Schwächen des Nutzers: ${errorSummary.topPatterns.map(p => `${p.errorType} (${p.occurrences}x)`).join(", ")}. Fokus: ${errorSummary.recommendedFocus}.`
    : "Keine spezifischen Schwächen bekannt.";

  const prompt = `Erstelle ${count} Deutsch-Übungen vom Typ "${exerciseType}" für Niveau ${level}.
Fokus-Thema: ${focus}.
${weaknessContext}

Formatiere JEDE Übung exakt so:
[ÜBUNG:${exerciseType === "multiple_choice" ? "MC" : exerciseType === "fill_blank" ? "LÜCKE" : "SATZ"}]
Frage/Aufgabe
${exerciseType === "multiple_choice" ? "A) Option1 | B) Option2 | C) Option3" : ""}
Lösung: <korrekte_antwort>
[/ÜBUNG]

WICHTIG:
- Nur ECHTE deutsche Sätze, keine erfundenen Wörter
- Dem Niveau ${level} angemessen
- Genau ${count} Übungen
- Klare, einfache Anweisungen
- Keine HTML-Formatierung in den Übungen selbst`;

  try {
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-v4-flash",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1024,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { generated: 0, exercises: [], error: `API-Fehler: ${response.status}` },
        { status: 502 }
      );
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content || "";

    // Parse exercises from the response
    const exercises: { type: string; question: string; options?: string[]; solution: string }[] = [];
    const exerciseRegex = /\[ÜBUNG:(MC|LÜCKE|SATZ)\]\s*([\s\S]*?)\[\/ÜBUNG\]/g;
    let match;

    while ((match = exerciseRegex.exec(rawContent)) !== null) {
      const type = match[1];
      const content = match[2].trim();

      // Extract solution
      const solutionMatch = content.match(/Lösung:\s*(.+?)(?:\n|$)/);
      const solution = solutionMatch ? solutionMatch[1].trim() : "";

      // Remove solution line from question
      let question = content.replace(/Lösung:\s*.+?(?:\n|$)/, "").trim();

      let options: string[] | undefined;
      if (type === "MC") {
        const optionMatch = question.match(/^(.+?)\n([A-C]\)\s*.+)/);
        if (optionMatch) {
          question = optionMatch[1].trim();
          options = optionMatch[2].split(/\s*\|\s*/).map(o => o.trim());
        }
      }

      exercises.push({
        type: type === "MC" ? "multiple_choice" : type === "LÜCKE" ? "fill_blank" : "sentence_building",
        question,
        options,
        solution,
      });
    }

    return NextResponse.json({ generated: exercises.length, exercises });
  } catch (error) {
    return NextResponse.json(
      { generated: 0, exercises: [], error: "Generierungsfehler" },
      { status: 500 }
    );
  }
}
