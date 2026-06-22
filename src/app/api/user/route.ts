import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Nicht authentifiziert" }, { status: 401 });
  const userId = session.user.id;
  const profile = await prisma.userProfile.findUnique({ where: { userId } });
  if (!profile) return NextResponse.json({ error: "Profil nicht gefunden" }, { status: 404 });
  return NextResponse.json(profile);
}

export async function PUT(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Nicht authentifiziert" }, { status: 401 });
  const userId = session.user.id;
  const body = await req.json();
  const profile = await prisma.userProfile.update({ where: { userId }, data: body });
  return NextResponse.json(profile);
}

// Art. 17 DSGVO + Play Store/App Store requirement: Account deletion
export async function DELETE() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Nicht authentifiziert" }, { status: 401 });
  const userId = session.user.id;

  try {
    // Cascade delete ALL user data (Prisma schema has onDelete: Cascade)
    await prisma.user.delete({ where: { id: userId } });
    return NextResponse.json({ success: true, message: "Konto und alle Daten wurden gelöscht." });
  } catch (error) {
    return NextResponse.json({ error: "Fehler beim Löschen des Kontos" }, { status: 500 });
  }
}

// Art. 20 DSGVO: Data portability — export all user data as JSON
export async function PATCH() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Nicht authentifiziert" }, { status: 401 });
  const userId = session.user.id;

  try {
    const [profile, progress, achievements, reviewItems, errorProfile] = await Promise.all([
      prisma.userProfile.findUnique({ where: { userId } }),
      prisma.userProgress.findMany({ where: { userId }, include: { lesson: { select: { name: true } } } }),
      prisma.userAchievement.findMany({ where: { userId }, include: { achievement: { select: { name: true, description: true } } } }),
      prisma.reviewItem.findMany({ where: { userId }, include: { vocabulary: { select: { word: true, article: true, translationEn: true } } } }),
      prisma.userErrorProfile.findMany({ where: { userId } }),
    ]);

    return NextResponse.json({
      exportedAt: new Date().toISOString(),
      profile,
      progress: progress.map(p => ({ lesson: p.lesson.name, completed: p.completed, score: p.score, xpEarned: p.xpEarned })),
      achievements: achievements.map(a => ({ name: a.achievement.name, unlockedAt: a.unlockedAt })),
      reviewItems: reviewItems.map(r => ({ word: r.vocabulary?.word, article: r.vocabulary?.article, translation: r.vocabulary?.translationEn, easeFactor: r.easeFactor, repetitions: r.repetitions })),
      errorPatterns: errorProfile.map(e => ({ errorType: e.errorType, grammarTopic: e.grammarTopic, occurrences: e.occurrences })),
    });
  } catch (error) {
    return NextResponse.json({ error: "Fehler beim Datenexport" }, { status: 500 });
  }
}
