import { PrismaClient, CEFRLevel, ExerciseType, DifficultyLevel } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seed-Daten werden erstellt...");

  const course = await prisma.course.upsert({
    where: { id: "course-a1" }, update: {},
    create: { id: "course-a1", name: "Deutsch im Alltag", description: "Grundlagen des Deutschen fur Anfanger", level: CEFRLevel.A1, order: 1 },
  });

  const unit1 = await prisma.unit.upsert({
    where: { id: "unit-1" }, update: {},
    create: { id: "unit-1", courseId: course.id, name: " begrussung & Vorstellung", description: "Begrussen, sich vorstellen", order: 1, themeColor: "#22c55e" },
  });

  const lesson1 = await prisma.lesson.upsert({
    where: { id: "lesson-1" }, update: {},
    create: { id: "lesson-1", unitId: unit1.id, name: "Hallo! Begrussungen", description: "Einfache Begrussungen auf Deutsch", order: 1, xpReward: 15, isLocked: false, requiredXp: 0 },
  });

  const vocabData = [
    { word: "Hallo", pos: "interjection", translationEn: "Hello", exampleSentence: "Hallo, wie geht es dir?" },
    { word: "Guten Morgen", pos: "phrase", translationEn: "Good morning", exampleSentence: "Guten Morgen, Herr Muller!" },
    { word: "Guten Tag", pos: "phrase", translationEn: "Good day", exampleSentence: "Guten Tag, kann ich Ihnen helfen?" },
    { word: "Guten Abend", pos: "phrase", translationEn: "Good evening", exampleSentence: "Guten Abend, willkommen zum Kurs." },
    { word: "Tschuss", pos: "interjection", translationEn: "Bye", exampleSentence: "Tschuss, bis morgen!" },
    { word: "Danke", pos: "interjection", translationEn: "Thank you", exampleSentence: "Danke fur Ihre Hilfe." },
    { word: "Bitte", pos: "interjection", translationEn: "Please", exampleSentence: "Ein Kaffee, bitte." },
    { word: "Ja", pos: "adverb", translationEn: "Yes", exampleSentence: "Ja, ich komme mit." },
    { word: "Nein", pos: "adverb", translationEn: "No", exampleSentence: "Nein, danke." },
    { word: "Tisch", article: "der", pos: "noun", translationEn: "table", exampleSentence: "Der Tisch ist gross." },
    { word: "Stuhl", article: "der", pos: "noun", translationEn: "chair", exampleSentence: "Der Stuhl ist bequem." },
    { word: "Buch", article: "das", pos: "noun", translationEn: "book", exampleSentence: "Das Buch ist interessant." },
    { word: "Haus", article: "das", pos: "noun", translationEn: "house", exampleSentence: "Das Haus ist gross." },
    { word: "Frau", article: "die", pos: "noun", translationEn: "woman", exampleSentence: "Die Frau liest ein Buch." },
    { word: "Mann", article: "der", pos: "noun", translationEn: "man", exampleSentence: "Der Mann trinkt Kaffee." },
    { word: "sein", pos: "verb", translationEn: "to be", baseForm: "sein", exampleSentence: "Ich bin Student." },
    { word: "haben", pos: "verb", translationEn: "to have", baseForm: "haben", exampleSentence: "Ich habe einen Hund." },
    { word: "heissen", pos: "verb", translationEn: "to be called", baseForm: "heissen", exampleSentence: "Ich heisse Anna." },
    { word: "kommen", pos: "verb", translationEn: "to come", baseForm: "kommen", exampleSentence: "Woher kommen Sie?" },
    { word: "gehen", pos: "verb", translationEn: "to go", baseForm: "gehen", exampleSentence: "Ich gehe in die Schule." },
  ];

  for (const v of vocabData) {
    await prisma.vocabulary.upsert({
      where: { id: `vocab-${v.word}` }, update: {},
      create: { id: `vocab-${v.word}`, word: v.word, article: (v as any).article, pos: v.pos, level: CEFRLevel.A1, baseForm: (v as any).baseForm, translationEn: v.translationEn, exampleSentence: v.exampleSentence, reviewedByAdmin: true, isPublished: true },
    });
  }

  const exercises = [
    { type: ExerciseType.MULTIPLE_CHOICE, question: 'Was bedeutet "Hallo"?', correctAnswer: "Hello", order: 1 },
    { type: ExerciseType.MULTIPLE_CHOICE, question: 'Was bedeutet "Danke"?', correctAnswer: "Thank you", order: 2 },
    { type: ExerciseType.MULTIPLE_CHOICE, question: 'Was bedeutet "Tschuss"?', correctAnswer: "Bye", order: 3 },
    { type: ExerciseType.ARTICLE_TRAINING, question: 'Welcher Artikel gehort zu "Tisch"?', correctAnswer: "der", order: 4 },
    { type: ExerciseType.ARTICLE_TRAINING, question: 'Welcher Artikel gehort zu "Frau"?', correctAnswer: "die", order: 5 },
    { type: ExerciseType.ARTICLE_TRAINING, question: 'Welcher Artikel gehort zu "Haus"?', correctAnswer: "das", order: 6 },
    { type: ExerciseType.FILL_BLANK, question: 'Fulle die Lucke: "Ich ___ Anna."', correctAnswer: "heisse", order: 7 },
    { type: ExerciseType.FILL_BLANK, question: 'Fulle die Lucke: "Guten ___, Herr Muller!"', correctAnswer: "Morgen", order: 8 },
    { type: ExerciseType.SENTENCE_ORDER, question: 'Setze zusammen: Wie / Sie / heissen', correctAnswer: "Wie heissen Sie?", order: 9 },
    { type: ExerciseType.TRANSLATION, question: 'Ubersetze: "Good morning"', correctAnswer: "Guten Morgen", order: 10 },
    { type: ExerciseType.TRANSLATION, question: 'Ubersetze: "Thank you"', correctAnswer: "Danke", order: 11 },
    { type: ExerciseType.LISTENING, question: "Was hast du gehort?", correctAnswer: "Hallo", order: 12 },
    { type: ExerciseType.MULTIPLE_CHOICE, question: 'Was bedeutet "Bitte"?', correctAnswer: "Please", order: 13 },
    { type: ExerciseType.VERB_CONJUGATION, question: 'Konjugiere "sein" fur "ich"', correctAnswer: "bin", order: 14 },
    { type: ExerciseType.VERB_CONJUGATION, question: 'Konjugiere "heissen" fur "ich"', correctAnswer: "heisse", order: 15 },
  ];

  for (const e of exercises) {
    await prisma.exercise.upsert({
      where: { id: `ex-${lesson1.id}-${e.order}` }, update: {},
      create: { id: `ex-${lesson1.id}-${e.order}`, lessonId: lesson1.id, type: e.type, question: e.question, content: JSON.stringify({}), correctAnswer: e.correctAnswer, xpValue: 5, difficulty: DifficultyLevel.EASY, order: e.order },
    });
  }

  await prisma.lesson.upsert({ where: { id: "lesson-2" }, update: {}, create: { id: "lesson-2", unitId: unit1.id, name: "Wie heisst du?", description: "Vorstellung und Personalpronomen", order: 2, xpReward: 15, isLocked: true, requiredXp: 15 } });
  await prisma.lesson.upsert({ where: { id: "lesson-3" }, update: {}, create: { id: "lesson-3", unitId: unit1.id, name: "Woher kommst du?", description: "Herkunft und Nationalitaten", order: 3, xpReward: 15, isLocked: true, requiredXp: 30 } });

  const unit2 = await prisma.unit.upsert({ where: { id: "unit-2" }, update: {}, create: { id: "unit-2", courseId: course.id, name: "Zahlen & Zeit", description: "Zahlen, Uhrzeit und Wochentage", order: 2, themeColor: "#3b82f6" } });
  await prisma.lesson.upsert({ where: { id: "lesson-4" }, update: {}, create: { id: "lesson-4", unitId: unit2.id, name: "Zahlen von 1-100", description: "Zahlen lernen", order: 1, xpReward: 15, isLocked: true, requiredXp: 45 } });
  await prisma.lesson.upsert({ where: { id: "lesson-5" }, update: {}, create: { id: "lesson-5", unitId: unit2.id, name: "Uhrzeit und Wochentage", description: "Uhrzeit sagen", order: 2, xpReward: 15, isLocked: true, requiredXp: 60 } });

  const unit3 = await prisma.unit.upsert({ where: { id: "unit-3" }, update: {}, create: { id: "unit-3", courseId: course.id, name: "Familie & Menschen", description: "Familie, Korper und Farben", order: 3, themeColor: "#f59e0b" } });
  await prisma.lesson.upsert({ where: { id: "lesson-6" }, update: {}, create: { id: "lesson-6", unitId: unit3.id, name: "Meine Familie", description: "Familienmitglieder", order: 1, xpReward: 15, isLocked: true, requiredXp: 75 } });
  await prisma.lesson.upsert({ where: { id: "lesson-7" }, update: {}, create: { id: "lesson-7", unitId: unit3.id, name: "Korper und Farben", description: "Korpteile und Farben", order: 2, xpReward: 15, isLocked: true, requiredXp: 90 } });

  const achievements = [
    { name: "Erste Schritte", description: "Schliesse deine erste Lektion ab", category: "lessons", requirement: 1, xpReward: 10 },
    { name: "Worter-Sammler", description: "Lerne 50 Worter", category: "vocabulary", requirement: 50, xpReward: 25 },
    { name: "Grammatik-Guru", description: "Schliesse 10 Grammatikubungen ab", category: "grammar", requirement: 10, xpReward: 20 },
    { name: "Streng-Konig", description: "7 Tage in Folge lernen", category: "streak", requirement: 7, xpReward: 50 },
    { name: "Monats-Lerner", description: "30 Tage in Folge lernen", category: "streak", requirement: 30, xpReward: 200 },
    { name: "A1 Meister", description: "Schliesse alle A1-Lektionen ab", category: "level", requirement: 1, xpReward: 100 },
    { name: "Perfektionist", description: "Erreiche 100% in 5 Lektionen", category: "perfect", requirement: 5, xpReward: 75 },
    { name: "Speed-Lerner", description: "Schliesse eine Lektion unter 2 Minuten ab", category: "speed", requirement: 1, xpReward: 30 },
    { name: "Nachteule", description: "Lerne nach 22 Uhr", category: "special", requirement: 1, xpReward: 15 },
    { name: "Frihaufsteher", description: "Lerne vor 7 Uhr", category: "special", requirement: 1, xpReward: 15 },
    { name: "XP-Jager", description: "Verdiene 1000 XP", category: "xp", requirement: 1000, xpReward: 100 },
    { name: "Vokabel-Held", description: "Lerne 200 Worter", category: "vocabulary", requirement: 200, xpReward: 100 },
    { name: "Schreib-Meister", description: "Schliesse 20 Schreibubungen ab", category: "writing", requirement: 20, xpReward: 50 },
    { name: "Hor-Profi", description: "Schliesse 20 Horverstehen ab", category: "listening", requirement: 20, xpReward: 50 },
    { name: "Soziale Biene", description: "Lade einen Freund ein", category: "social", requirement: 1, xpReward: 25 },
  ];

  for (const a of achievements) {
    await prisma.achievement.upsert({ where: { id: `ach-${a.name}` }, update: {}, create: { id: `ach-${a.name}`, ...a } });
  }

  await prisma.aPIImportSource.upsert({ where: { id: "src-tatoeba" }, update: {}, create: { id: "src-tatoeba", name: "Tatoeba", url: "https://tatoeba.org/api" } });
  await prisma.aPIImportSource.upsert({ where: { id: "src-wiktionary" }, update: {}, create: { id: "src-wiktionary", name: "Wiktionary", url: "https://en.wiktionary.org/api" } });

  console.log("Seed abgeschlossen!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
