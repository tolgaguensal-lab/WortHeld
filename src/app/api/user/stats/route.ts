import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Nicht authentifiziert" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [sessionsToday, wordsInReview, profile, subscription] =
      await Promise.all([
        prisma.tutorRequestLog.count({
          where: { userId, createdAt: { gte: today } },
        }),
        prisma.reviewItem.count({
          where: { userId },
        }),
        prisma.userProfile.findUnique({
          where: { userId },
          select: { currentLevel: true },
        }),
        prisma.subscription.findUnique({
          where: { userId },
          select: { planId: true, status: true },
        }),
      ]);

    let tier: string = "free";
    if (subscription && subscription.status === "active") {
      if (subscription.planId.includes("premium")) tier = "premium";
      else if (subscription.planId.includes("plus")) tier = "plus";
    }

    return Response.json({
      sessionsToday,
      wordsInReview,
      currentLevel: profile?.currentLevel ?? "A1",
      tier,
    });
  } catch (error) {
    console.error("[USER_STATS_ERROR]:", error);
    return Response.json({
      sessionsToday: 0,
      wordsInReview: 0,
      currentLevel: "A1",
      tier: "free",
    });
  }
}
