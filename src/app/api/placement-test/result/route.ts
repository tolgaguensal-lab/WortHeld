import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { CEFRLevel } from "@prisma/client";
import { placementResultSchema, validate, handleValidation, parseBody } from "@/lib/validation";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Nicht authentifiziert" }, { status: 401 });

  return handleValidation(async () => {
    const userId = (session.user as any).id;
    const body = await parseBody(req);
    const { score, level } = validate(placementResultSchema, body);

    let placementTest = await prisma.placementTest.findFirst({
      where: { title: "Einstufungstest" },
    });
    if (!placementTest) {
      placementTest = await prisma.placementTest.create({
        data: {
          title: "Einstufungstest",
          description: "Automatischer Einstufungstest A1-B2",
          cefrLevel: "B2",
          questions: JSON.stringify([]),
        },
      });
    }

    const result = await prisma.placementTestResult.create({
      data: {
        userId,
        testId: placementTest.id,
        score,
        level: level as CEFRLevel,
      },
    });

    await prisma.userProfile.update({
      where: { userId },
      data: { placementLevel: level as CEFRLevel, currentLevel: level as CEFRLevel },
    });

    return NextResponse.json({ success: true, result });
  });
}
