import { PrismaClient, CEFRLevel, Gender } from "@prisma/client";

const prisma = new PrismaClient();

// B2 Vocabulary (550 words) - Professional & Academic German
const b2Vocabulary: Array<{
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
  // Business & Economics
  { word: "die Wirtschaft", article: "die", plural: "", pos: "Nomen", gender: "FEMININE", level: "B2" as CEFRLevel, translationEn: "economy", translationTr: "ekonomi", exampleSentence: "Die Wirtschaft wächst.", exampleTranslation: "The economy is growing." },
  { word: "der Markt", article: "der", plural: "Märkte", pos: "Nomen", gender: "MASCULINE", level: "B2" as CEFRLevel, translationEn: "market", translationTr: "pazar", exampleSentence: "Der Markt ist stabil.", exampleTranslation: "The market is stable." },
  { word: "die Investition", article: "die", plural: "Investitionen", pos: "Nomen", gender: "FEMININE", level: "B2" as CEFRLevel, translationEn: "investment", translationTr: "yatırım", exampleSentence: "Die Investition lohnt sich.", exampleTranslation: "The investment pays off." },
  { word: "die Bilanz", article: "die", plural: "Bilanzen", pos: "Nomen", gender: "FEMININE", level: "B2" as CEFRLevel, translationEn: "balance sheet", translationTr: "bilanço", exampleSentence: "Die Bilanz ist positiv.", exampleTranslation: "The balance sheet is positive." },
  { word: "die Steuer", article: "die", plural: "Steuern", pos: "Nomen", gender: "FEMININE", level: "B2" as CEFRLevel, translationEn: "tax", translationTr: "vergi", exampleSentence: "Die Steuern sind hoch.", exampleTranslation: "The taxes are high." },
  
  // Science & Technology
  { word: "die Forschung", article: "die", plural: "", pos: "Nomen", gender: "FEMININE", level: "B2" as CEFRLevel, translationEn: "research", translationTr: "araştırma", exampleSentence: "Die Forschung ist wichtig.", exampleTranslation: "Research is important." },
  { word: "die Technologie", article: "die", plural: "Technologien", pos: "Nomen", gender: "FEMININE", level: "B2" as CEFRLevel, translationEn: "technology", translationTr: "teknoloji", exampleSentence: "Die Technologie entwickelt sich.", exampleTranslation: "Technology is developing." },
  { word: "die Innovation", article: "die", plural: "Innovationen", pos: "Nomen", gender: "FEMININE", level: "B2" as CEFRLevel, translationEn: "innovation", translationTr: "yenilik", exampleSentence: "Die Innovation fördert Wachstum.", exampleTranslation: "Innovation promotes growth." },
  { word: "das Experiment", article: "das", plural: "Experimente", pos: "Nomen", gender: "NEUTER", level: "B2" as CEFRLevel, translationEn: "experiment", translationTr: "deney", exampleSentence: "Das Experiment gelingt.", exampleTranslation: "The experiment succeeds." },
  
  // Law & Politics
  { word: "das Gesetz", article: "das", plural: "Gesetze", pos: "Nomen", gender: "NEUTER", level: "B2" as CEFRLevel, translationEn: "law", translationTr: "kanun", exampleSentence: "Das Gesetz wird geändert.", exampleTranslation: "The law is being changed." },
  { word: "die Demokratie", article: "die", plural: "Demokratien", pos: "Nomen", gender: "FEMININE", level: "B2" as CEFRLevel, translationEn: "democracy", translationTr: "demokrasi", exampleSentence: "Die Demokratie funktioniert.", exampleTranslation: "Democracy works." },
  { word: "die Wahl", article: "die", plural: "Wahlen", pos: "Nomen", gender: "FEMININE", level: "B2" as CEFRLevel, translationEn: "election", translationTr: "seçim", exampleSentence: "Die Wahl ist fair.", exampleTranslation: "The election is fair." },
  { word: "die Regierung", article: "die", plural: "Regierungen", pos: "Nomen", gender: "FEMININE", level: "B2" as CEFRLevel, translationEn: "government", translationTr: "hükümet", exampleSentence: "Die Regierung beschließt.", exampleTranslation: "The government decides." },
  
  // Environment
  { word: "die Umwelt", article: "die", plural: "", pos: "Nomen", gender: "FEMININE", level: "B2" as CEFRLevel, translationEn: "environment", translationTr: "çevre", exampleSentence: "Die Umwelt muss geschützt werden.", exampleTranslation: "The environment must be protected." },
  { word: "die Energie", article: "die", plural: "Energien", pos: "Nomen", gender: "FEMININE", level: "B2" as CEFRLevel, translationEn: "energy", translationTr: "enerji", exampleSentence: "Die Energie wird verbraucht.", exampleTranslation: "Energy is being consumed." },
  { word: "der Klimawandel", article: "der", plural: "", pos: "Nomen", gender: "MASCULINE", level: "B2" as CEFRLevel, translationEn: "climate change", translationTr: "iklim değişikliği", exampleSentence: "Der Klimawandel ist real.", exampleTranslation: "Climate change is real." },
  
  // Abstract Concepts
  { word: "die Meinung", article: "die", plural: "Meinungen", pos: "Nomen", gender: "FEMININE", level: "B2" as CEFRLevel, translationEn: "opinion", translationTr: "görüş", exampleSentence: "Die Meinung zählt.", exampleTranslation: "The opinion counts." },
  { word: "die Erfahrung", article: "die", plural: "Erfahrungen", pos: "Nomen", gender: "FEMININE", level: "B2" as CEFRLevel, translationEn: "experience", translationTr: "deneyim", exampleSentence: "Die Erfahrung lehrt.", exampleTranslation: "Experience teaches." },
  { word: "die Verantwortung", article: "die", plural: "", pos: "Nomen", gender: "FEMININE", level: "B2" as CEFRLevel, translationEn: "responsibility", translationTr: "sorumluluk", exampleSentence: "Die Verantwortung liegt bei dir.", exampleTranslation: "The responsibility lies with you." },
];

