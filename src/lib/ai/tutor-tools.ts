/**
 * Wortwende Tutor Tools — Agent Tool Definitions
 *
 * Der KI-Tutor kann diese Tools aufrufen, um aktiv zu handeln
 * (nicht nur antworten, sondern wirklich etwas TUN).
 */

import { prisma } from "@/lib/db";
import type { CEFRLevel } from "@prisma/client";

// ── Tool Types ────────────────────────────────────────────────────────────

export interface TutorTool {
  name: string;
  description: string;
  parameters: Record<string, { type: string; description: string; required?: boolean }>;
}

export interface ToolResult {
  success: boolean;
  message: string;
  data?: unknown;
}

// ── Tool Definitions ──────────────────────────────────────────────────────

export const TUTOR_TOOLS: TutorTool[] = [
  {
    name: "add_vocabulary_to_review",
    description: "Fügt eine Vokabel zum Spaced-Repetition-Review-Stack des Nutzers hinzu, damit sie später wiederholt wird.",
    parameters: {
      word: { type: "string", description: "Das deutsche Wort", required: true },
      article: { type: "string", description: "Der Artikel (der/die/das)", required: false },
      translation: { type: "string", description: "Übersetzung in der Muttersprache", required: true },
    },
  },
  {
    name: "suggest_next_lesson",
    description: "Schlägt die nächste passende Lektion basierend auf dem Lernfortschritt und den Fehlermustern vor.",
    parameters: {
      reason: { type: "string", description: "Warum diese Lektion empfohlen wird", required: true },
    },
  },
  {
    name: "record_error_pattern",
    description: "Zeichnet ein wiederholtes Fehlermuster auf, damit der Tutor zukünftig gezielt darauf eingehen kann.",
    parameters: {
      errorType: { type: "string", description: "Art des Fehlers (z.B. declension, word_order, article, conjugation, preposition)", required: true },
      grammarTopic: { type: "string", description: "Grammatik-Thema (z.B. Dativ, Akkusativ, Perfekt)", required: false },
      errorMessage: { type: "string", description: "Beschreibung des konkreten Fehlers", required: false },
      cefrLevel: { type: "string", description: "CEFR-Niveau (A1/A2/B1/B2/C1)", required: false },
    },
  },
  {
    name: "mark_topic_mastered",
    description: "Markiert ein Grammatik-Thema als gemeistert, wenn der Nutzer es mehrfach korrekt angewendet hat.",
    parameters: {
      topic: { type: "string", description: "Das gemeisterte Grammatik-Thema", required: true },
    },
  },
  {
    name: "start_roleplay",
    description: "Startet eine Rollenspiel-Situation (z.B. Beim Arzt, Im Restaurant, Auf dem Amt) für immersive Sprachpraxis.",
    parameters: {
      scenario: { type: "string", description: "Die Situation (arzt, restaurant, amt, einkaufen, vorstellung, wohnung, reise, notfall)", required: true },
    },
  },
  {
    name: "generate_personalized_exercise",
    description: "Generiert eine personalisierte Übung basierend auf den Schwächen des Nutzers.",
    parameters: {
      focus: { type: "string", description: "Fokus-Thema (z.B. dativ, perfekt, artikel)", required: true },
      exerciseType: { type: "string", description: "Übungstyp (multiple_choice, fill_blank, sentence_building, translation)", required: true },
    },
  },
];

// ── Tool Descriptions for System Prompt ────────────────────────────────────

export const TOOL_SYSTEM_PROMPT = `
## WERKZEUGE (TOOLS)
Du kannst folgende Aktionen ausführen. Nutze sie PROAKTIV, nicht nur auf Anfrage:

1. **add_vocabulary_to_review** — Wenn der Nutzer ein neues Wort lernt oder mit einem Wort kämpft, füge es SEHR HÄUFIG zum Review hinzu. Das ist DEINE WICHTIGSTE Lern-Aktion.
2. **suggest_next_lesson** — Nach jeder Session: schlage vor, welche Lektion als nächstes Sinn macht.
3. **record_error_pattern** — Sobald ein Fehler zum 2. Mal auftritt: zeichne das Muster auf. Der Nutzer merkt das nicht – du wirst einfach besser.
4. **mark_topic_mastered** — Wenn ein Thema 3x hintereinander korrekt war: feiere den Erfolg und markiere es.
5. **start_roleplay** — Biete Rollenspiele an: "Lass uns üben – ich bin der Arzt, du bist der Patient."
6. **generate_personalized_exercise** — Erstelle spontan eine Übung, wenn du eine Wissenslücke erkennst.

**WICHTIG**: Nutze die Tools in JEDER Session. Antworte zuerst mit einer kurzen Nachricht, dann rufe das passende Tool auf.
Format: Schreibe [TOOL:name]{json} am Ende deiner Antwort, um ein Tool auszuführen.
Beispiel: "Gut gemacht! Das Wort 'Krankenhaus' solltest du wiederholen. [TOOL:add_vocabulary_to_review]{"word":"Krankenhaus","article":"das","translation":"hospital"}"
`;

