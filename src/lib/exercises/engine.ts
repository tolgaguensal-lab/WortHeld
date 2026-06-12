import { ExerciseType, type ExerciseData, type Vocabulary } from "@/types";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function pickRandom<T>(arr: T[], count: number): T[] {
  return shuffle(arr).slice(0, count);
}

export function generateMultipleChoice(vocabulary: Vocabulary[], count = 1): ExerciseData[] {
  return pickRandom(vocabulary, count).map((v) => {
    const distractors = vocabulary.filter((x) => x.id !== v.id);
    const options = shuffle([v, ...pickRandom(distractors, 3)]).map((o) => ({
      text: o.translationEn,
      isCorrect: o.id === v.id,
    }));
    return {
      type: ExerciseType.MULTIPLE_CHOICE,
      question: `Was bedeutet "${v.word}"?`,
      content: JSON.stringify({ word: v.word, article: v.article }),
      correctAnswer: v.translationEn,
      options,
    };
  });
}

export function generateFillBlank(sentences: { text: string; translationEn: string }[], count = 1): ExerciseData[] {
  return pickRandom(sentences, count).map((s) => {
    const words = s.text.split(" ");
    const targetIdx = Math.floor(Math.random() * words.length);
    const target = words[targetIdx];
    const blank = words.map((w, i) => (i === targetIdx ? "______" : w)).join(" ");
    return {
      type: ExerciseType.FILL_BLANK,
      question: `Fülle die Lücke aus: "${blank}"`,
      content: JSON.stringify({ sentence: s.text, blankIndex: targetIdx }),
      correctAnswer: target,
    };
  });
}

export function generateSentenceOrder(sentence: string): ExerciseData {
  const words = sentence.split(" ");
  return {
    type: ExerciseType.SENTENCE_ORDER,
    question: "Setze die Wörter in die richtige Reihenfolge:",
    content: JSON.stringify({ words: shuffle(words) }),
    correctAnswer: sentence,
  };
}

export function generateArticleTraining(nouns: Vocabulary[]): ExerciseData[] {
  return nouns.filter((n) => n.article).map((n) => ({
    type: ExerciseType.ARTICLE_TRAINING,
    question: `Welcher Artikel gehört zu "${n.word}"?`,
    content: JSON.stringify({ word: n.word }),
    correctAnswer: n.article!,
    options: [
      { text: "der", isCorrect: n.article === "der" },
      { text: "die", isCorrect: n.article === "die" },
      { text: "das", isCorrect: n.article === "das" },
    ],
  }));
}

export function generateVerbConjugation(verbs: Vocabulary[], tense = "Präsens"): ExerciseData[] {
  return pickRandom(verbs, 3).map((v) => {
    const pronouns = ["ich", "du", "er/sie/es", "wir", "ihr", "sie/Sie"];
    const pronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
    return {
      type: ExerciseType.VERB_CONJUGATION,
      question: `Konjugiere "${v.word}" im ${tense} für "${pronoun}"`,
      content: JSON.stringify({ verb: v.word, pronoun, tense }),
      correctAnswer: v.conjugationJson ? JSON.parse(v.conjugationJson)[pronoun] ?? "" : "",
    };
  });
}

export function generateTranslationExercise(items: { text: string; translationEn: string }[]): ExerciseData {
  const item = items[Math.floor(Math.random() * items.length)];
  return {
    type: ExerciseType.TRANSLATION,
    question: `Übersetze: "${item.text}"`,
    content: JSON.stringify({ direction: "de-en" }),
    correctAnswer: item.translationEn,
  };
}

export function generateListeningExercise(vocabulary: Vocabulary[]): ExerciseData {
  const v = vocabulary[Math.floor(Math.random() * vocabulary.length)];
  const distractors = vocabulary.filter((x) => x.id !== v.id);
  const options = shuffle([v, ...pickRandom(distractors, 3)]).map((o) => ({
    text: o.word,
    isCorrect: o.id === v.id,
  }));
  return {
    type: ExerciseType.LISTENING,
    question: `Was hast du gehört?`,
    content: JSON.stringify({ word: v.word, playAudio: true }),
    correctAnswer: v.word,
    options,
  };
}

export function generateErrorFinder(sentence: string, errors: string[]): ExerciseData {
  return {
    type: ExerciseType.ERROR_FINDER,
    question: "Finde den Fehler im Satz:",
    content: JSON.stringify({ sentence, errors }),
    correctAnswer: errors.join(", "),
  };
}
