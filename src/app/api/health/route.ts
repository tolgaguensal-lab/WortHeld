import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

/**
 * Öffentlicher Health Check – gibt NUR Minimal-Info aus.
 * Keine DB-Counts, keine Config-Details, keine Fehlermeldungen.
 */
export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      version: process.env.APP_VERSION || "dev",
    });
  } catch {
    return NextResponse.json(
      { status: "degraded", timestamp: new Date().toISOString() },
      { status: 503 }
    );
  }
}

