import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withApiKey } from "@/lib/api";
import { errorResponse } from "@/lib/api/api-errors";

async function submitLessonResult(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { lessonId, userId, score = 0, timeSpent = 0 } = body;

  if (!lessonId || !userId) {
    return errorResponse(400, "VALIDATION_ERROR", "lessonId und userId sind erforderlich");
  }

  const progress = await prisma.userProgress.upsert({
    where: { userId_lessonId: { userId, lessonId } },
    update: { completed: true, score, timeSpent, completedAt: new Date() },
    create: { userId, lessonId, completed: true, score, xpEarned: 10, timeSpent },
  });

  // Update XP
  await prisma.xPTransaction.create({
    data: { userId, amount: 10, source: "lesson_complete", sourceId: lessonId },
  });

  await prisma.userProfile.updateMany({
    where: { userId },
    data: { totalXp: { increment: 10 } },
  });

  return NextResponse.json({ success: true, progress });
}

export const POST = withApiKey(submitLessonResult, "write:progress");
