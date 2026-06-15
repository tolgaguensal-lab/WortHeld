import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withApiKey } from "@/lib/api";
import { errorResponse } from "@/lib/api/api-errors";

async function submitAnswer(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { exerciseId, userId, answer, isCorrect, timeSpent = 0 } = body;

  if (!exerciseId || !userId || answer === undefined || isCorrect === undefined) {
    return errorResponse(400, "VALIDATION_ERROR", "exerciseId, userId, answer und isCorrect sind erforderlich");
  }

  const userAnswer = await prisma.userAnswer.create({
    data: { exerciseId, userId, answer, isCorrect, timeSpent },
  });

  if (isCorrect) {
    await prisma.xPTransaction.create({
      data: { userId, amount: 5, source: "exercise_correct", sourceId: exerciseId },
    });
    await prisma.userProfile.updateMany({
      where: { userId },
      data: { totalXp: { increment: 5 } },
    });
  }

  return NextResponse.json({ success: true, answer: userAnswer });
}

export const POST = withApiKey(submitAnswer, "write:progress");
