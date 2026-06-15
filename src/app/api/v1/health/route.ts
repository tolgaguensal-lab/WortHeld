import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      db: "ok",
    });
  } catch (error) {
    console.error("Healthcheck DB error:", error);
    return NextResponse.json(
      { status: "degraded", timestamp: new Date().toISOString(), db: "error" },
      { status: 503 },
    );
  }
}
