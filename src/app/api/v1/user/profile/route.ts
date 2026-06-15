import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withApiKey } from "@/lib/api";
import { errorResponse } from "@/lib/api/api-errors";

async function updateProfile(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { userId, nativeLanguage, preferredTheme, avatarUrl, targetGoal } = body;

  if (!userId) {
    return errorResponse(400, "VALIDATION_ERROR", "userId ist erforderlich");
  }

  const data: Record<string, unknown> = {};
  if (nativeLanguage) data.nativeLanguage = nativeLanguage;
  if (preferredTheme) data.preferredTheme = preferredTheme;
  if (avatarUrl) data.avatarUrl = avatarUrl;
  if (targetGoal) data.targetGoal = targetGoal;

  if (Object.keys(data).length === 0) {
    return errorResponse(400, "VALIDATION_ERROR", "Mindestens ein Feld zum Aktualisieren angeben");
  }

  const profile = await prisma.userProfile.upsert({
    where: { userId },
    update: data,
    create: { userId, ...data } as any,
  });

  return NextResponse.json({ success: true, profile });
}

export const POST = withApiKey(updateProfile, "write:user");
