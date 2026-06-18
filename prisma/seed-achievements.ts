/**
 * Seed achievements into the database.
 * Run via: npx tsx prisma/seed-achievements.ts
 */
import { PrismaClient } from "@prisma/client";
import { achievements } from "./seed-data/achievements";

const prisma = new PrismaClient();

async function main() {
  console.log("🏆 Seeding achievements...");

  for (const achievement of achievements) {
    await prisma.achievement.upsert({
      where: { id: `ach-${achievement.name.toLowerCase().replace(/\s+/g, "-")}` },
      update: achievement,
      create: {
        id: `ach-${achievement.name.toLowerCase().replace(/\s+/g, "-")}`,
        ...achievement,
      },
    });
  }

  const count = await prisma.achievement.count();
  console.log(`✅ ${count} achievements seeded.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
