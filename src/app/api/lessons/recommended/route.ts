import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const lessons = await prisma.lesson.findMany({
    where: { isLocked: false },
    include: { unit: { include: { course: true } } },
    orderBy: { order: "asc" },
    take: 5,
  });
  return NextResponse.json(lessons);
}
