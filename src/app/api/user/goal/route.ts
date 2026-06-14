import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Nicht authentifiziert" }, { status: 401 });

  const userId = (session.user as any).id;
  const { goal } = await req.json();

  if (!goal || typeof goal !== "string") {
    return NextResponse.json({ error: "Ziel ist erforderlich" }, { status: 400 });
  }

  const validGoals = ["alltag", "integration", "beruf", "pruefung"];
  if (!validGoals.includes(goal)) {
    return NextResponse.json({ error: "Ungültiges Ziel" }, { status: 400 });
  }

  const profile = await prisma.userProfile.update({
    where: { userId },
    data: { targetGoal: goal },
  });

  return NextResponse.json({ success: true, profile });
}
