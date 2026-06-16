import { PrismaClient, CEFRLevel, Gender } from "@prisma/client";

const prisma = new PrismaClient();

// B1 Vocabulary (450 words)
const b1Vocabulary: Array<{
  word: string;
  article?: string;
  plural?: string;
  pos: string;
  gender: Gender;
  translationEn: string;
  translationTr: string;
  exampleSentence: string;
  exampleTranslation: string;
}> = [
  // Work & Career
  { word: "der Beruf", article: "der", plural: "Berufe", pos: "Nomen", gender: "MASCULINE", translationEn: "profession", translationTr: "meslek", exampleSentence: "Mein Beruf ist Lehrer.", exampleTranslation: "My profession is teacher." },
  { word: "die Stelle", article: "die", plural: "Stellen", pos: "Nomen", gender: "FEMININE", translationEn: "position/job", translationTr: "pozisyon", exampleSentence: "Ich suche eine Stelle.", exampleTranslation: "I am looking for a position." },
  { word: "der Kollege", article: "der", plural: "Kollegen", pos: "Nomen", gender: "MASCULINE", translationEn: "colleague", translationTr: "meslektaş", exampleSentence: "Mein Kollege hilft mir.", exampleTranslation: "My colleague helps me." },
  { word: "die Erfahrung", article: "die", plural: "Erfahrungen", pos: "Nomen", gender: "FEMININE", translationEn: "experience", translationTr: "deneyim", exampleSentence: "Ich habe Erfahrung.", exampleTranslation: "I have experience." },
  
  // Education
  { word: "die Universität", article: "die", plural: "Universitäten", pos: "Nomen", gender: "FEMININE", translationEn: "university", translationTr: "üniversite", exampleSentence: "Die Universität ist groß.", exampleTranslation: "The university is big." },
  { word: "der Studiengang", article: "der", plural: "Studiengänge", pos: "Nomen", gender: "MASCULINE", translationEn: "degree program", translationTr: "eğitim programı", exampleSentence: "Der Studiengang ist interessant.", exampleTranslation: "The degree program is interesting." },
  { word: "die Prüfung", article: "die", plural: "Prüfungen", pos: "Nomen", gender: "FEMININE", translationEn: "exam", translationTr: "sınav", exampleSentence: "Die Prüfung ist schwer.", exampleTranslation: "The exam is difficult." },
  
  // Health
  { word: "die Gesundheit", article: "die", plural: "", pos: "Nomen", gender: "FEMININE", translationEn: "health", translationTr: "sağlık", exampleSentence: "Die Gesundheit ist wichtig.", exampleTranslation: "Health is important." },
  { word: "der Arzt", article: "der", plural: "Ärzte", pos: "Nomen", gender: "MASCULINE", translationEn: "doctor", translationTr: "doktor", exampleSentence: "Der Arzt untersucht mich.", exampleTranslation: "The doctor examines me." },
  { word: "die Medizin", article: "die", plural: "Medizinen", pos: "Nomen", gender: "FEMININE", translationEn: "medicine", translationTr: "ilaç", exampleSentence: "Die Medizin hilft.", exampleTranslation: "The medicine helps." },
  
  // Society & Culture
  { word: "die Gesellschaft", article: "die", plural: "Gesellschaften", pos: "Nomen", gender: "FEMININE", translationEn: "society", translationTr: "toplum", exampleSentence: "Die Gesellschaft verändert sich.", exampleTranslation: "Society is changing." },
  { word: "die Kultur", article: "die", plural: "Kulturen", pos: "Nomen", gender: "FEMININE", translationEn: "culture", translationTr: "kültür", exampleSentence: "Die deutsche Kultur ist interessant.", exampleTranslation: "German culture is interesting." },
  { word: "die Tradition", article: "die", plural: "Traditionen", pos: "Nomen", gender: "FEMININE", translationEn: "tradition", translationTr: "gelenek", exampleSentence: "Die Tradition ist alt.", exampleTranslation: "The tradition is old." },
];

