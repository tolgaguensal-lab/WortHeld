import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withApiKey, generateApiKey } from "@/lib/api";
import { errorResponse } from "@/lib/api/api-errors";

// GET /api/v1/admin/api-keys — Alle Keys auflisten
async function listKeys(req: NextRequest) {
  const keys = await prisma.apiKey.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      keyPrefix: true,
      scopes: true,
      rateLimit: true,
      isActive: true,
      expiresAt: true,
      lastUsedAt: true,
      createdAt: true,
      _count: { select: { requests: true } },
    },
  });

  return NextResponse.json({ keys });
}

// POST /api/v1/admin/api-keys — Neuen Key erstellen
async function createKey(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { name, scopes = "read", rateLimit = 100, expiresInDays } = body;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return errorResponse(400, "VALIDATION_ERROR", "Name ist erforderlich");
  }

  const { fullKey, prefix, hash } = generateApiKey();

  const expiresAt = expiresInDays
    ? new Date(Date.now() + expiresInDays * 86400000)
    : null;

  await prisma.apiKey.create({
    data: {
      name: name.trim(),
      keyPrefix: prefix,
      keyHash: hash,
      scopes,
      rateLimit,
      expiresAt,
    },
  });

  return NextResponse.json({
    key: fullKey,
    prefix,
    name: name.trim(),
    scopes,
    rateLimit,
    expiresAt,
    warning: "Dieser Schlüssel wird nur einmal angezeigt. Speichere ihn sicher.",
  }, { status: 201 });
}

export const GET = withApiKey(listKeys, "admin");
export const POST = withApiKey(createKey, "admin");
