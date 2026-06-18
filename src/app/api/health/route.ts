import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const checks: Record<string, any> = {
    status: "ok",
    timestamp: new Date().toISOString(),
    version: process.env.APP_VERSION || "dev",
  };

  try {
    // Database check
    const dbStart = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    checks.database = { status: "connected", latencyMs: Date.now() - dbStart };
  } catch (e: any) {
    checks.database = { status: "error", message: e.message };
    checks.status = "degraded";
  }

  try {
    // Vocabulary count check
    const vocabCount = await prisma.vocabulary.count();
    checks.vocabulary = { count: vocabCount };
  } catch (e: any) {
    checks.vocabulary = { status: "error", message: e.message };
    checks.status = "degraded";
  }

  try {
    // Grammar count check
    const grammarCount = await prisma.grammarTopic.count();
    checks.grammar = { count: grammarCount };
  } catch (e: any) {
    checks.grammar = { status: "error", message: e.message };
    checks.status = "degraded";
  }

  try {
    // Environment check (safe values only)
    checks.config = {
      nextauth_url: process.env.NEXTAUTH_URL ? "set" : "missing",
      auth_trust_host: process.env.AUTH_TRUST_HOST || "not set",
      database_url: process.env.DATABASE_URL ? "set" : "missing",
    };
  } catch (e: any) {
    checks.config = { status: "error" };
  }

  const statusCode = checks.status === "ok" ? 200 : 503;
  return NextResponse.json(checks, { status: statusCode });
}
