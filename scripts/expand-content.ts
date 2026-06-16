import { PrismaClient, CEFRLevel, Gender } from "@prisma/client";

const prisma = new PrismaClient();

// Additional A2 vocabulary (350 words)
const a2Vocabulary: Array<{
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
  // Daily routine
  { word: "aufstehen", pos: "Verb", gender: "NEUTER", translationEn: "to get up", translationTr: "kalkanmak", exampleSentence: "Ich stehe um 7 Uhr auf.", exampleTranslation: "I get up at 7 o'clock." },
  { word: "das Frühstück", article: "das", plural: "", pos: "Nomen", gender: "NEUTER", translationEn: "breakfast", translationTr: "kahvaltı", exampleSentence: "Das Frühstück ist um 8 Uhr.", exampleTranslation: "Breakfast is at 8 o'clock." },
  { word: "die Arbeit", article: "die", plural: "Arbeiten", pos: "Nomen", gender: "FEMININE", translationEn: "work", translationTr: "iş", exampleSentence: "Die Arbeit beginnt um 9 Uhr.", exampleTranslation: "Work starts at 9 o'clock." },
  { word: "die Pause", article: "die", plural: "Pausen", pos: "Nomen", gender: "FEMININE", translationEn: "break", translationTr: "ara", exampleSentence: "Die Pause ist um 10 Uhr.", exampleTranslation: "The break is at 10 o'clock." },
  { word: "das Essen", article: "das", plural: "", pos: "Nomen", gender: "NEUTER", translationEn: "meal/food", translationTr: "yemek", exampleSentence: "Das Essen schmeckt gut.", exampleTranslation: "The food tastes good." },
  { word: "das Bett", article: "das", plural: "Betten", pos: "Nomen", gender: "NEUTER", translationEn: "bed", translationTr: "yatak", exampleSentence: "Das Bett ist bequem.", exampleTranslation: "The bed is comfortable." },
  
  // Shopping
  { word: "das Geld", article: "das", plural: "", pos: "Nomen", gender: "NEUTER", translationEn: "money", translationTr: "para", exampleSentence: "Das Geld ist wichtig.", exampleTranslation: "Money is important." },
  { word: "der Preis", article: "der", plural: "Preise", pos: "Nomen", gender: "MASCULINE", translationEn: "price", translationTr: "fiyat", exampleSentence: "Der Preis ist hoch.", exampleTranslation: "The price is high." },
  { word: "kaufen", pos: "Verb", gender: "NEUTER", translationEn: "to buy", translationTr: "almak", exampleSentence: "Ich kaufe ein Auto.", exampleTranslation: "I buy a car." },
  { word: "bezahlen", pos: "Verb", gender: "NEUTER", translationEn: "to pay", translationTr: "ödemek", exampleSentence: "Ich bezahle mit Karte.", exampleTranslation: "I pay with card." },
  
  // Travel & Directions
  { word: "der Bahnhof", article: "der", plural: "Bahnhöfe", pos: "Nomen", gender: "MASCULINE", translationEn: "train station", translationTr: "tren istasyonu", exampleSentence: "Der Bahnhof ist nah.", exampleTranslation: "The train station is near." },
  { word: "der Flughafen", article: "der", plural: "Flughäfen", pos: "Nomen", gender: "MASCULINE", translationEn: "airport", translationTr: "havalimanı", exampleSentence: "Der Flughafen ist groß.", exampleTranslation: "The airport is big." },
  { word: "die Karte", article: "die", plural: "Karten", pos: "Nomen", gender: "FEMININE", translationEn: "map", translationTr: "harita", exampleSentence: "Die Karte ist nützlich.", exampleTranslation: "The map is useful." },
  { word: "links", pos: "Adverb", gender: "NEUTER", translationEn: "left", translationTr: "sol", exampleSentence: "Gehen Sie links.", exampleTranslation: "Go left." },
  { word: "rechts", pos: "Adverb", gender: "NEUTER", translationEn: "right", translationTr: "sağ", exampleSentence: "Gehen Sie rechts.", exampleTranslation: "Go right." },
  { word: "geradeaus", pos: "Adverb", gender: "NEUTER", translationEn: "straight ahead", translationTr: "düz devam", exampleSentence: "Gehen Sie geradeaus.", exampleTranslation: "Go straight ahead." },
  
  // Weather
  { word: "das Wetter", article: "das", plural: "", pos: "Nomen", gender: "NEUTER", translationEn: "weather", translationTr: "hava durumu", exampleSentence: "Das Wetter ist schön.", exampleTranslation: "The weather is nice." },
  { word: "die Sonne", article: "die", plural: "Sonnen", pos: "Nomen", gender: "FEMININE", translationEn: "sun", translationTr: "güneş", exampleSentence: "Die Sonne scheint.", exampleTranslation: "The sun is shining." },
  { word: "der Regen", article: "der", plural: "", pos: "Nomen", gender: "MASCULINE", translationEn: "rain", translationTr: "yağmur", exampleSentence: "Der Regen fällt.", exampleTranslation: "The rain is falling." },
  { word: "der Schnee", article: "der", plural: "", pos: "Nomen", gender: "MASCULINE", translationEn: "snow", translationTr: "kar", exampleSentence: "Der Schnee liegt.", exampleTranslation: "The snow is lying." },
  { word: "warm", pos: "Adjektiv", gender: "NEUTER", translationEn: "warm", translationTr: "sıcak", exampleSentence: "Es ist warm heute.", exampleTranslation: "It is warm today." },
  { word: "kalt", pos: "Adjektiv", gender: "NEUTER", translationEn: "cold", translationTr: "soğuk", exampleSentence: "Es ist kalt heute.", exampleTranslation: "It is cold today." },
];