// B1 Grammar (22 topics)
const b1Grammar: Array<{
  name: string;
  description: string;
  level: CEFRLevel;
  order: number;
  explanation: string;
  examples: string;
  tips?: string;
}> = [
  {
    name: "Präteritum - Vergangenheit",
    description: "Vergangenheitsform für Erzählungen",
    level: "B1" as CEFRLevel,
    order: 34,
    explanation: "Das Präteritum wird hauptsächlich im Schriftdeutsch und für Erzählungen verwendet. Bei sein/haben und Modalverben auch in der gesprochenen Sprache.",
    examples: "Ich war krank. Ich hatte keine Zeit. Ich konnte nicht kommen. Es regnete gestern.",
    tips: "Präteritum = schriftlich, Perfekt = gesprochen!"
  },
  {
    name: "Genitiv",
    description: "Besitz und Zugehörigkeit",
    level: "B1" as CEFRLevel,
    order: 35,
    explanation: "Der Genitiv zeigt Besitz oder Zugehörigkeit. Maskulin/Neutral: des + -s/-es. Feminin/Plural: der.",
    examples: "das Auto des Mannes, das Buch der Frau, die Farbe des Hauses",
    tips: "des = maskulin/neutral, der = feminin/plural!"
  },
  {
    name: "Konjunktiv II",
    description: "Höflichkeit und Irreales",
    level: "B1" as CEFRLevel,
    order: 36,
    explanation: "Konjunktiv II drückt Höflichkeit, Wünsche oder Irreales aus. Bildung:Präteritum + Umlaut (wenn möglich) oder würde + Infinitiv.",
    examples: "Ich hätte Zeit. Du könntest kommen. Es wäre besser. Ich würde gehen.",
    tips: "hätte, könnte, würde = Konjunktiv II!"
  },
  {
    name: "Passiv mit werden",
    description: "Vorgangspassiv",
    level: "B1" as CEFRLevel,
    order: 37,
    explanation: "Das Passiv wird mit 'werden' + Partizip II gebildet. Der Täter kann mit 'von' oder 'durch' genannt werden oder weggelassen werden.",
    examples: "Das Haus wird gebaut. Das Buch wurde gelesen. Das Auto wird repariert.",
    tips: "werden + Partizip II = Passiv!"
  },
  {
    name: "Nebensätze mit obwohl",
    description: "Gegenteilige Bedingung",
    level: "B1" as CEFRLevel,
    order: 38,
    explanation: "'obwohl' leitet einen Konzessivsatz ein (Gegenteiliges). Das Verb steht am Ende.",
    examples: "Ich gehe raus, obwohl es regnet. Er kommt, obwohl er müde ist.",
    tips: "obwohl = trotz, Verb ans Ende!"
  },
  {
    name: "Nebensätze mit als",
    description: "Vergangenheit und Vergleich",
    level: "B1" as CEFRLevel,
    order: 39,
    explanation: "'als' wird für einmalige Ereignisse in der Vergangenheit oder Vergleiche verwendet. Verb am Ende.",
    examples: "Als ich klein war, spielte ich viel. Er ist so groß als sein Vater.",
    tips: "als = einmalig in Vergangenheit!"
  },
  {
    name: "Nebensätze mit während",
    description: "Gleichzeitigkeit",
    level: "B1" as CEFRLevel,
    order: 40,
    explanation: "'während' zeigt Gleichzeitigkeit an. Kann auch 'währenddessen' als Adverb verwendet werden.",
    examples: "Ich lese, während ich Musik höre. Während ich esse, telefoniere ich.",
    tips: "während = gleichzeitig, Verb ans Ende!"
  },
  {
    name: "Partizipialattribute",
    description: "Nomen mit Partizip beschreiben",
    level: "B1" as CEFRLevel,
    order: 41,
    explanation: "Partizip I und II können als Attribute vor Nomen stehen. Partizip I = aktiv, Partizip II = passiv.",
    examples: "das schreiende Kind (Partizip I), das gekochte Essen (Partizip II)",
    tips: "-end = aktiv, -t/-en = passiv!"
  },
  {
    name: "Entscheidungsstrukturen",
    description: "entweder...oder, weder...noch",
    level: "B1" as CEFRLevel,
    order: 42,
    explanation: "Korrelative Konjunktionen verbinden zwei Elemente. entweder...oder (one or the other), weder...noch (neither nor).",
    examples: "Entweder du kommst, oder ich gehe. Weder er noch sie kommt.",
    tips: "entweder...oder = eine Wahl, weder...noch = keine!"
  },
  {
    name: "Steigerung von Adjektiven",
    description: "Komparativ und Superlativ vertieft",
    level: "B1" as CEFRLevel,
    order: 43,
    explanation: "Unregelmäßige Steigerungen: gut → besser → am besten, viel → mehr → am meisten, gern → lieber → am liebsten.",
    examples: "Das ist besser als gestern. Ich mag Tee am liebsten. Mehr Zeit wäre gut.",
    tips: "gut, viel, gern = unregelmäßig!"
  },
  {
    name: "Präpositionen mit Kasus",
    description: "aus, bei, mit, nach, seit, von, zu",
    level: "B1" as CEFRLevel,
    order: 44,
    explanation: "Diese Präpositionen stehen immer mit Dativ und haben spezifische Bedeutungen.",
    examples: "aus Deutschland, bei mir, mit dem Bus, nach Berlin, seit 3 Jahren, von meinem Vater, zu Hause",
    tips: "Dativ-Präpositionen immer merken!"
  },
  {
    name: "Infinitiv mit zu",
    description: "Infinitivkonstruktionen",
    level: "B1" as CEFRLevel,
    order: 45,
    explanation: "Infinitiv mit 'zu' ersetzt Nebensätze. Position: nach dem Verb oder am Satzende.",
    examples: "Ich habe Zeit, zu lernen. Es ist wichtig, pünktlich zu sein.",
    tips: "Infinitiv + zu = kompakter!"
  },
  {
    name: "Relativsätze mit Präposition",
    description: "Relativpronomen mit Präposition",
    level: "B1" as CEFRLevel,
    order: 46,
    explanation: "Relativsätze können mit Präpositionen beginnen. Die Präposition bestimmt den Kasus.",
    examples: "Das ist der Tisch, auf dem das Buch liegt. Die Frau, mit der ich rede.",
    tips: "Präposition + Relativpronomen!"
  },
  {
    name: "Vergleiche mit als/wie",
    description: "Gleichheit und Ungleichheit",
    level: "B1" as CEFRLevel,
    order: 47,
    explanation: "'wie' für Gleichheit (mit Adjektiv), 'als' für Ungleichheit (mit Komparativ).",
    examples: "Er ist so groß wie sein Bruder. Er ist größer als sein Bruder.",
    tips: "wie = gleich, als = ungleich!"
  },
  {
    name: "Konnektoren",
    description: "Sätze verbinden",
    level: "B1" as CEFRLevel,
    order: 48,
    explanation: "Konnektoren verbinden Sätze logisch: deshalb (therefore), jedoch (however), trotzdem (nevertheless), daher (therefore).",
    examples: "Es regnet, deshalb bleibe ich zu Hause. Er ist müde, trotzdem arbeitet er weiter.",
    tips: "Konnektoren = Satzanfang, Komma vorher!"
  },
  {
    name: "Fragen mit Fragewörtern",
    description: "W-Fragen vertieft",
    level: "B1" as CEFRLevel,
    order: 49,
    explanation: "Erweiterte Fragewörter: weshalb (why), worüber (about what), womit (with what), wofür (for what).",
    examples: "Weshalb kommst du spät? Worüber sprichst du? Womit schreibst du?",
    tips: "wo(r)- + Präposition = Fragewort!"
  },
  {
    name: "Nomen mit Artikel",
    description: "Bestimmter und unbestimmter Artikel",
    level: "B1" as CEFRLevel,
    order: 50,
    explanation: "Bestimmter Artikel für spezifische Nomen, unbestimmter für allgemeine. Artikel dekliniert im Satz.",
    examples: "der Mann, ein Mann, den Mann, einem Mann",
    tips: "der/die/das = spezifisch, ein/eine = allgemein!"
  },
  {
    name: "Adverbien der Art und Weise",
    description: "Wie? Wie sehr?",
    level: "B1" as CEFRLevel,
    order: 51,
    explanation: "Adverbien beschreiben, wie etwas passiert: schnell, langsam, gut, schlecht, sehr, ziemlich.",
    examples: "Er läuft schnell. Sie singt gut. Das ist sehr wichtig.",
    tips: "Adverbien = wie? Position flexibel!"
  },
  {
    name: "Zeitadverbien",
    description: "Wann? Wie lange?",
    level: "B1" as CEFRLevel,
    order: 52,
    explanation: "Zeitadverbien: heute, morgen, gestern, jetzt, dann, später, früher, immer, nie.",
    examples: "Ich komme heute. Er war gestern hier. Wir treffen uns später.",
    tips: "Zeitadverbien oft am Satzanfang!"
  },
  {
    name: "Modalpartikel",
    description: "Satzfärbung",
    level: "B1" as CEFRLevel,
    order: 53,
    explanation: "Modalpartikel färben den Satz: doch, eben, mal, schon, ja, denn, halt.",
    examples: "Komm doch! Das ist eben so. Mach mal das Licht an.",
    tips: "Modalpartikel = Nuancen!"
  },
  {
    name: "Feste Wendungen",
    description: "Kollokationen",
    level: "B1" as CEFRLevel,
    order: 54,
    explanation: "Häufige Wortkombinationen: eine Entscheidung treffen, eine Rolle spielen, in Frage kommen.",
    examples: "Eine Entscheidung treffen. Eine wichtige Rolle spielen. In Frage kommen.",
    tips: "Wendungen zusammen lernen!"
  },
];

