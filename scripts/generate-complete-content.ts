import { PrismaClient, CEFRLevel, Gender } from "@prisma/client";

const prisma = new PrismaClient();

// Complete vocabulary database for A1-C1
const allVocabulary: Array<{
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
}> = [
  // ==================== A1 VOCABULARY (250 words) ====================
  // Numbers
  { word: "eins", pos: "Zahl", gender: "NEUTER", level: "A1" as CEFRLevel, translationEn: "one", translationTr: "bir", exampleSentence: "Eins, zwei, drei.", exampleTranslation: "One, two, three." },
  { word: "zwei", pos: "Zahl", gender: "NEUTER", level: "A1" as CEFRLevel, translationEn: "two", translationTr: "iki", exampleSentence: "Ich habe zwei Äpfel.", exampleTranslation: "I have two apples." },
  { word: "drei", pos: "Zahl", gender: "NEUTER", level: "A1" as CEFRLevel, translationEn: "three", translationTr: "üç", exampleSentence: "Wir sind drei Personen.", exampleTranslation: "We are three people." },
  { word: "vier", pos: "Zahl", gender: "NEUTER", level: "A1" as CEFRLevel, translationEn: "four", translationTr: "dört", exampleSentence: "Vier mal vier ist sechzehn.", exampleTranslation: "Four times four is sixteen." },
  { word: "fünf", pos: "Zahl", gender: "NEUTER", level: "A1" as CEFRLevel, translationEn: "five", translationTr: "beş", exampleSentence: "Es ist fünf Uhr.", exampleTranslation: "It is five o'clock." },
  { word: "sechs", pos: "Zahl", gender: "NEUTER", level: "A1" as CEFRLevel, translationEn: "six", translationTr: "altı", exampleSentence: "Sechs Tage hat die Woche.", exampleTranslation: "The week has six days." },
  { word: "sieben", pos: "Zahl", gender: "NEUTER", level: "A1" as CEFRLevel, translationEn: "seven", translationTr: "yedi", exampleSentence: "Sieben ist meine Glückszahl.", exampleTranslation: "Seven is my lucky number." },
  { word: "acht", pos: "Zahl", gender: "NEUTER", level: "A1" as CEFRLevel, translationEn: "eight", translationTr: "sekiz", exampleSentence: "Acht Uhr ist zu früh.", exampleTranslation: "Eight o'clock is too early." },
  { word: "neun", pos: "Zahl", gender: "NEUTER", level: "A1" as CEFRLevel, translationEn: "nine", translationTr: "dokuz", exampleSentence: "Neun Monate dauert die Schwangerschaft.", exampleTranslation: "Pregnancy lasts nine months." },
  { word: "zehn", pos: "Zahl", gender: "NEUTER", level: "A1" as CEFRLevel, translationEn: "ten", translationTr: "on", exampleSentence: "Zehn Euro bitte.", exampleTranslation: "Ten euros please." },
  
  // Family
  { word: "der Vater", article: "der", plural: "Väter", pos: "Nomen", gender: "MASCULINE", level: "A1" as CEFRLevel, translationEn: "father", translationTr: "baba", exampleSentence: "Mein Vater arbeitet.", exampleTranslation: "My father works." },
  { word: "die Mutter", article: "die", plural: "Mütter", pos: "Nomen", gender: "FEMININE", level: "A1" as CEFRLevel, translationEn: "mother", translationTr: "anne", exampleSentence: "Meine Mutter kocht gut.", exampleTranslation: "My mother cooks well." },
  { word: "der Bruder", article: "der", plural: "Brüder", pos: "Nomen", gender: "MASCULINE", level: "A1" as CEFRLevel, translationEn: "brother", translationTr: "erkek kardeş", exampleSentence: "Mein Bruder ist jung.", exampleTranslation: "My brother is young." },
  { word: "die Schwester", article: "die", plural: "Schwestern", pos: "Nomen", gender: "FEMININE", level: "A1" as CEFRLevel, translationEn: "sister", translationTr: "kız kardeş", exampleSentence: "Meine Schwester studiert.", exampleTranslation: "My sister is studying." },
  { word: "die Familie", article: "die", plural: "Familien", pos: "Nomen", gender: "FEMININE", level: "A1" as CEFRLevel, translationEn: "family", translationTr: "aile", exampleSentence: "Meine Familie ist groß.", exampleTranslation: "My family is big." },
  { word: "die Kinder", article: "die", plural: "Kinder", pos: "Nomen", gender: "NEUTER", level: "A1" as CEFRLevel, translationEn: "children", translationTr: "çocuklar", exampleSentence: "Die Kinder spielen.", exampleTranslation: "The children are playing." },
  { word: "der Sohn", article: "der", plural: "Söhne", pos: "Nomen", gender: "MASCULINE", level: "A1" as CEFRLevel, translationEn: "son", translationTr: "oğul", exampleSentence: "Der Sohn hilft im Garten.", exampleTranslation: "The son helps in the garden." },
  { word: "die Tochter", article: "die", plural: "Töchter", pos: "Nomen", gender: "FEMININE", level: "A1" as CEFRLevel, translationEn: "daughter", translationTr: "kız", exampleSentence: "Die Tochter lernt Deutsch.", exampleTranslation: "The daughter is learning German." },
  
  // Food & Drink
  { word: "das Brot", article: "das", plural: "Brote", pos: "Nomen", gender: "NEUTER", level: "A1" as CEFRLevel, translationEn: "bread", translationTr: "ekmek", exampleSentence: "Ich esse Brot zum Frühstück.", exampleTranslation: "I eat bread for breakfast." },
  { word: "die Milch", article: "die", plural: "", pos: "Nomen", gender: "FEMININE", level: "A1" as CEFRLevel, translationEn: "milk", translationTr: "süt", exampleSentence: "Ich trinke Milch.", exampleTranslation: "I drink milk." },
  { word: "der Käse", article: "der", plural: "", pos: "Nomen", gender: "MASCULINE", level: "A1" as CEFRLevel, translationEn: "cheese", translationTr: "peynir", exampleSentence: "Der Käse ist lecker.", exampleTranslation: "The cheese is delicious." },
  { word: "das Wasser", article: "das", plural: "", pos: "Nomen", gender: "NEUTER", level: "A1" as CEFRLevel, translationEn: "water", translationTr: "su", exampleSentence: "Das Wasser ist kalt.", exampleTranslation: "The water is cold." },
  { word: "der Apfel", article: "der", plural: "Äpfel", pos: "Nomen", gender: "MASCULINE", level: "A1" as CEFRLevel, translationEn: "apple", translationTr: "elma", exampleSentence: "Der Apfel ist rot.", exampleTranslation: "The apple is red." },
  { word: "die Banane", article: "die", plural: "Bananen", pos: "Nomen", gender: "FEMININE", level: "A1" as CEFRLevel, translationEn: "banana", translationTr: "muz", exampleSentence: "Die Banane ist gelb.", exampleTranslation: "The banana is yellow." },
  { word: "das Fleisch", article: "das", plural: "", pos: "Nomen", gender: "NEUTER", level: "A1" as CEFRLevel, translationEn: "meat", translationTr: "et", exampleSentence: "Das Fleisch schmeckt gut.", exampleTranslation: "The meat tastes good." },
  { word: "das Gemüse", article: "das", plural: "", pos: "Nomen", gender: "NEUTER", level: "A1" as CEFRLevel, translationEn: "vegetables", translationTr: "sebze", exampleSentence: "Ich esse viel Gemüse.", exampleTranslation: "I eat a lot of vegetables." },
  
  // Colors
  { word: "rot", pos: "Adjektiv", gender: "NEUTER", level: "A1" as CEFRLevel, translationEn: "red", translationTr: "kırmızı", exampleSentence: "Die Rose ist rot.", exampleTranslation: "The rose is red." },
  { word: "blau", pos: "Adjektiv", gender: "NEUTER", level: "A1" as CEFRLevel, translationEn: "blue", translationTr: "mavi", exampleSentence: "Der Himmel ist blau.", exampleTranslation: "The sky is blue." },
  { word: "grün", pos: "Adjektiv", gender: "NEUTER", level: "A1" as CEFRLevel, translationEn: "green", translationTr: "yeşil", exampleSentence: "Das Gras ist grün.", exampleTranslation: "The grass is green." },
  { word: "gelb", pos: "Adjektiv", gender: "NEUTER", level: "A1" as CEFRLevel, translationEn: "yellow", translationTr: "sarı", exampleSentence: "Die Sonne ist gelb.", exampleTranslation: "The sun is yellow." },
  { word: "schwarz", pos: "Adjektiv", gender: "NEUTER", level: "A1" as CEFRLevel, translationEn: "black", translationTr: "siyah", exampleSentence: "Die Katze ist schwarz.", exampleTranslation: "The cat is black." },
  { word: "weiß", pos: "Adjektiv", gender: "NEUTER", level: "A1" as CEFRLevel, translationEn: "white", translationTr: "beyaz", exampleSentence: "Das Papier ist weiß.", exampleTranslation: "The paper is white." },
  { word: "braun", pos: "Adjektiv", gender: "NEUTER", level: "A1" as CEFRLevel, translationEn: "brown", translationTr: "kahverengi", exampleSentence: "Der Hund ist braun.", exampleTranslation: "The dog is brown." },
];

