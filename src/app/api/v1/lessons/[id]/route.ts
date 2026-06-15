import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withApiKey } from "@/lib/api";
import { errorResponse } from "@/lib/api/api-errors";

async function getLesson(req: NextRequest) {
  const id = req.nextUrl.pathname.split("/").pop();
  if (!id) return errorResponse(400, "VALIDATION_ERROR", "ID fehlt");

  const lesson = await prisma.lesson.findUnique({
    where: { id, isPublished: true },
    include: {
      lessonSteps: { orderBy: { order: "asc" } },
      exercises: { orderBy: { order: "asc" }, include: { options: { orderBy: { order: "asc" } } } },
      learningObjectives: { orderBy: { order: "asc" } },
      lifeSituation: { select: { name: true, category: true } },
      unit: { select: { name: true, course: { select: { name: true, level: true } } } },
    },
  });

  if (!lesson) return errorResponse(404, "NOT_FOUND", "Lektion nicht gefunden");

  return NextResponse.json({ lesson });
}

export const GET = withApiKey(getLesson, "read:lessons");
