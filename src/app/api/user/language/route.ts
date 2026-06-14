import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Nicht authentifiziert" }, { status: 401 });

  const userId = (session.user as any).id;
  const { language } = await req.json();

  if (!language || typeof language !== "string") {
    return NextResponse.json({ error: "Sprache ist erforderlich" }, { status: 400 });
  }

  const profile = await prisma.userProfile.update({
    where: { userId },
    data: { nativeLanguage: language },
  });

  return NextResponse.json({ success: true, profile });
}