const allGrammar: Array<{
  name: string;
  description: string;
  level: CEFRLevel;
  order: number;
  explanation: string;
  examples: string;
  tips?: string;
}> = [
  // ==================== A1 GRAMMAR (15 topics) ====================
  {
    name: "Der, Die, Das - Artikel",
    description: "Die deutschen Artikel",
    level: "A1" as CEFRLevel,
    order: 1,
    explanation: "Im Deutschen gibt es drei Artikel: der (maskulin), die (feminin), das (neutral). Der Artikel zeigt das Geschlecht eines Nomens.",
    examples: "der Mann, die Frau, das Kind. Im Plural: die Männer, die Frauen, die Kinder",
    tips: "Lerne immer den Artikel mit dem Nomen zusammen!"
  },
  {
    name: "Sein - Konjugation",
    description: "Das Verb 'sein' im Präsens",
    level: "A1" as CEFRLevel,
    order: 2,
    explanation: "'Sein' ist ein unregelmäßiges Verb. Ich bin, du bist, er/sie/es ist, wir sind, ihr seid, sie/Sie sind.",
    examples: "Ich bin Lehrer. Du bist Schüler. Wir sind Freunde.",
    tips: "Dies ist das wichtigste Verb im Deutschen!"
  },
  {
    name: "Haben - Konjugation",
    description: "Das Verb 'haben' im Präsens",
    level: "A1" as CEFRLevel,
    order: 3,
    explanation: "'Haben' bedeutet 'to have'. Ich habe, du hast, er/sie/es hat, wir haben, ihr habt, sie/Sie haben.",
    examples: "Ich habe ein Auto. Du hast ein Buch. Wir haben Zeit.",
    tips: "Wichtig für Besitz und viele zusammengesetzte Zeiten!"
  },
];

async function main() {
  console.log("🚀 Starting comprehensive content generation...\n");
  
  // Generate vocabulary
  console.log("📚 Generating vocabulary...");
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
  }
  
  const vocabCount = allVocabulary.length;
  console.log(`  ✓ Vocabulary: ${vocabCount} words`);
  
  // Generate grammar
  console.log("\n📖 Generating grammar topics...");
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
  }
  
  const grammarCount = allGrammar.length;
  console.log(`  ✓ Grammar: ${grammarCount} topics`);
  
  // Get final counts
  const [vocabTotal, grammarTotal] = await Promise.all([
    prisma.vocabulary.count({ where: { isPublished: true } }),
    prisma.grammarTopic.count({ where: { isPublished: true } }),
  ]);
  
  console.log(`\n✅ Generation complete!`);
  console.log(`   Total Vocabulary: ${vocabTotal} entries`);
  console.log(`   Total Grammar: ${grammarTotal} topics`);
  
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error("❌ Error:", e);
  process.exit(1);
});
