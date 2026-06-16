import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const testId = searchParams.get("id");
    const skill = searchParams.get("skill");
    const level = searchParams.get("level");

    if (testId) {
      // Get single test
      const test = await prisma.dTZTest.findUnique({
        where: { id: testId },
        include: { _count: { select: { results: true } } },
      });

      if (!test) {
        return NextResponse.json({ error: "Test not found" }, { status: 404 });
      }

      return NextResponse.json(test);
    }

    // Get all tests
    const where: any = { isActive: true };
    if (skill) where.skill = skill;
    if (level) where.level = level;

    const tests = await prisma.dTZTest.findMany({
      where,
      orderBy: [{ level: "asc" }, { skill: "asc" }, { order: "asc" }],
      include: { _count: { select: { results: true } } },
    });

    return NextResponse.json(tests);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
