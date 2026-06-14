import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { CEFRLevel } from "@prisma/client";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Nicht authentifiziert" }, { status: 401 });

  const userId = (session.user as any).id;
  const { score, level, answers } = await req.json();

  if (!score || !level) {
    return NextResponse.json({ error: "Ergebnis und Niveau erforderlich" }, { status: 400 });
  }

  const validLevels: CEFRLevel[] = ["A1", "A2", "B1", "B2", "C1"];
  if (!validLevels.includes(level as CEFRLevel)) {
    return NextResponse.json({ error: "Ungültiges Niveau" }, { status: 400 });
  }

  // Save the placement test result
  const result = await prisma.placementTestResult.create({
    data: {
      userId,
      testId: "00000000-0000-0000-0000-000000000000", // placeholder for default test
      score,
      level: level as CEFRLevel,
    },
  });

  // Update the user's profile with the placement level
  await prisma.userProfile.update({
    where: { userId },
    data: { placementLevel: level as CEFRLevel, currentLevel: level as CEFRLevel },
  });

  return NextResponse.json({ success: true, result });
}