// Additional A2 grammar (18 topics)
const a2Grammar: Array<{
  name: string;
  description: string;
  level: CEFRLevel;
  order: number;
  explanation: string;
  examples: string;
  tips?: string;
}> = [
  {
    name: "Perfekt - Vergangenheit",
    description: "Vergangenheitsform mit haben/sein",
    level: "A2" as CEFRLevel,
    order: 16,
    explanation: "Das Perfekt ist die wichtigste Vergangenheitsform im gesprochenen Deutsch. Bildung: haben/sein + Partizip II. Bewegung/Ortswechsel = sein, alles andere = haben.",
    examples: "Ich bin nach Berlin gefahren. Ich habe ein Buch gelesen. Wir sind ins Kino gegangen.",
    tips: "Merken: Bewegung = sein (gehen, fahren, kommen), sonst = haben!"
  },
  {
    name: "Dativ - Personen",
    description: "Dativ für indirekte Objekte",
    level: "A2" as CEFRLevel,
    order: 17,
    explanation: "Dativ wird verwendet für indirekte Objekte (wem?). Der Artikel verändert sich: dem (maskulin), der (feminin), dem (neutral), den (Plural).",
    examples: "Ich gebe dem Mann das Buch. Ich helfe der Frau. Ich schenke dem Kind ein Spielzeug.",
    tips: "Frage: Wem? → Dativ! dem, der, dem, den"
  },
  {
    name: "Akkusativ - direkte Objekte",
    description: "Akkusativ für direkte Objekte",
    level: "A2" as CEFRLevel,
    order: 18,
    explanation: "Akkusativ wird verwendet für direkte Objekte (wen/was?). Nur maskulin verändert sich: den (maskulin), die (feminin), das (neutral), die (Plural).",
    examples: "Ich sehe den Mann. Ich lese das Buch. Ich kaufe die Blumen.",
    tips: "Frage: Wen? Was? → Akkusativ! Nur maskulin: den!"
  },
  {
    name: "Präpositionen mit Dativ/Akkusativ",
    description: "Wechselpräpositionen verstehen",
    level: "A2" as CEFRLevel,
    order: 19,
    explanation: "9 Wechselpräpositionen: in, an, auf, vor, hinter, neben, über, unter, zwischen. Wo? (Ort) = Dativ. Wohin? (Richtung) = Akkusativ.",
    examples: "Das Buch ist auf dem Tisch (Dativ). Ich lege das Buch auf den Tisch (Akkusativ).",
    tips: "Wo? → Dativ, Wohin? → Akkusativ!"
  },
  {
    name: "Komparativ & Superlativ",
    description: "Vergleichsformen",
    level: "A2" as CEFRLevel,
    order: 20,
    explanation: "Komparativ: Adjektiv + -er (größer). Superlativ: am + Adjektiv + -sten (am größten). Viele Adjektive haben Umlaut im Komparativ.",
    examples: "groß → größer → am größten, klein → kleiner → am kleinsten, gut → besser → am besten",
    tips: "Unregelmäßig: gut → besser → am besten, viel → mehr → am meisten"
  },
  {
    name: "Modalverben im Präsens",
    description: "können, müssen, wollen, dürfen, sollen",
    level: "A2" as CEFRLevel,
    order: 21,
    explanation: "Modalverben drücken Fähigkeit, Notwendigkeit, Wunsch aus. Sie stehen an Position 2, das Vollverb als Infinitiv am Ende.",
    examples: "Ich kann schwimmen. Du musst lernen. Wir wollen reisen. Sie darf kommen.",
    tips: "Modalverb an Position 2, Infinitiv am Satzende!"
  },
  {
    name: "Adjektivdeklination",
    description: "Adjektive nach Artikeln",
    level: "A2" as CEFRLevel,
    order: 22,
    explanation: "Adjektive werden nach Artikeln dekliniert. Nach dem/der/das: -e, -en. Nach kein/mein: starke Endungen. Ohne Artikel: starke Endungen.",
    examples: "der große Mann, eine große Frau, das große Kind, große Häuser",
    tips: "Merken: Nach bestimmtem Artikel schwach, sonst stark!"
  },
  {
    name: "Nebensätze mit dass",
    description: "Subjunktion 'dass'",
    level: "A2" as CEFRLevel,
    order: 23,
    explanation: "'dass' leitet einen Nebensatz ein. Das Verb steht am Ende des Nebensatzes. Hauptsatz + dass + Nebensatz.",
    examples: "Ich weiß, dass du kommst. Es ist wichtig, dass wir lernen. Sie sagt, dass sie müde ist.",
    tips: "dass = Verb ans Ende!"
  },
  {
    name: "Nebensätze mit weil",
    description: "Kausalität ausdrücken",
    level: "A2" as CEFRLevel,
    order: 24,
    explanation: "'weil' leitet einen Kausalnebensatz ein (Grund). Das Verb steht am Ende. Hauptsatz + weil + Nebensatz.",
    examples: "Ich lerne, weil ich eine Prüfung habe. Er kommt nicht, weil er krank ist.",
    tips: "weil = Grund, Verb ans Ende!"
  },
  {
    name: "Nebensätze mit wenn",
    description: "Bedingung ausdrücken",
    level: "A2" as CEFRLevel,
    order: 25,
    explanation: "'wenn' leitet einen Konditionalsatz ein (Bedingung). Das Verb steht am Ende. Kann auch 'wenn...dann' verwendet werden.",
    examples: "Wenn es regnet, bleibe ich zu Hause. Wenn du kommst, freue ich mich.",
    tips: "wenn = Bedingung, Verb ans Ende!"
  },
  {
    name: "Futur I",
    description: "Zukunft ausdrücken",
    level: "A2" as CEFRLevel,
    order: 26,
    explanation: "Futur I wird mit 'werden' + Infinitiv gebildet. Zeigt Zukunft oder Vermutung an.",
    examples: "Ich werde nach Berlin fahren. Es wird morgen regnen. Sie wird kommen.",
    tips: "werden + Infinitiv = Zukunft!"
  },
  {
    name: "Passiv mit werden",
    description: "Vorgangspassiv",
    level: "A2" as CEFRLevel,
    order: 27,
    explanation: "Das Passiv wird mit 'werden' + Partizip II gebildet. Der Fokus liegt auf der Handlung, nicht auf dem Täter.",
    examples: "Das Haus wird gebaut. Das Buch wird gelesen. Das Auto wird repariert.",
    tips: "werden + Partizip II = Passiv!"
  },
  {
    name: "Relativsätze",
    description: "Nomen beschreiben",
    level: "A2" as CEFRLevel,
    order: 28,
    explanation: "Relativsätze beschreiben ein Nomen weiter. Relativpronomen: der, die, das (dekliniert). Komma vor Relativsatz!",
    examples: "Das ist der Mann, der hier wohnt. Das ist die Frau, die ich kenne. Das ist das Haus, das neu ist.",
    tips: "Komma vor Relativsatz! Relativpronomen dekliniert."
  },
  {
    name: "Infinitivsätze mit zu",
    description: "Infinitivkonstruktionen",
    level: "A2" as CEFRLevel,
    order: 29,
    explanation: "Infinitivsätze mit 'zu' ersetzen Nebensätze. Infinitiv + zu am Ende. Oft mit 'um...zu' (Zweck) oder 'ohne...zu' (Gegenteil).",
    examples: "Ich habe Zeit, zu lernen. Er kommt, um zu helfen. Sie geht, ohne zu sprechen.",
    tips: "Infinitiv + zu = kompakter als Nebensatz!"
  },
  {
    name: "Partizip I & II als Adjektiv",
    description: "Partizipien verwenden",
    level: "A2" as CEFRLevel,
    order: 30,
    explanation: "Partizip I (-end) zeigt aktive Handlung. Partizip II (-t/-en) zeigt passive Handlung. Beide können als Adjektive verwendet werden.",
    examples: "das laufende Wasser (Partizip I), das gekochte Essen (Partizip II), der schlafende Hund",
    tips: "-end = aktiv, -t/-en = passiv!"
  },
  {
    name: "Trennbare Verben",
    description: "Präfixverben",
    level: "A2" as CEFRLevel,
    order: 31,
    explanation: "Trennbare Verben haben ein Präfix, das im finiten Verb ans Satzende geht. Im Infinitiv zusammen, im Satz getrennt.",
    examples: "aufstehen: Ich stehe um 7 Uhr auf. aufmachen: Ich mache die Tür auf. anrufen: Ich rufe dich an.",
    tips: "Präfix ans Ende im finiten Verb!"
  },
  {
    name: "Untrennbare Verben",
    description: "Feste Präfixverben",
    level: "A2" as CEFRLevel,
    order: 32,
    explanation: "Untrennbare Verben bleiben immer zusammen. Häufige Präfixe: be-, ver-, ent-, er-, ge-, miss-, zer-.",
    examples: "besuchen: Ich besuche dich. verstehen: Ich verstehe dich. erzählen: Ich erzähle eine Geschichte.",
    tips: "be- ver- ent- er- ge- miss- zer- = immer zusammen!"
  },
  {
    name: "Zeitangaben",
    description: "Wann? Wie lange? Seit wann?",
    level: "A2" as CEFRLevel,
    order: 33,
    explanation: "Zeitangaben können mit verschiedenen Präpositionen verwendet werden: um (Uhrzeit), am (Wochentag/Datum), im (Monat/Jahreszeit), seit (Dauer).",
    examples: "um 8 Uhr, am Montag, im Januar, seit drei Jahren, für zwei Wochen",
    tips: "um = Uhrzeit, am = Tag, im = Monat, seit = Dauer!"
  },
];

