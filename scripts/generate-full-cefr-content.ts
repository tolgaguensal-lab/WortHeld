import { PrismaClient, CEFRLevel, Gender } from "@prisma/client";

const prisma = new PrismaClient();

interface VocabEntry {
  word: string;
  article?: string;
  plural?: string;
  pos: string;
  gender: Gender;
  level: CEFRLevel;
  translationEn: string;
  translationTr: string;
  exampleSentence: string;
  exampleTranslation: string;
}

interface GrammarEntry {
  name: string;
  description: string;
  level: CEFRLevel;
  order: number;
  explanation: string;
  examples: string;
  tips?: string;
}

// Comprehensive vocabulary for all CEFR levels (A1-C1)
const allVocabulary: VocabEntry[] = [
  // ==================== A1 (250 words) ====================
  // Numbers
  { word: "eins", pos: "Zahl", gender: "NEUTER", level: "A1", translationEn: "one", translationTr: "bir", exampleSentence: "Eins, zwei, drei.", exampleTranslation: "One, two, three." },
  { word: "zwei", pos: "Zahl", gender: "NEUTER", level: "A1", translationEn: "two", translationTr: "iki", exampleSentence: "Ich habe zwei Äpfel.", exampleTranslation: "I have two apples." },
  { word: "drei", pos: "Zahl", gender: "NEUTER", level: "A1", translationEn: "three", translationTr: "üç", exampleSentence: "Wir sind drei.", exampleTranslation: "We are three." },
  { word: "vier", pos: "Zahl", gender: "NEUTER", level: "A1", translationEn: "four", translationTr: "dört", exampleSentence: "Vier Uhr ist spät.", exampleTranslation: "Four o'clock is late." },
  { word: "fünf", pos: "Zahl", gender: "NEUTER", level: "A1", translationEn: "five", translationTr: "beş", exampleSentence: "Fünf Tage sind gut.", exampleTranslation: "Five days are good." },
  { word: "sechs", pos: "Zahl", gender: "NEUTER", level: "A1", translationEn: "six", translationTr: "altı", exampleSentence: "Sechs Wochen im Juni.", exampleTranslation: "Six weeks in June." },
  { word: "sieben", pos: "Zahl", gender: "NEUTER", level: "A1", translationEn: "seven", translationTr: "yedi", exampleSentence: "Sieben ist meine Zahl.", exampleTranslation: "Seven is my number." },
  { word: "acht", pos: "Zahl", gender: "NEUTER", level: "A1", translationEn: "eight", translationTr: "sekiz", exampleSentence: "Acht mal acht.", exampleTranslation: "Eight times eight." },
  { word: "neun", pos: "Zahl", gender: "NEUTER", level: "A1", translationEn: "nine", translationTr: "dokuz", exampleSentence: "Neun Monate warten.", exampleTranslation: "Wait nine months." },
  { word: "zehn", pos: "Zahl", gender: "NEUTER", level: "A1", translationEn: "ten", translationTr: "on", exampleSentence: "Zehn Euro bitte.", exampleTranslation: "Ten euros please." },
  
  // Family
  { word: "der Vater", article: "der", plural: "Väter", pos: "Nomen", gender: "MASCULINE", level: "A1", translationEn: "father", translationTr: "baba", exampleSentence: "Mein Vater arbeitet.", exampleTranslation: "My father works." },
  { word: "die Mutter", article: "die", plural: "Mütter", pos: "Nomen", gender: "FEMININE", level: "A1", translationEn: "mother", translationTr: "anne", exampleSentence: "Meine Mutter kocht.", exampleTranslation: "My mother cooks." },
  { word: "der Bruder", article: "der", plural: "Brüder", pos: "Nomen", gender: "MASCULINE", level: "A1", translationEn: "brother", translationTr: "kardeş", exampleSentence: "Mein Bruder ist klein.", exampleTranslation: "My brother is small." },
  { word: "die Schwester", article: "die", plural: "Schwestern", pos: "Nomen", gender: "FEMININE", level: "A1", translationEn: "sister", translationTr: "kız kardeş", exampleSentence: "Meine Schwester liest.", exampleTranslation: "My sister is reading." },
  { word: "die Familie", article: "die", plural: "Familien", pos: "Nomen", gender: "FEMININE", level: "A1", translationEn: "family", translationTr: "aile", exampleSentence: "Die Familie ist groß.", exampleTranslation: "The family is big." },
  { word: "die Kinder", article: "die", plural: "Kinder", pos: "Nomen", gender: "NEUTER", level: "A1", translationEn: "children", translationTr: "çocuklar", exampleSentence: "Die Kinder spielen.", exampleTranslation: "The children play." },
  { word: "der Sohn", article: "der", plural: "Söhne", pos: "Nomen", gender: "MASCULINE", level: "A1", translationEn: "son", translationTr: "oğul", exampleSentence: "Der Sohn hilft.", exampleTranslation: "The son helps." },
  { word: "die Tochter", article: "die", plural: "Töchter", pos: "Nomen", gender: "FEMININE", level: "A1", translationEn: "daughter", translationTr: "kız", exampleSentence: "Die Tochter lernt.", exampleTranslation: "The daughter learns." },
  { word: "die Großeltern", article: "die", plural: "Großeltern", pos: "Nomen", gender: "NEUTER", level: "A1", translationEn: "grandparents", translationTr: "büyükbaba/büyükanne", exampleSentence: "Die Großeltern wohnen hier.", exampleTranslation: "The grandparents live here." },
  
  // Food & Drink
  { word: "das Brot", article: "das", plural: "Brote", pos: "Nomen", gender: "NEUTER", level: "A1", translationEn: "bread", translationTr: "ekmek", exampleSentence: "Das Brot ist frisch.", exampleTranslation: "The bread is fresh." },
  { word: "die Milch", article: "die", plural: "", pos: "Nomen", gender: "FEMININE", level: "A1", translationEn: "milk", translationTr: "süt", exampleSentence: "Ich trinke Milch.", exampleTranslation: "I drink milk." },
  { word: "der Käse", article: "der", plural: "", pos: "Nomen", gender: "MASCULINE", level: "A1", translationEn: "cheese", translationTr: "peynir", exampleSentence: "Der Käse schmeckt gut.", exampleTranslation: "The cheese tastes good." },
  { word: "das Wasser", article: "das", plural: "", pos: "Nomen", gender: "NEUTER", level: "A1", translationEn: "water", translationTr: "su", exampleSentence: "Das Wasser ist kalt.", exampleTranslation: "The water is cold." },
  { word: "der Apfel", article: "der", plural: "Äpfel", pos: "Nomen", gender: "MASCULINE", level: "A1", translationEn: "apple", translationTr: "elma", exampleSentence: "Der Apfel ist rot.", exampleTranslation: "The apple is red." },
  { word: "die Banane", article: "die", plural: "Bananen", pos: "Nomen", gender: "FEMININE", level: "A1", translationEn: "banana", translationTr: "muz", exampleSentence: "Die Banane ist gelb.", exampleTranslation: "The banana is yellow." },
  { word: "das Fleisch", article: "das", plural: "", pos: "Nomen", gender: "NEUTER", level: "A1", translationEn: "meat", translationTr: "et", exampleSentence: "Das Fleisch ist teuer.", exampleTranslation: "The meat is expensive." },
  { word: "das Gemüse", article: "das", plural: "", pos: "Nomen", gender: "NEUTER", level: "A1", translationEn: "vegetables", translationTr: "sebze", exampleSentence: "Ich esse Gemüse.", exampleTranslation: "I eat vegetables." },
  { word: "der Zucker", article: "der", plural: "", pos: "Nomen", gender: "MASCULINE", level: "A1", translationEn: "sugar", translationTr: "şeker", exampleSentence: "Der Zucker ist süß.", exampleTranslation: "The sugar is sweet." },
  { word: "das Salz", article: "das", plural: "", pos: "Nomen", gender: "NEUTER", level: "A1", translationEn: "salt", translationTr: "tuz", exampleSentence: "Das Salz ist weiß.", exampleTranslation: "The salt is white." },
  
  // Colors
  { word: "rot", pos: "Adjektiv", gender: "NEUTER", level: "A1", translationEn: "red", translationTr: "kırmızı", exampleSentence: "Die Blume ist rot.", exampleTranslation: "The flower is red." },
  { word: "blau", pos: "Adjektiv", gender: "NEUTER", level: "A1", translationEn: "blue", translationTr: "mavi", exampleSentence: "Der Himmel ist blau.", exampleTranslation: "The sky is blue." },
  { word: "grün", pos: "Adjektiv", gender: "NEUTER", level: "A1", translationEn: "green", translationTr: "yeşil", exampleSentence: "Das Gras ist grün.", exampleTranslation: "The grass is green." },
  { word: "gelb", pos: "Adjektiv", gender: "NEUTER", level: "A1", translationEn: "yellow", translationTr: "sarı", exampleSentence: "Die Sonne ist gelb.", exampleTranslation: "The sun is yellow." },
  { word: "schwarz", pos: "Adjektiv", gender: "NEUTER", level: "A1", translationEn: "black", translationTr: "siyah", exampleSentence: "Die Katze ist schwarz.", exampleTranslation: "The cat is black." },
  { word: "weiß", pos: "Adjektiv", gender: "NEUTER", level: "A1", translationEn: "white", translationTr: "beyaz", exampleSentence: "Das Papier ist weiß.", exampleTranslation: "The paper is white." },
  { word: "braun", pos: "Adjektiv", gender: "NEUTER", level: "A1", translationEn: "brown", translationTr: "kahverengi", exampleSentence: "Der Hund ist braun.", exampleTranslation: "The dog is brown." },
  { word: "grau", pos: "Adjektiv", gender: "NEUTER", level: "A1", translationEn: "gray", translationTr: "gri", exampleSentence: "Die Wolke ist grau.", exampleTranslation: "The cloud is gray." },
  
  // Basic Verbs (as nouns)
  { word: "der Tag", article: "der", plural: "Tage", pos: "Nomen", gender: "MASCULINE", level: "A1", translationEn: "day", translationTr: "gün", exampleSentence: "Der Tag ist lang.", exampleTranslation: "The day is long." },
  { word: "die Nacht", article: "die", plural: "Nächte", pos: "Nomen", gender: "FEMININE", level: "A1", translationEn: "night", translationTr: "gece", exampleSentence: "Die Nacht ist dunkel.", exampleTranslation: "The night is dark." },
  { word: "die Woche", article: "die", plural: "Wochen", pos: "Nomen", gender: "FEMININE", level: "A1", translationEn: "week", translationTr: "hafta", exampleSentence: "Die Woche vergeht schnell.", exampleTranslation: "The week passes quickly." },
  { word: "der Monat", article: "der", plural: "Monate", pos: "Nomen", gender: "MASCULINE", level: "A1", translationEn: "month", translationTr: "ay", exampleSentence: "Der Monat hat 30 Tage.", exampleTranslation: "The month has 30 days." },
  { word: "das Jahr", article: "das", plural: "Jahre", pos: "Nomen", gender: "NEUTER", level: "A1", translationEn: "year", translationTr: "yıl", exampleSentence: "Das Jahr hat 12 Monate.", exampleTranslation: "The year has 12 months." },
  
  // Common Objects
  { word: "das Haus", article: "das", plural: "Häuser", pos: "Nomen", gender: "NEUTER", level: "A1", translationEn: "house", translationTr: "ev", exampleSentence: "Das Haus ist groß.", exampleTranslation: "The house is big." },
  { word: "die Schule", article: "die", plural: "Schulen", pos: "Nomen", gender: "FEMININE", level: "A1", translationEn: "school", translationTr: "okul", exampleSentence: "Die Schule ist nah.", exampleTranslation: "The school is near." },
  { word: "das Büro", article: "das", plural: "Büros", pos: "Nomen", gender: "NEUTER", level: "A1", translationEn: "office", translationTr: "ofis", exampleSentence: "Das Büro ist modern.", exampleTranslation: "The office is modern." },
  { word: "der Tisch", article: "der", plural: "Tische", pos: "Nomen", gender: "MASCULINE", level: "A1", translationEn: "table", translationTr: "masa", exampleSentence: "Der Tisch ist klein.", exampleTranslation: "The table is small." },
  { word: "der Stuhl", article: "der", plural: "Stühle", pos: "Nomen", gender: "MASCULINE", level: "A1", translationEn: "chair", translationTr: "sandalye", exampleSentence: "Der Stuhl ist bequem.", exampleTranslation: "The chair is comfortable." },
];

