import { describe, it, expect } from "vitest";
import { calculatePlacementLevel, generateLearningPlan } from "@/lib/placement/engine";

describe("calculatePlacementLevel()", () => {
  it("should return A1 if A1 answers are correct and A2 are mostly wrong", () => {
    const answers: any[] = [
      { questionId: "q1", selectedOptionId: "a", isCorrect: true, level: "A1", skill: "VOCABULARY" },
      { questionId: "q2", selectedOptionId: "b", isCorrect: true, level: "A1", skill: "GRAMMAR" },
      { questionId: "q3", selectedOptionId: "c", isCorrect: false, level: "A2", skill: "VOCABULARY" },
      { questionId: "q4", selectedOptionId: "d", isCorrect: false, level: "A2", skill: "GRAMMAR" },
    ];
    const result = calculatePlacementLevel(answers);
    expect(result.recommendedLevel).toBe("A1");
    expect(result.scorePercentage).toBeGreaterThanOrEqual(50);
  });

  it("should advance to B1 when B1 accuracy exceeds threshold", () => {
    const answers: any[] = [
      { questionId: "q1", selectedOptionId: "a", isCorrect: true, level: "A1", skill: "VOCABULARY" },
      { questionId: "q2", selectedOptionId: "b", isCorrect: true, level: "A1", skill: "GRAMMAR" },
      { questionId: "q3", selectedOptionId: "c", isCorrect: true, level: "A2", skill: "VOCABULARY" },
      { questionId: "q4", selectedOptionId: "d", isCorrect: true, level: "A2", skill: "GRAMMAR" },
      { questionId: "q5", selectedOptionId: "e", isCorrect: true, level: "B1", skill: "VOCABULARY" },
      { questionId: "q6", selectedOptionId: "f", isCorrect: true, level: "B1", skill: "GRAMMAR" },
    ];
    const result = calculatePlacementLevel(answers);
    expect(result.recommendedLevel).toBe("B1");
  });

  it("should handle perfect score and return C1", () => {
    const answers: any[] = [
      { questionId: "q1", selectedOptionId: "a", isCorrect: true, level: "A1", skill: "VOCABULARY" },
      { questionId: "q2", selectedOptionId: "b", isCorrect: true, level: "A1", skill: "GRAMMAR" },
      { questionId: "q3", selectedOptionId: "c", isCorrect: true, level: "A2", skill: "VOCABULARY" },
      { questionId: "q4", selectedOptionId: "d", isCorrect: true, level: "A2", skill: "GRAMMAR" },
      { questionId: "q5", selectedOptionId: "e", isCorrect: true, level: "B1", skill: "VOCABULARY" },
      { questionId: "q6", selectedOptionId: "f", isCorrect: true, level: "B1", skill: "GRAMMAR" },
      { questionId: "q7", selectedOptionId: "g", isCorrect: true, level: "B2", skill: "VOCABULARY" },
      { questionId: "q8", selectedOptionId: "h", isCorrect: true, level: "B2", skill: "GRAMMAR" },
      { questionId: "q9", selectedOptionId: "i", isCorrect: true, level: "C1", skill: "VOCABULARY" },
      { questionId: "q10", selectedOptionId: "j", isCorrect: true, level: "C1", skill: "GRAMMAR" },
    ];
    const result = calculatePlacementLevel(answers);
    expect(result.recommendedLevel).toBe("C1");
    expect(result.scorePercentage).toBe(100);
    expect(result.strengths.length).toBeGreaterThanOrEqual(5);
  });

  it("should identify weaknesses", () => {
    const answers: any[] = [
      { questionId: "q1", selectedOptionId: "a", isCorrect: true, level: "A1", skill: "VOCABULARY" },
      { questionId: "q2", selectedOptionId: "b", isCorrect: true, level: "A1", skill: "GRAMMAR" },
      { questionId: "q3", selectedOptionId: "c", isCorrect: false, level: "A2", skill: "VOCABULARY" },
      { questionId: "q4", selectedOptionId: "d", isCorrect: false, level: "A2", skill: "GRAMMAR" },
      { questionId: "q5", selectedOptionId: "e", isCorrect: false, level: "A2", skill: "VOCABULARY" },
      { questionId: "q6", selectedOptionId: "f", isCorrect: false, level: "A2", skill: "GRAMMAR" },
    ];
    const result = calculatePlacementLevel(answers);
    expect(result.weaknesses.length).toBeGreaterThanOrEqual(1);
  });

  it("should be lenient with mixed results at same level", () => {
    const answers: any[] = [
      { questionId: "q1", selectedOptionId: "a", isCorrect: true, level: "A1", skill: "VOCABULARY" },
      { questionId: "q2", selectedOptionId: "b", isCorrect: false, level: "A1", skill: "GRAMMAR" },
    ];
    const result = calculatePlacementLevel(answers);
    expect(result.recommendedLevel).toBe("A1");
    expect(Array.isArray(result.strengths)).toBe(true);
  });
});

describe("generateLearningPlan()", () => {
  it("should generate a plan for a valid placement result", () => {
    const mockResult: any = { recommendedLevel: "A2", scorePercentage: 60, strengths: ["A1"], weaknesses: ["A2"], confidence: 0.6 };
    const plan = generateLearningPlan(mockResult);
    expect(plan.startLevel).toBe("A2");
    expect(plan.milestones.length).toBeGreaterThan(0);
    expect(plan.durationOptions).toHaveProperty("standard");
  });
});
