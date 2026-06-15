import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withApiKey } from "@/lib/api";

async function listLessons(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const level = searchParams.get("level");
  const lifeSituation = searchParams.get("lifeSituation");
  const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100);
  const offset = parseInt(searchParams.get("offset") || "0");

  const where: Record<string, unknown> = { isPublished: true };
  if (level) where.unit = { course: { level } };
  if (lifeSituation) where.lifeSituationId = lifeSituation;

  const [items, total] = await Promise.all([
    prisma.lesson.findMany({
      where,
      take: limit, skip: offset,
      orderBy: { order: "asc" },
      include: {
        unit: { select: { name: true, course: { select: { name: true, level: true } } } },
        lifeSituation: { select: { name: true, category: true } },
        _count: { select: { lessonSteps: true, exercises: true } },
      },
    }),
    prisma.lesson.count({ where }),
  ]);

  return NextResponse.json({ items, total, limit, offset });
}

export const GET = withApiKey(listLessons, "read:lessons");
