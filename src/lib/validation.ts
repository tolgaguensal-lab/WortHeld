import { z } from "zod";
import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";

export function validate<T>(schema: z.ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const firstError = result.error.errors[0];
    throw new ValidationError(firstError.message, result.error.errors);
  }
  return result.data;
}

export function handleValidation(handler: () => Promise<NextResponse>): Promise<NextResponse> {
  try {
    return handler().catch((error) => {
      if (error instanceof ValidationError) {
        return NextResponse.json(
          { error: error.message, details: error.details },
          { status: 400 }
        );
      }
      logger.error("Handler error", { error: String(error) });
      return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 });
    });
  } catch (error) {
    // Synchronous errors (very rare with Zod)
    if (error instanceof ValidationError) {
      return Promise.resolve(
        NextResponse.json(
          { error: error.message, details: error.details },
          { status: 400 }
        )
      );
    }
    logger.error("Handler sync error", { error: String(error) });
    return Promise.resolve(
      NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 })
    );
  }
}

export async function parseBody(req: Request): Promise<unknown> {
  try {
    return await req.json();
  } catch {
    throw new ValidationError("Ungültiges JSON-Format", []);
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public details: z.ZodIssue[]
  ) {
    super(message);
    this.name = "ValidationError";
  }
}

// ── Schemas ──────────────────────────────────

export const registerSchema = z.object({
  email: z
    .string()
    .email("Ungültige E-Mail-Adresse")
    .max(255, "E-Mail zu lang"),
  password: z
    .string()
    .min(8, "Passwort muss mindestens 8 Zeichen lang sein")
    .max(128, "Passwort zu lang"),
  name: z
    .string()
    .min(1, "Name ist erforderlich")
    .max(100, "Name zu lang")
    .optional(),
});

export const placementResultSchema = z.object({
  score: z.number().int().min(0).max(100),
  level: z.enum(["A1", "A2", "B1", "B2", "C1"]),
  answers: z.array(z.unknown()).optional(),
});

export const translateSchema = z.object({
  text: z.string().min(1).max(5000).optional(),
  texts: z.array(z.string().max(5000)).optional(),
  sourceLang: z.string().length(2).optional(),
  targetLang: z.string().length(2).optional(),
});

export const submitAnswerSchema = z.object({
  exerciseId: z.string().min(1, "exerciseId ist erforderlich"),
  answer: z.union([z.string(), z.number(), z.boolean()]),
  timeSpent: z.number().int().min(0).optional(),
});

export const completeLessonSchema = z.object({
  lessonId: z.string().min(1, "lessonId ist erforderlich"),
  score: z.number().int().min(0).max(100).optional(),
});

export const grammarCheckSchema = z.object({
  text: z.string().min(1, "Text ist erforderlich").max(10000, "Text zu lang"),
  language: z.string().length(2).default("de"),
});

export const userUpdateSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  image: z.string().url("Ungültige URL").optional().or(z.literal("")),
  bio: z.string().max(500).optional(),
});

export const languageUpdateSchema = z.object({
  nativeLanguage: z.string().length(2, "Sprachcode muss 2 Zeichen haben"),
  targetLanguage: z.string().length(2, "Sprachcode muss 2 Zeichen haben"),
});

export const goalUpdateSchema = z.object({
  dailyGoal: z.number().int().min(1, "Min. 1 Übung").max(100, "Max. 100 Übungen"),
  weeklyGoal: z.number().int().min(1).max(500).optional(),
});