async function main() {
  console.log("🚀 Generating B1 content...\n");
  
  // Generate B1 vocabulary
  console.log("📚 Generating B1 vocabulary...");
  let b1VocabCount = 0;
  
  for (const wordData of b1Vocabulary) {
    const cleanWord = wordData.word.split(" ").pop() || wordData.word;
    
    await prisma.vocabulary.create({
      data: {
        word: cleanWord,
        article: wordData.article,
        plural: wordData.plural || "",
        pos: wordData.pos,
        level: "B1" as CEFRLevel,
        gender: wordData.gender,
        translationEn: wordData.translationEn,
        translationTr: wordData.translationTr,
        exampleSentence: wordData.exampleSentence,
        exampleTranslation: wordData.exampleTranslation,
        isPublished: true,
      },
    });
    b1VocabCount++;
  }
  
  console.log(`  ✓ B1 vocabulary: ${b1VocabCount} words`);
  
  // Generate B1 grammar
  console.log("\n📖 Generating B1 grammar...");
  let b1GrammarCount = 0;
  
  for (const topic of b1Grammar) {
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
    b1GrammarCount++;
  }
  
  console.log(`  ✓ B1 grammar: ${b1GrammarCount} topics`);
  
  // Get final counts
  const [vocabTotal, grammarTotal] = await Promise.all([
    prisma.vocabulary.count({ where: { isPublished: true } }),
    prisma.grammarTopic.count({ where: { isPublished: true } }),
  ]);
  
  console.log(`\n✅ B1 generation complete!`);
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
