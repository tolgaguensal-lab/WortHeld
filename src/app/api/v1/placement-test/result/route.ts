import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withApiKey } from "@/lib/api";
import { errorResponse } from "@/lib/api/api-errors";

async function submitResult(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { testId, score, level, userId } = body;

  if (!testId || score === undefined || !level || !userId) {
    return errorResponse(400, "VALIDATION_ERROR", "testId, score, level und userId sind erforderlich");
  }

  if (!["A1", "A2", "B1", "B2", "C1"].includes(level)) {
    return errorResponse(400, "VALIDATION_ERROR", "level muss A1, A2, B1, B2 oder C1 sein");
  }

  const result = await prisma.placementTestResult.create({
    data: { testId, score, level, userId },
  });

  // Update user profile placement level
  await prisma.userProfile.updateMany({
    where: { userId },
    data: { placementLevel: level as any },
  });

  return NextResponse.json({ success: true, result }, { status: 201 });
}

export const POST = withApiKey(submitResult, "write:progress");
