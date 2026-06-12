import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Ungültige E-Mail-Adresse"),
  password: z.string().min(8, "Passwort muss mindestens 8 Zeichen lang sein"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name muss mindestens 2 Zeichen lang sein"),
  email: z.string().email("Ungültige E-Mail-Adresse"),
  password: z.string().min(8, "Passwort muss mindestens 8 Zeichen lang sein"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwörter stimmen nicht überein",
  path: ["confirmPassword"],
});

export const profileSchema = z.object({
  name: z.string().min(2).optional(),
  nativeLanguage: z.string().optional(),
  dailyGoal: z.number().min(10).max(200).optional(),
  preferredTheme: z.enum(["light", "dark", "system"]).optional(),
});

export const exerciseAnswerSchema = z.object({
  exerciseId: z.string().uuid(),
  answer: z.string(),
  timeSpent: z.number().min(0),
});

export const importSchema = z.object({
  sourceName: z.enum(["tatoeba", "wiktionary"]),
  query: z.string().min(1),
  level: z.enum(["A1", "A2", "B1", "B2", "C1"]).optional(),
});
