/**
 * Error Pattern Recognition Engine
 *
 * Analysiert Nutzerfehler, erkennt Muster und generiert gezielte
 * Empfehlungen für den KI-Tutor.
 */

import { prisma } from "@/lib/db";

export interface ErrorPattern {
  errorType: string;
  grammarTopic: string | null;
  occurrences: number;
  lastOccurredAt: Date;
  recommendation: string;
}

export interface UserErrorSummary {
  totalErrors: number;
  topPatterns: ErrorPattern[];
  weakestSkill: string | null;
  recommendedFocus: string | null;
}

// ── Empfehlungen pro Fehlertyp ─────────────────────────────────────────────

const ERROR_RECOMMENDATIONS: Record<string, string> = {
  declension: "Deklinations-Übungen (Nominativ → Dativ → Akkusativ)",
  article: "Artikel-Training mit der/die/das",
  word_order: "Satzbau-Übungen (Verbzweitstellung, Nebensätze)",
  conjugation: "Konjugations-Drills (Präsens → Perfekt → Präteritum)",
  preposition: "Präpositions-Training mit Fällen (in, an, auf, bei, mit, zu)",
  case: "Fall-Übungen (Nominativ, Akkusativ, Dativ, Genitiv)",
  gender: "Genus-Training (der/die/das erkennen)",
  plural: "Plural-Formen üben",
  separable_verb: "Trennbare Verben (aufstehen, anrufen, mitkommen)",
  modal_verb: "Modalverben (müssen, können, wollen, dürfen, sollen)",
};

// ── Main Analysis ──────────────────────────────────────────────────────────

export async function analyzeErrorPatterns(userId: string): Promise<UserErrorSummary> {
  const errors = await prisma.userErrorProfile.findMany({
    where: { userId },
    orderBy: { occurrences: "desc" },
    take: 10,
  });

  const totalErrors = errors.reduce((sum, e) => sum + e.occurrences, 0);

  const topPatterns: ErrorPattern[] = errors.map(e => ({
    errorType: e.errorType,
    grammarTopic: e.grammarTopic,
    occurrences: e.occurrences,
    lastOccurredAt: e.lastOccurredAt,
    recommendation: ERROR_RECOMMENDATIONS[e.errorType] || `${e.errorType} gezielt üben`,
  }));

  // Finde den häufigsten Fehlertyp
  const weakestSkill = topPatterns.length > 0 ? topPatterns[0].errorType : null;

  // Generiere Fokus-Empfehlung
  const recommendedFocus = weakestSkill
    ? ERROR_RECOMMENDATIONS[weakestSkill] || `${weakestSkill} intensiv trainieren`
    : null;

  return {
    totalErrors,
    topPatterns,
    weakestSkill,
    recommendedFocus,
  };
}

// ── Context Block für System Prompt ────────────────────────────────────────

export async function buildErrorContext(userId: string): Promise<string> {
  const summary = await analyzeErrorPatterns(userId);

  if (summary.topPatterns.length === 0) return "";

  const patternLines = summary.topPatterns
    .slice(0, 5)
    .map(p => `- ${p.errorType}${p.grammarTopic ? ` (${p.grammarTopic})` : ""}: ${p.occurrences}x`);

  return `[Fehlermuster: ${patternLines.join(" | ")}] [Fokus: ${summary.recommendedFocus}]`;
}
