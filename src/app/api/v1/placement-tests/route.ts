import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withApiKey } from "@/lib/api";
import { errorResponse } from "@/lib/api/api-errors";

async function listPlacementTests(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const level = searchParams.get("level");

  const where: Record<string, unknown> = {};
  if (level && ["A1", "A2", "B1", "B2", "C1"].includes(level)) where.cefrLevel = level;

  const items = await prisma.placementTest.findMany({
    where, orderBy: { createdAt: "desc" },
    select: { id: true, title: true, description: true, cefrLevel: true, createdAt: true },
  });

  return NextResponse.json({ items });
}

export const GET = withApiKey(listPlacementTests, "read:placement");
