import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(_req: Request, { params }: { params: { lessonId: string } }) {
  const lesson = await prisma.lesson.findUnique({
    where: { id: params.lessonId },
    include: { exercises: { orderBy: { order: "asc" } }, unit: { include: { course: true } } },
  });
  if (!lesson) return NextResponse.json({ error: "Lektion nicht gefunden" }, { status: 404 });
  return NextResponse.json(lesson);
}
