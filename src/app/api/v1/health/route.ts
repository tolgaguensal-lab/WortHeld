import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      db: "ok",
    });
  } catch (error) {
    logger.error("Healthcheck DB error", { error: String(error) });
    return NextResponse.json(
      { status: "degraded", timestamp: new Date().toISOString(), db: "error" },
      { status: 503 },
    );
  }
}
