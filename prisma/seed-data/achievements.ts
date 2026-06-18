/**
 * Achievement seed data — 25 badges across 5 categories.
 * Run via: npx tsx prisma/seed-achievements.ts
 */

export const achievements = [
  // ── Streak Achievements ──
  { name: "Erster Schritt", description: "1 Tag in Folge gelernt", category: "streak", iconUrl: "/badges/streak-1.svg", requirement: 1, xpReward: 10 },
  { name: "Am Ball bleiben", description: "7 Tage in Folge gelernt", category: "streak", iconUrl: "/badges/streak-7.svg", requirement: 7, xpReward: 50 },
  { name: "Lernroutine", description: "30 Tage in Folge gelernt", category: "streak", iconUrl: "/badges/streak-30.svg", requirement: 30, xpReward: 150 },
  { name: "Disziplin", description: "100 Tage in Folge gelernt", category: "streak", iconUrl: "/badges/streak-100.svg", requirement: 100, xpReward: 500 },
  { name: "Legende", description: "365 Tage in Folge gelernt", category: "streak", iconUrl: "/badges/streak-365.svg", requirement: 365, xpReward: 2000 },

  // ── XP Achievements ──
  { name: "Sammler", description: "100 XP gesammelt", category: "xp", iconUrl: "/badges/xp-100.svg", requirement: 100, xpReward: 20 },
  { name: "Fleißig", description: "500 XP gesammelt", category: "xp", iconUrl: "/badges/xp-500.svg", requirement: 500, xpReward: 50 },
  { name: "Wissbegierig", description: "2.000 XP gesammelt", category: "xp", iconUrl: "/badges/xp-2000.svg", requirement: 2000, xpReward: 100 },
  { name: "Gelehrter", description: "10.000 XP gesammelt", category: "xp", iconUrl: "/badges/xp-10000.svg", requirement: 10000, xpReward: 250 },
  { name: "Meister", description: "50.000 XP gesammelt", category: "xp", iconUrl: "/badges/xp-50000.svg", requirement: 50000, xpReward: 500 },

  // ── Lesson Achievements ──
  { name: "Anfänger", description: "1 Lektion abgeschlossen", category: "lessons", iconUrl: "/badges/lesson-1.svg", requirement: 1, xpReward: 15 },
  { name: "Lerner", description: "10 Lektionen abgeschlossen", category: "lessons", iconUrl: "/badges/lesson-10.svg", requirement: 10, xpReward: 50 },
  { name: "Fortgeschritten", description: "50 Lektionen abgeschlossen", category: "lessons", iconUrl: "/badges/lesson-50.svg", requirement: 50, xpReward: 200 },
  { name: "Experte", description: "100 Lektionen abgeschlossen", category: "lessons", iconUrl: "/badges/lesson-100.svg", requirement: 100, xpReward: 500 },
  { name: "Vollständig", description: "Alle Lektionen eines Niveaus abgeschlossen", category: "lessons", iconUrl: "/badges/lesson-all.svg", requirement: 250, xpReward: 1000 },

  // ── Skill Achievements ──
  { name: "Wortschatz-Sammler", description: "50 Vokabeln gelernt", category: "skills", iconUrl: "/badges/vocab-50.svg", requirement: 50, xpReward: 30 },
  { name: "Wortschatz-Jäger", description: "200 Vokabeln gelernt", category: "skills", iconUrl: "/badges/vocab-200.svg", requirement: 200, xpReward: 100 },
  { name: "Grammatik-Fan", description: "10 Grammatiklektionen absolviert", category: "skills", iconUrl: "/badges/grammar-10.svg", requirement: 10, xpReward: 50 },
  { name: "Schreib-Profi", description: "25 Schreibübungen abgeschlossen", category: "skills", iconUrl: "/badges/writing-25.svg", requirement: 25, xpReward: 100 },
  { name: "Hörverstehen-Star", description: "50 Hörübungen abgeschlossen", category: "skills", iconUrl: "/badges/listening-50.svg", requirement: 50, xpReward: 150 },

  // ── Special Achievements ──
  { name: "DTZ-Bereit", description: "DTZ-Übungstest mit 80%+ bestanden", category: "special", iconUrl: "/badges/dtz-ready.svg", requirement: 80, xpReward: 300 },
  { name: "Perfekte Lektion", description: "Eine Lektion mit 100% abgeschlossen", category: "special", iconUrl: "/badges/perfect.svg", requirement: 1, xpReward: 50 },
  { name: "Vielsprachig", description: "Inhalt in 3 verschiedenen Sprachen erklärt bekommen", category: "special", iconUrl: "/badges/multilingual.svg", requirement: 3, xpReward: 30 },
  { name: "Nachteule", description: "Zwischen 22:00 und 04:00 Uhr gelernt", category: "special", iconUrl: "/badges/night-owl.svg", requirement: 1, xpReward: 20 },
  { name: "Frühaufsteher", description: "Vor 07:00 Uhr gelernt", category: "special", iconUrl: "/badges/early-bird.svg", requirement: 1, xpReward: 20 },
];
