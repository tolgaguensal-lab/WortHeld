import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withApiKey } from "@/lib/api";
import { ExerciseType, DifficultyLevel, CEFRLevel } from "@prisma/client";

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generateMultipleChoice(vocab: { word: string; translationEn: string; exampleSentence?: string | null }[]) {
  if (vocab.length < 4) return null;
  const targetIdx = Math.floor(Math.random() * vocab.length);
  const target = vocab[targetIdx];
  const wrongOptions = shuffleArray(vocab.filter((_, idx) => idx !== targetIdx)).slice(0, 3).map((v) => v.translationEn);
  const options = shuffleArray([target.translationEn, ...wrongOptions]);
  return { type: ExerciseType.MULTIPLE_CHOICE, question: `Was bedeutet "${target.word}"?`, options, correctAnswer: target.translationEn, explanation: `"${target.word}" bedeutet "${target.translationEn}".` };
}

function generateFillBlank(vocab: { word: string; translationEn: string; exampleSentence?: string | null }[]) {
  const withSentence = vocab.filter((v) => v.exampleSentence && v.exampleSentence.includes(v.word));
  if (withSentence.length === 0) return null;
  const target = withSentence[Math.floor(Math.random() * withSentence.length)];
  const blank = target.exampleSentence!.replace(target.word, "______");
  return { type: ExerciseType.FILL_BLANK, question: `Fülle die Lücke: "${blank}"`, options: [target.word, "Option A", "Option B", "Option C"], correctAnswer: target.word, explanation: `Die richtige Antwort ist "${target.word}".` };
}

async function generateExercises(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const level = searchParams.get("level") || "A1";
  const limit = Math.min(parseInt(searchParams.get("limit") || "10"), 50);

  const vocabulary = await prisma.vocabulary.findMany({
    where: { isPublished: true, reviewedByAdmin: true, level: level as CEFRLevel },
    take: 200, orderBy: { word: "asc" },
  });

  const exercises: Record<string, unknown>[] = [];
  for (let i = 0; i < limit; i++) {
    const vocab = shuffleArray(vocabulary);
    const mc = generateMultipleChoice(vocab);
    if (mc) exercises.push({ id: `ex-${Date.now()}-${i}`, ...mc, difficulty: DifficultyLevel.EASY });
    const fb = generateFillBlank(vocab);
    if (fb) exercises.push({ id: `ex-${Date.now()}-${i}-fb`, ...fb, difficulty: DifficultyLevel.MEDIUM });
  }

  const result = exercises.slice(0, limit);
  return NextResponse.json({ exercises: result, level, count: result.length });
}

export const GET = withApiKey(generateExercises, "read:exercises");
