import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withApiKey } from "@/lib/api";

async function listCourses(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const level = searchParams.get("level");
  const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 50);
  const offset = parseInt(searchParams.get("offset") || "0");

  const where: Record<string, unknown> = { isActive: true };
  if (level && ["A1", "A2", "B1", "B2", "C1"].includes(level)) where.level = level;

  const [items, total] = await Promise.all([
    prisma.course.findMany({
      where, take: limit, skip: offset, orderBy: { order: "asc" },
      include: { units: { orderBy: { order: "asc" }, include: { _count: { select: { lessons: true } } } } },
    }),
    prisma.course.count({ where }),
  ]);

  return NextResponse.json({ items, total, limit, offset });
}

export const GET = withApiKey(listCourses, "read:courses");