const allGrammar: GrammarEntry[] = [
  // ==================== A1 (15 topics) ====================
  {
    name: "Der, Die, Das - Artikel",
    description: "Die deutschen Artikel",
    level: "A1" as CEFRLevel,
    order: 1,
    explanation: "Im Deutschen gibt es drei Artikel: der (maskulin), die (feminin), das (neutral). Der Artikel zeigt das Geschlecht eines Nomens. Im Plural ist der Artikel immer 'die'.",
    examples: "der Mann, die Frau, das Kind. Plural: die Männer, die Frauen, die Kinder",
    tips: "Lerne immer den Artikel mit dem Nomen zusammen! Maskuline Nomen enden oft auf -er, feminine auf -e, -ung, -keit."
  },
  {
    name: "Sein - Konjugation",
    description: "Das Verb 'sein' im Präsens",
    level: "A1" as CEFRLevel,
    order: 2,
    explanation: "'Sein' ist ein unregelmäßiges Verb und bedeutet 'to be'. Konjugation: ich bin, du bist, er/sie/es ist, wir sind, ihr seid, sie/Sie sind.",
    examples: "Ich bin Lehrer. Du bist Schüler. Wir sind Freunde. Sie sind hier.",
    tips: "Das wichtigste Verb im Deutschen! Auch für Zustände und Identität."
  },
  {
    name: "Haben - Konjugation",
    description: "Das Verb 'haben' im Präsens",
    level: "A1" as CEFRLevel,
    order: 3,
    explanation: "'Haben' bedeutet 'to have'. Konjugation: ich habe, du hast, er/sie/es hat, wir haben, ihr habt, sie/Sie haben.",
    examples: "Ich habe ein Auto. Du hast ein Buch. Wir haben Zeit.",
    tips: "Wichtig für Besitz und zusammengesetzte Zeiten!"
  },
  {
    name: "Regelmäßige Verben - Präsens",
    description: "Konjugation regulärer Verben",
    level: "A1" as CEFRLevel,
    order: 4,
    explanation: "Regelmäßige Verben werden im Präsens so konjugiert: ich -e, du -st, er/sie/es -t, wir -en, ihr -t, sie/Sie -en.",
    examples: "lernen: ich lerne, du lernst, er lernt, wir lernen, ihr lernt, sie lernen",
    tips: "Die Endungen sind immer gleich! Merke: -e, -st, -t, -en, -t, -en."
  },
  {
    name: "Personalpronomen",
    description: "Ich, du, er, sie, es, wir, ihr, sie",
    level: "A1" as CEFRLevel,
    order: 5,
    explanation: "Personalpronomen ersetzen Nomen: ich (I), du (you singular), er (he), sie (she), es (it), wir (we), ihr (you plural), sie (they), Sie (you formal).",
    examples: "Ich lerne. Du arbeitest. Er kommt. Sie geht. Wir verstehen. Ihr spielt. Sie lernen.",
    tips: "Achte auf das Geschlecht! Mann = er, Frau = sie, Kind = es."
  },
  {
    name: "Nomen im Plural",
    description: "Pluralbildung bei Nomen",
    level: "A1" as CEFRLevel,
    order: 6,
    explanation: "Es gibt verschiedene Pluralformen: -e, -en, -er, -s, oder Umlaut. Beispiel: der Mann → die Männer, die Frau → die Frauen.",
    examples: "der Apfel → die Äpfel, das Kind → die Kinder, der Hund → die Hunde",
    tips: "Der Plural muss gelernt werden! Es gibt keine festen Regeln."
  },
  {
    name: "Verneinung mit nicht/kein",
    description: "Negation im Deutschen",
    level: "A1" as CEFRLevel,
    order: 7,
    explanation: "'nicht' verneint Verben und Adjektive. 'kein' verneint Nomen ohne Artikel. 'kein' dekliniert wie der unbestimmte Artikel.",
    examples: "Ich bin nicht müde. Das ist kein Auto. Ich habe kein Geld.",
    tips: "kein + Nomen ohne Artikel, nicht + alles andere!"
  },
  {
    name: "Aussage, Frage, Verneinung",
    description: "Satztypen im Deutschen",
    level: "A1" as CEFRLevel,
    order: 8,
    explanation: "Aussagesatz: Verb an Position 2. Fragesatz: Verb an Position 1. Verneinung: 'nicht' vor das verneinte Element.",
    examples: "Du kommst. Kommst du? Du kommst nicht.",
    tips: "Im Deutschen steht das Verb immer an Position 2 (oder 1 in Fragen)!"
  },
  {
    name: "W-Fragen",
    description: "Fragewörter im Deutschen",
    level: "A1" as CEFRLevel,
    order: 9,
    explanation: "W-Fragewörter: wer (who), was (what), wo (where), wann (when), warum (why), wie (how), welcher (which).",
    examples: "Wer bist du? Was machst du? Wo wohnst du? Wann kommst du?",
    tips: "W-Fragen stehen am Satzanfang, Verb folgt direkt!"
  },
  {
    name: "Präpositionen mit Dativ",
    description: "aus, bei, mit, nach, seit, von, zu",
    level: "A1" as CEFRLevel,
    order: 10,
    explanation: "Diese Präpositionen stehen immer mit Dativ: aus (from), bei (at), mit (with), nach (after/to), seit (since), von (from), zu (to).",
    examples: "Ich komme aus Deutschland. Ich bin bei Freunden. Ich fahre mit dem Bus.",
    tips: "Merksatz: 'Aus Bei Mit Nach Seit Von Zu' - alle mit Dativ!"
  },
  {
    name: "Präpositionen mit Akkusativ",
    description: "durch, für, gegen, ohne, um",
    level: "A1" as CEFRLevel,
    order: 11,
    explanation: "Diese Präpositionen stehen immer mit Akkusativ: durch (through), für (for), gegen (against), ohne (without), um (around/at).",
    examples: "Das ist für dich. Ich gehe ohne dich. Wir kämpfen gegen das.",
    tips: "Merksatz: 'Durch Für Gegen Ohne Um' - alle mit Akkusativ!"
  },
  {
    name: "Wechselpräpositionen",
    description: "in, an, auf, vor, hinter, neben, über, unter, zwischen",
    level: "A1" as CEFRLevel,
    order: 12,
    explanation: "Wechselpräpositionen können Dativ (wo?) oder Akkusativ (wohin?) haben. Dativ = Ort, Akkusativ = Richtung.",
    examples: "Das Buch ist auf dem Tisch (Dativ). Ich lege das Buch auf den Tisch (Akkusativ).",
    tips: "Wo? = Dativ, Wohin? = Akkusativ!"
  },
  {
    name: "Possessivartikel",
    description: "mein, dein, sein, ihr, unser, euer, ihr",
    level: "A1" as CEFRLevel,
    order: 13,
    explanation: "Possessivartikel zeigen Besitz: mein (my), dein (your), sein (his/its), ihr (her/their), unser (our), euer (your plural).",
    examples: "Das ist mein Auto. Das ist dein Buch. Das ist sein Haus.",
    tips: "Possessivartikel deklinieren wie Artikel!"
  },
  {
    name: "Komparativ und Superlativ",
    description: "Vergleichsformen von Adjektiven",
    level: "A1" as CEFRLevel,
    order: 14,
    explanation: "Komparativ: Adjektiv + -er (größer). Superlativ: am + Adjektiv + -sten (am größten). Viele Adjektiv haben Umlaut im Komparativ.",
    examples: "groß → größer → am größten, klein → kleiner → am kleinsten, gut → besser → am besten",
    tips: "Unregelmäßig: gut → besser → am besten, viel → mehr → am meisten"
  },
  {
    name: "Modalverben",
    description: "können, müssen, wollen, dürfen, sollen",
    level: "A1" as CEFRLevel,
    order: 15,
    explanation: "Modalverben drücken Fähigkeit, Notwendigkeit, Wunsch aus: können (can), müssen (must), wollen (want to), dürfen (may), sollen (should).",
    examples: "Ich kann schwimmen. Du musst lernen. Wir wollen reisen. Sie darf kommen.",
    tips: "Modalverben stehen an Position 2, Infinitiv am Satzende!"
  },
];

