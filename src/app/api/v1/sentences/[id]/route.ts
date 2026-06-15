import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withApiKey } from "@/lib/api";
import { errorResponse } from "@/lib/api/api-errors";

async function getSentence(req: NextRequest) {
  const id = req.nextUrl.pathname.split("/").pop();
  if (!id) return errorResponse(400, "VALIDATION_ERROR", "ID fehlt");

  const item = await prisma.sentence.findUnique({ where: { id } });
  if (!item || !item.isPublished) return errorResponse(404, "NOT_FOUND", "Satz nicht gefunden");

  return NextResponse.json({ item: { id: item.id, text: item.text, translation: item.translationEn, level: item.level } });
}

export const GET = withApiKey(getSentence, "read:sentences");
