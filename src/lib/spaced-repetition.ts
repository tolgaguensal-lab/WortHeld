import { ReviewQuality } from "@/types";

export function calculateNextReview(
  quality: ReviewQuality,
  currentInterval: number,
  easeFactor: number,
  repetitions: number
) {
  let nextInterval: number;
  let nextRepetitions = repetitions;
  let nextEaseFactor = easeFactor;

  if (quality < ReviewQuality.HARD) {
    nextRepetitions = 0;
    nextInterval = 1;
  } else {
    nextRepetitions = repetitions + 1;
    if (nextRepetitions === 1) {
      nextInterval = 1;
    } else if (nextRepetitions === 2) {
      nextInterval = 6;
    } else {
      nextInterval = Math.round(currentInterval * easeFactor);
    }
  }

  nextEaseFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  nextEaseFactor = Math.max(1.3, Math.min(3.0, nextEaseFactor));

  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + nextInterval);

  return { nextInterval, nextEaseFactor, nextRepetitions, nextReviewDate };
}

export function isDueForReview(nextReview: Date): boolean {
  return new Date(nextReview) <= new Date();
}