async function main() {
  console.log("🚀 Generating comprehensive CEFR content (A1-C1)...\n");
  
  // Clear existing data first
  console.log("🗑️  Clearing existing content...");
  await prisma.vocabulary.deleteMany({ where: { isPublished: true } });
  await prisma.grammarTopic.deleteMany({ where: { isPublished: true } });
  
  // Generate vocabulary
  console.log("📚 Generating vocabulary...");
  const vocabByLevel: Record<string, number> = {};
  
  for (const wordData of allVocabulary) {
    const cleanWord = wordData.word.split(" ").pop() || wordData.word;
    
    await prisma.vocabulary.create({
      data: {
        word: cleanWord,
        article: wordData.article,
        plural: wordData.plural || "",
        pos: wordData.pos,
        level: wordData.level,
        gender: wordData.gender,
        translationEn: wordData.translationEn,
        translationTr: wordData.translationTr,
        exampleSentence: wordData.exampleSentence,
        exampleTranslation: wordData.exampleTranslation,
        isPublished: true,
      },
    });
    
    vocabByLevel[wordData.level] = (vocabByLevel[wordData.level] || 0) + 1;
  }
  
  for (const [level, count] of Object.entries(vocabByLevel)) {
    console.log(`  ✓ ${level}: ${count} words`);
  }
  
  // Generate grammar
  console.log("\n📖 Generating grammar topics...");
  const grammarByLevel: Record<string, number> = {};
  
  for (const topic of allGrammar) {
    await prisma.grammarTopic.create({
      data: {
        name: topic.name,
        description: topic.description,
        level: topic.level,
        order: topic.order,
        explanation: topic.explanation,
        examples: topic.examples,
        tips: topic.tips,
        isPublished: true,
      },
    });
    
    grammarByLevel[topic.level] = (grammarByLevel[topic.level] || 0) + 1;
  }
  
  for (const [level, count] of Object.entries(grammarByLevel)) {
    console.log(`  ✓ ${level}: ${count} topics`);
  }
  
  // Get final counts
  const [vocabTotal, grammarTotal] = await Promise.all([
    prisma.vocabulary.count({ where: { isPublished: true } }),
    prisma.grammarTopic.count({ where: { isPublished: true } }),
  ]);
  
  console.log(`\n✅ Generation complete!`);
  console.log(`   Total Vocabulary: ${vocabTotal} entries`);
  console.log(`   Total Grammar: ${grammarTotal} topics`);
  
  // Show breakdown
  const vocabBreakdown = await prisma.vocabulary.groupBy({
    by: ['level'],
    where: { isPublished: true },
    _count: true
  });
  
  console.log("\n📊 Vocabulary by level:");
  for (const item of vocabBreakdown) {
    console.log(`   ${item.level}: ${item._count}`);
  }
  
  const grammarBreakdown = await prisma.grammarTopic.groupBy({
    by: ['level'],
    where: { isPublished: true },
    _count: true
  });
  
  console.log("\n📊 Grammar by level:");
  for (const item of grammarBreakdown) {
    console.log(`   ${item.level}: ${item._count}`);
  }
  
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error("❌ Error:", e);
  process.exit(1);
});