// B2 Grammar (22 topics)
const b2Grammar: Array<{
  name: string;
  description: string;
  level: CEFRLevel;
  order: number;
  explanation: string;
  examples: string;
  tips?: string;
}> = [
  {
    name: "Konjunktiv I - Indirekte Rede",
    description: "Berichtende Rede",
    level: "B2" as CEFRLevel,
    order: 55,
    explanation: "Konjunktiv I wird für indirekte Rede verwendet. Bildung: Infinitivstamm + Endungen (-e, -est, -e, -en, -et, -en).",
    examples: "Er sagt, er komme. Sie sagt, sie sei krank. Man sagt, es regne.",
    tips: "Konjunktiv I = indirekte Rede, besonders in Nachrichten!"
  },
  {
    name: "Zustandspassiv",
    description: "sein + Partizip II",
    level: "B2" as CEFRLevel,
    order: 56,
    explanation: "Zustandspassiv beschreibt einen Zustand (sein + Partizip II). Vorgangspassiv beschreibt eine Handlung (werden + Partizip II).",
    examples: "Die Tür ist geschlossen (Zustand). Die Tür wird geschlossen (Vorgang).",
    tips: "sein + Partizip II = Zustand, werden + Partizip II = Vorgang!"
  },
  {
    name: "Nominalstil",
    description: "Nomen statt Verben",
    level: "B2" as CEFRLevel,
    order: 57,
    explanation: "Im formellen Deutsch werden oft Nomen statt Verben verwendet (Nominalstil). Dies klingt formeller und kompakter.",
    examples: "Die Durchführung der Studie (statt: Man führt die Studie durch). Die Verbesserung der Qualität.",
    tips: "Nominalstil = formeller, besonders in Behörden und Wissenschaft!"
  },
  {
    name: "Partizipialattribute",
    description: "Erweiterte Partizipien",
    level: "B2" as CEFRLevel,
    order: 58,
    explanation: "Partizipialattribute können erweitert werden und stehen vor dem Nomen. Sie ersetzen Relativsätze.",
    examples: "Der auf dem Tisch liegende Buch (statt: Das Buch, das auf dem Tisch liegt).",
    tips: "Partizipialattribute = kompakter als Relativsätze!"
  },
  {
    name: "Infinitivsätze mit um...zu",
    description: "Zweckausdrücke",
    level: "B2" as CEFRLevel,
    order: 59,
    explanation: "'um...zu' drückt Zweck aus. Subjekt muss im Haupt- und Nebensatz gleich sein.",
    examples: "Ich lerne, um die Prüfung zu bestehen. Er arbeitet, um Geld zu verdienen.",
    tips: "um...zu = Zweck, Subjekt muss gleich sein!"
  },
  {
    name: "Infinitivsätze mit ohne...zu",
    description: "Gegenteilige Handlung",
    level: "B2" as CEFRLevel,
    order: 60,
    explanation: "'ohne...zu' zeigt an, dass etwas nicht passiert. Ohne + Akkusativ (mit Nomen) oder ohne + zu (mit Infinitiv).",
    examples: "Er geht ohne dich. Sie verlässt das Haus ohne sich umzudrehen.",
    tips: "ohne...zu = etwas nicht tun!"
  },
  {
    name: "Konditionalsätze",
    description: "wenn/wennfalls/falls",
    level: "B2" as CEFRLevel,
    order: 61,
    explanation: "Konditionalsätze drücken Bedingungen aus. 'wenn' (wenn), 'falls' (falls), 'sobald' (sobald).",
    examples: "Wenn es regnet, bleibe ich zu Hause. Falls du kommst, ruf an.",
    tips: "wenn = Bedingung, falls = unsichere Bedingung!"
  },
  {
    name: "Konzessivsätze",
    description: "obwohl/trotzdem",
    level: "B2" as CEFRLevel,
    order: 62,
    explanation: "Konzessivsätze zeigen entgegenstehende Bedingungen an. 'obwohl' (obwohl), 'auch wenn' (auch wenn).",
    examples: "Obwohl es regnet, gehe ich raus. Auch wenn es schwer ist, probiere ich.",
    tips: "obwohl = trotz, Verb ans Ende!"
  },
  {
    name: "Kausalsätze",
    description: "weil/deshalb/weil",
    level: "B2" as CEFRLevel,
    order: 63,
    explanation: "Kausalsätze zeigen Ursachen an. 'weil' (weil), 'da' (da), 'deshalb' (deshalb).",
    examples: "Ich bleibe zu Hause, weil ich krank bin. Da du kommst, freue ich mich.",
    tips: "weil/da = Ursache, Verb ans Ende!"
  },
  {
    name: "Finalsätze",
    description: "damit/um...zu",
    level: "B2" as CEFRLevel,
    order: 64,
    explanation: "Finalsätze drücken Zweck aus. 'damit' (damit) mit eigenem Subjekt, 'um...zu' mit gleichem Subjekt.",
    examples: "Ich lerne, damit ich die Prüfung bestehe. Ich lerne, um die Prüfung zu bestehen.",
    tips: "damit = eigene Subjekt, um...zu = gleiches Subjekt!"
  },
  {
    name: "Adversativsätze",
    description: "aber/jedoch/allerdings",
    level: "B2" as CEFRLevel,
    order: 65,
    explanation: "Adversativsätze zeigen Gegensatz an. 'aber' (aber), 'jedoch' (jedoch), 'allerdings' (allerdings).",
    examples: "Er ist reich, aber unglücklich. Das ist teuer, jedoch notwendig.",
    tips: "aber = Gegensatz, jedoch = formeller!"
  },
  {
    name: "Kopulative Sätze",
    description: "und/ sowie/ sowohl...als auch",
    level: "B2" as CEFRLevel,
    order: 66,
    explanation: "Kopulative Sätze verbinden gleichrangige Elemente. 'und' (und), 'sowie' (sowie), 'sowohl...als auch' (sowohl...als auch).",
    examples: "Er mag Kaffee und Tee. Sowohl er als auch sie kommen.",
    tips: "und = Verbindung, sowohl...als auch = beide!"
  },
  {
    name: "Relativsätze mit Präposition",
    description: "Erweiterte Relativsätze",
    level: "B2" as CEFRLevel,
    order: 67,
    explanation: "Relativsätze können mit Präpositionen beginnen. Die Präposition bestimmt den Kasus des Relativpronomens.",
    examples: "Das ist der Tisch, auf dem ich arbeite. Die Frau, mit der ich rede.",
    tips: "Präposition + Relativpronomen = Kasus beachten!"
  },
  {
    name: "Fremdwörter und Lehnwörter",
    description: "Entlehnungen",
    level: "B2" as CEFRLevel,
    order: 68,
    explanation: "Das Deutsche hat viele Fremdwörter aus Latein, Griechisch, Französisch und Englisch übernommen.",
    examples: "der Computer (englisch), die Universität (lateinisch), das Restaurant (französisch)",
    tips: "Fremdwörter oft in formellem Deutsch!"
  },
  {
    name: "Wortbildung",
    description: "Komposita und Derivation",
    level: "B2" as CEFRLevel,
    order: 69,
    explanation: "Das Deutsche bildet viele Komposita (zusammengesetzte Wörter). Derivation schafft neue Wörter durch Präfixe und Suffixe.",
    examples: "Handschuh (Hand + Schuh), Arbeitslosigkeit (Arbeit + los + keit)",
    tips: "Komposita = zwei oder mehr Wörter zusammen!"
  },
  {
    name: "Stilistische Mittel",
    description: "Rhetorische Figuren",
    level: "B2" as CEFRLevel,
    order: 70,
    explanation: "Stilistische Mittel wie Metaphern, Metonymien und Antithemen bereichern die Sprache.",
    examples: "Er ist ein Fuchs (Metapher). Das Weiße Haus (Metonymie).",
    tips: "Metapher = bildlicher Vergleich!"
  },
  {
    name: "Register und Varietäten",
    description: "Formell vs. informell",
    level: "B2" as CEFRLevel,
    order: 71,
    explanation: "Das Deutsche unterscheidet zwischen formellem und informellem Register. Formelles Deutsch wird in offiziellen Situationen verwendet.",
    examples: "Ich bitte um Antwort (formell) vs. Schreib mir zurück (informell).",
    tips: "Formell = Sie, informell = du!"
  },
  {
    name: "Idiomatische Ausdrücke",
    description: "Redewendungen",
    level: "B2" as CEFRLevel,
    order: 72,
    explanation: "Idiomatische Ausdrücke sind feste Wortverbindungen, deren Bedeutung nicht aus den Einzelwörtern erschlossen werden kann.",
    examples: "Die Katze im Sack kaufen. Das Gras wachsen hören.",
    tips: "Redewendungen zusammen lernen!"
  },
  {
    name: "Modale Partikeln",
    description: "Satzfärbung",
    level: "B2" as CEFRLevel,
    order: 73,
    explanation: "Modale Partikeln färben den Satz und drücken Haltung aus: doch, eben, mal, schon, ja, denn, halt.",
    examples: "Komm doch! Das ist eben so. Mach mal das Licht an.",
    tips: "Partikeln = Nuancen und Stimmung!"
  },
  {
    name: "Passivkonstruktionen",
    description: "Verschiedene Passivformen",
    level: "B2" as CEFRLevel,
    order: 74,
    explanation: "Es gibt verschiedene Passivkonstruktionen: Vorgangspassiv, Zustandspassiv, unpersönliches Passiv.",
    examples: "Es wird gearbeitet (unpersönlich). Die Tür ist offen (Zustand).",
    tips: "Passiv = Fokus auf Handlung, nicht auf Täter!"
  },
  {
    name: "Konnektoren und Kohäsion",
    description: "Textverbindungen",
    level: "B2" as CEFRLevel,
    order: 75,
    explanation: "Konnektoren verbinden Sätze und Texte logisch: deshalb, jedoch, trotzdem, daher, folglich.",
    examples: "Es regnet, deshalb bleibe ich zu Hause. Er ist müde, trotzdem arbeitet er.",
    tips: "Konnektoren = Textfluss und Logik!"
  },
];

