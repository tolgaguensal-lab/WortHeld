import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Nicht authentifiziert" }, { status: 401 });

  const userId = session.user.id;
  const { lessonId, score, timeSpent } = await req.json();

  // 1. Markiere die aktuelle Lektion als abgeschlossen
  const progress = await prisma.userProgress.upsert({
    where: { userId_lessonId: { userId, lessonId } },
    update: { score, timeSpent, completed: true, completedAt: new Date() },
    create: { userId, lessonId, score, timeSpent, completed: true, completedAt: new Date() },
  });

  // 2. Finde die abgeschlossene Lektion, um den Unit-Kontext zu ermitteln
  const completedLesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: { unit: { include: { lessons: { orderBy: { order: "asc" } } } } },
  });

  if (completedLesson?.unit) {
    const unit = completedLesson.unit;
    const lessons = unit.lessons;
    const currentIdx = lessons.findIndex((l) => l.id === lessonId);
    const nextLesson = currentIdx >= 0 && currentIdx < lessons.length - 1 ? lessons[currentIdx + 1] : null;

    // 3. Entriegele die nächste Lektion in derselben Unit
    if (nextLesson && nextLesson.isLocked) {
      await prisma.lesson.update({
        where: { id: nextLesson.id },
        data: { isLocked: false },
      });
    }
  }

  return NextResponse.json({ completed: true, score, progressId: progress.id });
}
