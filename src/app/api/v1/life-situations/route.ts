import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withApiKey } from "@/lib/api";

async function listLifeSituations(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  const where: Record<string, unknown> = {};
  if (category) where.category = category;

  const items = await prisma.lifeSituation.findMany({
    where, orderBy: { order: "asc" },
    include: { _count: { select: { lessons: true } } },
  });

  return NextResponse.json({ items });
}

export const GET = withApiKey(listLifeSituations, "read:life-situations");
