/**
 * POST /api/webhooks/content — Content Update Webhook
 *
 * Akzeptiert Content-Updates von externen Quellen (CI/CD, Admin-Tools).
 * Validiert, reviewed und importiert automatisch.
 *
 * Auth: Bearer Token (CONTENT_WEBHOOK_SECRET)
 *
 * Payload:
 * {
 *   "type": "vocabulary" | "sentence" | "grammar",
 *   "level": "A1" | "A2" | "B1" | "B2" | "C1",
 *   "data": { ... } | [{ ... }],
 *   "source": "tatoeba" | "wiktionary" | "ai" | "manual",
 *   "autoApprove": false
 * }
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ── Auth ────────────────────────────────────────────────────────────────────

function validateWebhookSecret(req: NextRequest): boolean {
  const authHeader = req.headers.get("authorization");
  const secret = process.env.CONTENT_WEBHOOK_SECRET;
  if (!secret) return false;
  if (!authHeader?.startsWith("Bearer ")) return false;
  return authHeader.slice(7) === secret;
}

// ── Handlers ────────────────────────────────────────────────────────────────

async function handleVocabularyImport(data: any[], level: string, source: string) {
  let imported = 0;
  let skipped = 0;

  for (const entry of data) {
    if (!entry.word || !entry.translationEn) {
      skipped++;
      continue;
    }

    // Prüfe auf Duplikate
    const existing = await prisma.vocabulary.findFirst({
      where: { word: entry.word, level: level as any },
    });

    if (existing) {
      skipped++;
      continue;
    }

    await prisma.vocabulary.create({
      data: {
        word: entry.word,
        article: entry.article,
        pos: entry.pos || "noun",
        level: level as any,
        translationEn: entry.translationEn,
        translationTr: entry.translationTr || "",
        translationAr: entry.translationAr || "",
        translationRu: entry.translationRu || "",
        translationPl: entry.translationPl || "",
        translationRo: entry.translationRo || "",
        translationUk: entry.translationUk || "",
        translationSq: entry.translationSq || "",
        translationKu: entry.translationKu || "",
        translationIt: entry.translationIt || "",
        exampleSentence: entry.exampleSentence || "",
        exampleTranslation: entry.exampleTranslation || "",
        sourceName: source,
        isPublished: false, // Needs admin review
      },
    });
    imported++;
  }

  return { imported, skipped };
}

async function handleSentenceImport(data: any[], level: string, source: string) {
  let imported = 0;

  for (const entry of data) {
    if (!entry.text || !entry.translationEn) continue;

    await prisma.sentence.create({
      data: {
        text: entry.text,
        translationEn: entry.translationEn,
        translationDe: entry.translationDe || "",
        level: level as any,
        sourceName: source,
        license: entry.license || `CC BY 2.0 (${source})`,
        attribution: entry.attribution || source,
        isPublished: false,
      },
    });
    imported++;
  }

  return { imported, skipped: 0 };
}

// ── Route Handler ───────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // Auth
  if (!validateWebhookSecret(req)) {
    return NextResponse.json(
      { error: "Unauthorized", code: "INVALID_WEBHOOK_SECRET" },
      { status: 401 }
    );
  }

  // Parse
  let body: {
    type: string;
    level: string;
    data: any | any[];
    source?: string;
    autoApprove?: boolean;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.type || !body.level || !body.data) {
    return NextResponse.json(
      { error: "type, level, and data are required" },
      { status: 400 }
    );
  }

  const dataArray = Array.isArray(body.data) ? body.data : [body.data];
  const source = body.source || "webhook";

  // Process
  let result: { imported: number; skipped: number };

  switch (body.type) {
    case "vocabulary":
      result = await handleVocabularyImport(dataArray, body.level, source);
      break;
    case "sentence":
      result = await handleSentenceImport(dataArray, body.level, source);
      break;
    default:
      return NextResponse.json(
        { error: `Unknown type: ${body.type}. Supported: vocabulary, sentence` },
        { status: 400 }
      );
  }

  // Log import source
  await prisma.aPIImportSource.upsert({
    where: { id: `webhook-${source}` },
    update: {
      lastImportAt: new Date(),
      totalImported: { increment: result.imported },
    },
    create: {
      id: `webhook-${source}`,
      name: source,
      url: "webhook",
      lastImportAt: new Date(),
      totalImported: result.imported,
    },
  });

  return NextResponse.json({
    success: true,
    type: body.type,
    level: body.level,
    ...result,
    needsReview: !body.autoApprove,
  });
}

// ── GET: Content Health Check ───────────────────────────────────────────────

export async function GET(req: NextRequest) {
  if (!validateWebhookSecret(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const levels = ["A1", "A2", "B1", "B2", "C1"];
  const health: Record<string, any> = {};

  for (const level of levels) {
    const vocab = await prisma.vocabulary.count({ where: { level: level as any } });
    const grammar = await prisma.grammarTopic.count({ where: { level: level as any } });
    const sentences = await prisma.sentence.count({ where: { level: level as any } });

    health[level] = {
      vocabulary: vocab,
      grammarTopic: grammar,
      sentences,
      vocabularyGap: Math.max(0, (level === "A1" ? 250 : level === "A2" ? 350 : level === "B1" ? 450 : level === "B2" ? 550 : 650) - vocab),
      grammarGap: Math.max(0, (level === "A1" ? 15 : level === "A2" ? 18 : level === "B1" ? 22 : level === "B2" ? 22 : 18) - grammar),
    };
  }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    health,
  });
}
