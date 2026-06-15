import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withApiKey } from "@/lib/api";

async function listGrammar(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const level = searchParams.get("level");
  const search = searchParams.get("search") || "";
  const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 200);
  const offset = parseInt(searchParams.get("offset") || "0");

  const where: Record<string, unknown> = { isPublished: true, reviewedByAdmin: true };
  if (level && ["A1", "A2", "B1", "B2", "C1"].includes(level)) where.level = level;
  if (search) where.OR = [
    { name: { contains: search, mode: "insensitive" } },
    { description: { contains: search, mode: "insensitive" } },
  ];

  const [items, total] = await Promise.all([
    prisma.grammarTopic.findMany({ where, take: limit, skip: offset, orderBy: { order: "asc" } }),
    prisma.grammarTopic.count({ where }),
  ]);

  return NextResponse.json({ items, total, limit, offset });
}

export const GET = withApiKey(listGrammar, "read:grammar");
