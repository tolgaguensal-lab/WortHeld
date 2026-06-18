import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { calculatePlacementLevel, generateLearningPlan, PlacementAnswer } from "@/lib/placement/engine";
import { CEFRLevel } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Nicht authentifiziert" }, { status: 401 });
    }

    const body = await req.json();
    const { answers } = body;

    if (!Array.isArray(answers) || answers.length === 0) {
      return NextResponse.json({ error: "Ungültige Antworten bereitgestellt" }, { status: 400 });
    }

    // 1. Berechne das Ergebnis mit der professionellen Scoring Engine
    const result = calculatePlacementLevel(answers as PlacementAnswer[]);
    const learningPlan = generateLearningPlan(result);

    // 2. UserProfile aktualisieren (PlacementLevel & CurrentLevel)
    const updatedProfile = await prisma.userProfile.upsert({
      where: { userId: session.user.id },
      update: {
        placementLevel: result.recommendedLevel,
        currentLevel: result.recommendedLevel,
      },
      create: {
        userId: session.user.id,
        placementLevel: result.recommendedLevel,
        currentLevel: result.recommendedLevel,
      },
    });

    // 3. Das spezifische Testergebnis für das Audit-Log speichern
    // Wir suchen einen Standard-Test-Eintrag oder erstellen einen
    let placementTest = await prisma.placementTest.findFirst({
      where: { title: "Standard Einstufungstest" },
    });

    if (!placementTest) {
      placementTest = await prisma.placementTest.create({
        data: {
          title: "Standard Einstufungstest",
          description: "Automatischer Einstufungstest basierend auf CEFR-Standards",
          cefrLevel: "C1", // Max Level des Tests
          questions: JSON.stringify([]),
        },
      });
    }

    await prisma.placementTestResult.create({
      data: {
        userId: session.user.id,
        testId: placementTest.id,
        score: result.scorePercentage,
        level: result.recommendedLevel,
      },
    });

    return NextResponse.json({
      success: true,
      result,
      learningPlan,
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("[PLACEMENT_RESULT_ERROR]:", error);
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 });
  }
}