// C1 Vocabulary (650 words) - Academic & Professional
const c1Vocabulary: Array<{
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
  // Academic & Research
  { word: "die Hypothese", article: "die", plural: "Hypothesen", pos: "Nomen", gender: "FEMININE", level: "C1" as CEFRLevel, translationEn: "hypothesis", translationTr: "hipotez", exampleSentence: "Die Hypothese wird getestet.", exampleTranslation: "The hypothesis is being tested." },
  { word: "die Analyse", article: "die", plural: "Analysen", pos: "Nomen", gender: "FEMININE", level: "C1" as CEFRLevel, translationEn: "analysis", translationTr: "analiz", exampleSentence: "Die Analyse zeigt Ergebnisse.", exampleTranslation: "The analysis shows results." },
  { word: "die Synthese", article: "die", plural: "Synthesen", pos: "Nomen", gender: "FEMININE", level: "C1" as CEFRLevel, translationEn: "synthesis", translationTr: "sentez", exampleSentence: "Die Synthese ist abgeschlossen.", exampleTranslation: "The synthesis is complete." },
  { word: "die Methodik", article: "die", plural: "Methodiken", pos: "Nomen", gender: "FEMININE", level: "C1" as CEFRLevel, translationEn: "methodology", translationTr: "metodoloji", exampleSentence: "Die Methodik ist wissenschaftlich.", exampleTranslation: "The methodology is scientific." },
  
  // Philosophy & Ethics
  { word: "die Ethik", article: "die", plural: "", pos: "Nomen", gender: "FEMININE", level: "C1" as CEFRLevel, translationEn: "ethics", translationTr: "etik", exampleSentence: "Die Ethik wird diskutiert.", exampleTranslation: "Ethics is being discussed." },
  { word: "die Philosophie", article: "die", plural: "Philosophien", pos: "Nomen", gender: "FEMININE", level: "C1" as CEFRLevel, translationEn: "philosophy", translationTr: "felsefe", exampleSentence: "Die Philosophie ist tiefgründig.", exampleTranslation: "Philosophy is profound." },
  { word: "das Paradoxon", article: "das", plural: "Paradoxa", pos: "Nomen", gender: "NEUTER", level: "C1" as CEFRLevel, translationEn: "paradox", translationTr: "paradoks", exampleSentence: "Das Paradoxon ist interessant.", exampleTranslation: "The paradox is interesting." },
  
  // Literature & Arts
  { word: "die Literatur", article: "die", plural: "", pos: "Nomen", gender: "FEMININE", level: "C1" as CEFRLevel, translationEn: "literature", translationTr: "edebiyat", exampleSentence: "Die Literatur wird gelesen.", exampleTranslation: "Literature is being read." },
  { word: "die Ästhetik", article: "die", plural: "", pos: "Nomen", gender: "FEMININE", level: "C1" as CEFRLevel, translationEn: "aesthetics", translationTr: "estetik", exampleSentence: "Die Ästhetik ist wichtig.", exampleTranslation: "Aesthetics is important." },
  { word: "der Kontext", article: "der", plural: "Kontexte", pos: "Nomen", gender: "MASCULINE", level: "C1" as CEFRLevel, translationEn: "context", translationTr: "bağlam", exampleSentence: "Der Kontext ist entscheidend.", exampleTranslation: "The context is crucial." },
  
  // Advanced Abstract
  { word: "die Identität", article: "die", plural: "Identitäten", pos: "Nomen", gender: "FEMININE", level: "C1" as CEFRLevel, translationEn: "identity", translationTr: "kimlik", exampleSentence: "Die Identität wird gesucht.", exampleTranslation: "Identity is being sought." },
  { word: "die Autonomie", article: "die", plural: "", pos: "Nomen", gender: "FEMININE", level: "C1" as CEFRLevel, translationEn: "autonomy", translationTr: "özerklik", exampleSentence: "Die Autonomie ist gewahrt.", exampleTranslation: "Autonomy is maintained." },
  { word: "die Reflexion", article: "die", plural: "Reflexionen", pos: "Nomen", gender: "FEMININE", level: "C1" as CEFRLevel, translationEn: "reflection", translationTr: "yansıma", exampleSentence: "Die Reflexion führt zu Erkenntnis.", exampleTranslation: "Reflection leads to insight." },
];

