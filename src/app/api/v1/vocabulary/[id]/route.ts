import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withApiKey } from "@/lib/api";
import { errorResponse } from "@/lib/api/api-errors";

async function getVocabulary(req: NextRequest) {
  const id = req.nextUrl.pathname.split("/").pop();
  if (!id) return errorResponse(400, "VALIDATION_ERROR", "ID fehlt");

  const item = await prisma.vocabulary.findUnique({ where: { id } });
  if (!item || !item.isPublished) return errorResponse(404, "NOT_FOUND", "Vokabel nicht gefunden");

  return NextResponse.json({ item });
}

export const GET = withApiKey(getVocabulary, "read:vocabulary");
