import { ReviewQuality } from "@/types";

const LEVEL_THRESHOLDS = [0, 50, 150, 300, 500, 750, 1050, 1400, 1800, 2250, 2750, 3300, 3900, 4550, 5250, 6000, 6800, 7650, 8550, 9500];

export function calculateLevel(totalXp: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (totalXp >= LEVEL_THRESHOLDS[i]) return i + 1;
  }
  return 1;
}

export function calculateXpForLevel(level: number): number {
  return LEVEL_THRESHOLDS[level] ?? LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
}

export function calculateStreakBonus(streak: number): number {
  if (streak >= 30) return 3;
  if (streak >= 15) return 2.5;
  if (streak >= 8) return 2;
  if (streak >= 4) return 1.5;
  return 1;
}

export function getHeartRegenerationTime(lastHeartLoss: Date): Date {
  const next = new Date(lastHeartLoss);
  next.setMinutes(next.getMinutes() + 30);
  return next;
}

export function calculateDailyProgress(xpToday: number, dailyGoal: number) {
  const percentage = Math.min(100, Math.round((xpToday / dailyGoal) * 100));
  return { percentage, remaining: Math.max(0, dailyGoal - xpToday) };
}

export function getLevelTitle(level: number): string {
  if (level >= 18) return "Legende";
  if (level >= 15) return "Meister";
  if (level >= 11) return "Experte";
  if (level >= 7) return "Geübt";
  if (level >= 4) return "Fortgeschritten";
  return "Anfänger";
}

export function getXpForExercise(quality: ReviewQuality, streakBonus: number): number {
  const base = quality === ReviewQuality.PERFECT ? 10 : quality === ReviewQuality.GOOD ? 5 : quality === ReviewQuality.HARD ? 2 : 0;
  return Math.round(base * streakBonus);
}