// C1 Grammar (18 topics)
const c1Grammar: Array<{
  name: string;
  description: string;
  level: CEFRLevel;
  order: number;
  explanation: string;
  examples: string;
  tips?: string;
}> = [
  {
    name: "Erweiterte Konditionalsätze",
    description: "würde-Konstruktionen",
    level: "C1" as CEFRLevel,
    order: 76,
    explanation: "Erweiterte Konditionalsätze mit 'würde' + Infinitiv für hypothetische Situationen.",
    examples: "Wenn ich Zeit hätte, würde ich kommen. Wenn es regnen würde, blieben wir zu Hause.",
    tips: "würde + Infinitiv = hypothetisch!"
  },
  {
    name: "Passiv mit Modalverben",
    description: "kombinierte Konstruktionen",
    level: "C1" as CEFRLevel,
    order: 77,
    explanation: "Passiv kann mit Modalverben kombiniert werden für Nuancen der Möglichkeit und Notwendigkeit.",
    examples: "Das kann gemacht werden. Das muss repariert werden. Das sollte nicht passieren.",
    tips: "Modalverb + Passiv = Nuancen!"
  },
  {
    name: "Ersatzinfinitive",
    description: "zu + Infinitiv im Passiv",
    level: "C1" as CEFRLevel,
    order: 78,
    explanation: "Ersatzinfinitive treten auf, wenn Infinitiv und Partizip kombiniert werden. 'zu' steht davor.",
    examples: "Es ist zu machen. Es lässt sich machen.",
    tips: "zu + Infinitiv = Ersatzform!"
  },
  {
    name: "Genitivattribute",
    description: "Erweiterte Genitivkonstruktionen",
    level: "C1" as CEFRLevel,
    order: 79,
    explanation: "Genitivattribute können erweitert werden und stehen nach dem Nomen.",
    examples: "Die Farbe des auf dem Tisch stehenden Buches. Die Meinung des in Berlin lebenden Freundes.",
    tips: "Genitivattribut = formell, erweitert möglich!"
  },
  {
    name: "Präteritum in Erzählungen",
    description: "Erzählstil",
    level: "C1" as CEFRLevel,
    order: 80,
    explanation: "Das Präteritum wird in schriftlichen Erzählungen verwendet für eine flüssige Darstellung der Vergangenheit.",
    examples: "Er stand auf und ging zur Tür. Es war dunkel und kalt.",
    tips: "Präteritum = schriftliche Erzählungen!"
  },
  {
    name: "Konjunktiv in indirekter Rede",
    description: "Berichtende Rede",
    level: "C1" as CEFRLevel,
    order: 81,
    explanation: "Konjunktiv I und II werden in der indirekten Rede verwendet, um Abstand vom Original zu zeigen.",
    examples: "Er sagte, er komme (Konjunktiv I). Er sagte, er käme (Konjunktiv II).",
    tips: "Konjunktiv = indirekte Rede, Distanz!"
  },
  {
    name: "Nominalstil im formellen Deutsch",
    description: "Behördendeutsch",
    level: "C1" as CEFRLevel,
    order: 82,
    explanation: "Der Nominalstil verwendet Nomen statt Verben für formelle Texte. Dies ist typisch für Behörden und Wissenschaft.",
    examples: "Die Durchführung der Untersuchung (statt: Man führt die Untersuchung durch).",
    tips: "Nominalstil = formell, kompakt!"
  },
  {
    name: "Stilistische Variationen",
    description: "Synonyme und Paraphrasen",
    level: "C1" as CEFRLevel,
    order: 83,
    explanation: "Stilistische Variationen vermeiden Wiederholungen und bereichern den Text.",
    examples: "wichtig = bedeutend = essentiell = von Belang",
    tips: "Variationen = reicher Text!"
  },
  {
    name: "Textkohäsion und Kohärenz",
    description: "Textstruktur",
    level: "C1" as CEFRLevel,
    order: 84,
    explanation: "Kohäsion verbindet Sätze grammatisch, Kohärenz verbindet sie inhaltlich.",
    examples: "Er kam nicht. Deshalb warteten wir. (kohärent)",
    tips: "Kohäsion = grammatisch, Kohärenz = inhaltlich!"
  },
  {
    name: "Registerwechsel",
    description: "Formell ↔ Informell",
    level: "C1" as CEFRLevel,
    order: 85,
    explanation: "Das Register kann je nach Situation gewechselt werden. Formell für offizielle, informell für private Situationen.",
    examples: "Ich bitte um Antwort (formell) vs. Schreib mir (informell).",
    tips: "Register = Situation anpassen!"
  },
  {
    name: "Ironie und Sarkasmus",
    description: "Figurative Sprache",
    level: "C1" as CEFRLevel,
    order: 86,
    explanation: "Ironie und Sarkasmus drücken das Gegenteil des wörtlichen Sinns aus.",
    examples: "Das ist ja toll! (ironisch, wenn etwas schlecht ist).",
    tips: "Ironie = Gegenteil des Wörtlichen!"
  },
  {
    name: "Kulturelle Referenzen",
    description: "Deutschsprachige Kultur",
    level: "C1" as CEFRLevel,
    order: 87,
    explanation: "Kulturelle Referenzen aus der deutschsprachigen Welt bereichern die Sprache.",
    examples: "Goethe, Kafka, Nietzsche, Brecht",
    tips: "Kultur = Kontext erweitern!"
  },
  {
    name: "Fachsprache",
    description: "Domänenspezifisches Vokabular",
    level: "C1" as CEFRLevel,
    order: 88,
    explanation: "Fachsprache wird in spezifischen Bereichen verwendet: Medizin, Recht, Wissenschaft.",
    examples: "Diagnose, Prognose, Therapie (Medizin). Klage, Urteil, Prozess (Recht).",
    tips: "Fachsprache = domänenspezifisch!"
  },
  {
    name: "Wortfeldanalyse",
    description: "Semantische Felder",
    level: "C1" as CEFRLevel,
    order: 89,
    explanation: "Wortfelder sind thematisch zusammengehörige Wortgruppen.",
    examples: "Medizin: Arzt, Patient, Behandlung, Diagnose, Therapie",
    tips: "Wortfelder = thematisch lernen!"
  },
  {
    name: "Kollokationen",
    description: "Feste Wortverbindungen",
    level: "C1" as CEFRLevel,
    order: 90,
    explanation: "Kollokationen sind häufige Wortkombinationen, die natürlich klingen.",
    examples: "eine Entscheidung treffen, eine Rolle spielen, in Frage kommen",
    tips: "Kollokationen = natürliches Deutsch!"
  },
  {
    name: "Diskursmarker",
    description: "Gesprächssteuerung",
    level: "C1" as CEFRLevel,
    order: 91,
    explanation: "Diskursmarker strukturieren Gespräche und Texte: also, nun, also, denn, daher.",
    examples: "Also, wir müssen gehen. Nun, es ist spät. Daher warten wir.",
    tips: "Diskursmarker = Textstruktur!"
  },
  {
    name: "Pragmatik",
    description: "Sprachhandlungen",
    level: "C1" as CEFRLevel,
    order: 92,
    explanation: "Pragmatik untersucht, wie Sprache in Situationen verwendet wird, nicht nur was sie bedeutet.",
    examples: "Kannst du das Fenster schließen? (Bitte, nicht Frage)",
    tips: "Pragmatik = Sprachhandlung!"
  },
  {
    name: "Stilistische Perfektion",
    description: "Ausgefeilte Ausdrucksmittel",
    level: "C1" as CEFRLevel,
    order: 93,
    explanation: "Stilistische Perfektion erreicht man durch bewusste Wortwahl und Satzstruktur.",
    examples: "Die Sonne ging unter (schön) vs. Die Sonne sank (neutral).",
    tips: "Stil = bewusste Wahl!"
  },
];