// ── Tool Executors ────────────────────────────────────────────────────────

export async function executeTool(
  toolName: string,
  params: Record<string, string>,
  userId: string
): Promise<ToolResult> {
  switch (toolName) {
    case "add_vocabulary_to_review": {
      const { word, article, translation } = params;
      if (!word) return { success: false, message: "Wort fehlt" };

      // Finde oder erstelle Vokabel
      let vocab = await prisma.vocabulary.findFirst({
        where: { word: { equals: word, mode: "insensitive" } },
      });

      if (!vocab) {
        vocab = await prisma.vocabulary.create({
          data: {
            word,
            article: article || null,
            translationEn: translation,
            level: "A1",
            pos: "noun",
          },
        });
      }

      // Füge zum Review-Stack hinzu (SM-2)
      const existing = await prisma.reviewItem.findFirst({
        where: { userId, vocabularyId: vocab.id },
      });
      if (existing) {
        await prisma.reviewItem.update({
          where: { id: existing.id },
          data: { nextReview: new Date() },
        });
      } else {
        await prisma.reviewItem.create({
          data: {
            userId,
            vocabularyId: vocab.id,
            nextReview: new Date(),
          },
        });
      }

      return {
        success: true,
        message: `✅ "${word}" zum Wiederholen gespeichert`,
        data: { vocabularyId: vocab.id },
      };
    }

    case "suggest_next_lesson": {
      // Finde nächste unvollständige Lektion
      const progress = await prisma.userProgress.findMany({
        where: { userId },
        select: { lessonId: true },
      });
      const completedIds = progress.map(p => p.lessonId);

      const profile = await prisma.userProfile.findUnique({
        where: { userId },
        select: { currentLevel: true },
      });

      const nextLesson = await prisma.lesson.findFirst({
        where: {
          id: { notIn: completedIds.length > 0 ? completedIds : ["none"] },
          isPublished: true,
          unit: { course: { level: (profile?.currentLevel as CEFRLevel) || "A1" } },
        },
        orderBy: { order: "asc" },
        select: { id: true, name: true, unit: { select: { course: { select: { name: true } } } } },
      });

      return {
        success: true,
        message: nextLesson
          ? `📚 Nächste Lektion: "${nextLesson.name}" in ${nextLesson.unit.course.name}`
          : "🎉 Alle Lektionen auf deinem Level gemeistert!",
        data: nextLesson ? { lessonId: nextLesson.id, title: nextLesson.name, courseName: nextLesson.unit.course.name } : null,
      };
    }

    case "record_error_pattern": {
      const { errorType, grammarTopic, errorMessage, cefrLevel } = params;
      if (!errorType) return { success: false, message: "Fehlertyp fehlt" };

      const existing = await prisma.userErrorProfile.findFirst({
        where: {
          userId,
          errorType,
          grammarTopic: grammarTopic || null,
        },
      });

      if (existing) {
        await prisma.userErrorProfile.update({
          where: { id: existing.id },
          data: {
            occurrences: existing.occurrences + 1,
            lastOccurredAt: new Date(),
            errorMessage: errorMessage || existing.errorMessage,
          },
        });
      } else {
        await prisma.userErrorProfile.create({
          data: {
            userId,
            errorType,
            grammarTopic: grammarTopic || null,
            errorMessage: errorMessage || null,
            cefrLevel: (cefrLevel as CEFRLevel) || null,
          },
        });
      }

      return {
        success: true,
        message: `📝 Fehlermuster erkannt: ${errorType}${grammarTopic ? ` (${grammarTopic})` : ""}`,
      };
    }

    case "mark_topic_mastered": {
      const { topic } = params;
      return {
        success: true,
        message: `🌟 "${topic}" gemeistert! Großartige Leistung!`,
        data: { topic },
      };
    }

    case "start_roleplay": {
      const { scenario } = params;
      return {
        success: true,
        message: `🎭 Rollenspiel gestartet: ${scenario}`,
        data: { scenario },
      };
    }

    case "generate_personalized_exercise": {
      // Wird vom Exercise-Generator übernommen
      return {
        success: true,
        message: "📝 Personalisierte Übung wird erstellt...",
        data: params,
      };
    }

    default:
      return { success: false, message: `Unbekanntes Tool: ${toolName}` };
  }
}