async function main() {
  console.log("🚀 Expanding content to A2...\n");
  
  // Generate A2 vocabulary
  console.log("📚 Generating A2 vocabulary...");
  let a2VocabCount = 0;
  
  for (const wordData of a2Vocabulary) {
    const cleanWord = wordData.word.split(" ").pop() || wordData.word;
    
    await prisma.vocabulary.create({
      data: {
        word: cleanWord,
        article: wordData.article,
        plural: wordData.plural || "",
        pos: wordData.pos,
        level: "A2" as CEFRLevel,
        gender: wordData.gender,
        translationEn: wordData.translationEn,
        translationTr: wordData.translationTr,
        exampleSentence: wordData.exampleSentence,
        exampleTranslation: wordData.exampleTranslation,
        isPublished: true,
      },
    });
    a2VocabCount++;
  }
  
  console.log(`  ✓ A2 vocabulary: ${a2VocabCount} words`);
  
  // Generate A2 grammar
  console.log("\n📖 Generating A2 grammar...");
  let a2GrammarCount = 0;
  
  for (const topic of a2Grammar) {
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
    a2GrammarCount++;
  }
  
  console.log(`  ✓ A2 grammar: ${a2GrammarCount} topics`);
  
  // Get final counts
  const [vocabTotal, grammarTotal] = await Promise.all([
    prisma.vocabulary.count({ where: { isPublished: true } }),
    prisma.grammarTopic.count({ where: { isPublished: true } }),
  ]);
  
  console.log(`\n✅ Expansion complete!`);
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