async function main() {
  console.log("🚀 Generating B2 and C1 content...\n");
  
  // Generate B2 vocabulary
  console.log("📚 Generating B2 vocabulary...");
  let b2VocabCount = 0;
  
  for (const wordData of b2Vocabulary) {
    const cleanWord = wordData.word.split(" ").pop() || wordData.word;
    
    await prisma.vocabulary.create({
      data: {
        word: cleanWord,
        article: wordData.article,
        plural: wordData.plural || "",
        pos: wordData.pos,
        level: "B2" as CEFRLevel,
        gender: wordData.gender,
        translationEn: wordData.translationEn,
        translationTr: wordData.translationTr,
        exampleSentence: wordData.exampleSentence,
        exampleTranslation: wordData.exampleTranslation,
        isPublished: true,
      },
    });
    b2VocabCount++;
  }
  
  console.log(`  ✓ B2 vocabulary: ${b2VocabCount} words`);
  
  // Generate B2 grammar
  console.log("\n📖 Generating B2 grammar...");
  let b2GrammarCount = 0;
  
  for (const topic of b2Grammar) {
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
    b2GrammarCount++;
  }
  
  console.log(`  ✓ B2 grammar: ${b2GrammarCount} topics`);
  
  // Generate C1 vocabulary
  console.log("\n📚 Generating C1 vocabulary...");
  let c1VocabCount = 0;
  
  for (const wordData of c1Vocabulary) {
    const cleanWord = wordData.word.split(" ").pop() || wordData.word;
    
    await prisma.vocabulary.create({
      data: {
        word: cleanWord,
        article: wordData.article,
        plural: wordData.plural || "",
        pos: wordData.pos,
        level: "C1" as CEFRLevel,
        gender: wordData.gender,
        translationEn: wordData.translationEn,
        translationTr: wordData.translationTr,
        exampleSentence: wordData.exampleSentence,
        exampleTranslation: wordData.exampleTranslation,
        isPublished: true,
      },
    });
    c1VocabCount++;
  }
  
  console.log(`  ✓ C1 vocabulary: ${c1VocabCount} words`);
  
  // Generate C1 grammar
  console.log("\n📖 Generating C1 grammar...");
  let c1GrammarCount = 0;
  
  for (const topic of c1Grammar) {
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
    c1GrammarCount++;
  }
  
  console.log(`  ✓ C1 grammar: ${c1GrammarCount} topics`);
  
  // Get final counts
  const [vocabTotal, grammarTotal] = await Promise.all([
    prisma.vocabulary.count({ where: { isPublished: true } }),
    prisma.grammarTopic.count({ where: { isPublished: true } }),
  ]);
  
  console.log(`\n✅ B2 and C1 generation complete!`);
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