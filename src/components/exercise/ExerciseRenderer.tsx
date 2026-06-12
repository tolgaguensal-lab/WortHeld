"use client";

import { MultipleChoice } from "./MultipleChoice";
import { FillBlank } from "./FillBlank";
import { SentenceOrder } from "./SentenceOrder";
import { ArticleTraining } from "./ArticleTraining";
import { VerbConjugation } from "./VerbConjugation";
import { TranslationExercise } from "./TranslationExercise";
import { ListeningExercise } from "./ListeningExercise";
import { DativAkkusativ } from "./DativAkkusativ";
import { WritingExercise } from "./WritingExercise";
import { WordMemory } from "./WordMemory";
import { ArticleBattle } from "./ArticleBattle";
import { GrammarDuel } from "./GrammarDuel";
import { ErrorFinder } from "./ErrorFinder";
import { ExerciseType } from "@/types";

interface ExerciseRendererProps {
  type: ExerciseType;
  exercise: any;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  onScoreAnswer?: (score: number) => void;
  disabled?: boolean;
}

export function ExerciseRenderer({ type, exercise, onAnswer, onScoreAnswer, disabled }: ExerciseRendererProps) {
  const content = exercise.content ? JSON.parse(exercise.content) : {};

  switch (type) {
    case ExerciseType.MULTIPLE_CHOICE:
      return (
        <MultipleChoice
          question={exercise.question}
          options={exercise.options ?? [
            { text: exercise.correctAnswer, isCorrect: true },
            { text: "Option B", isCorrect: false },
            { text: "Option C", isCorrect: false },
            { text: "Option D", isCorrect: false },
          ].sort(() => Math.random() - 0.5)}
          onAnswer={onAnswer}
          disabled={disabled}
        />
      );

    case ExerciseType.FILL_BLANK:
      return (
        <FillBlank
          question={exercise.question}
          sentence={content.sentence ?? exercise.question}
          correctAnswer={exercise.correctAnswer}
          onAnswer={onAnswer}
          disabled={disabled}
        />
      );

    case ExerciseType.SENTENCE_ORDER:
      return (
        <SentenceOrder
          question={exercise.question}
          words={content.words ?? exercise.correctAnswer.split(" ")}
          correctAnswer={exercise.correctAnswer}
          onAnswer={onAnswer}
          disabled={disabled}
        />
      );

    case ExerciseType.ARTICLE_TRAINING:
      return (
        <ArticleTraining
          question={exercise.question}
          correctAnswer={exercise.correctAnswer}
          onAnswer={onAnswer}
          disabled={disabled}
        />
      );

    case ExerciseType.VERB_CONJUGATION:
      return (
        <VerbConjugation
          question={exercise.question}
          verb={content.verb ?? ""}
          pronoun={content.pronoun ?? "ich"}
          correctAnswer={exercise.correctAnswer}
          tense={content.tense ?? "Präsens"}
          onAnswer={onAnswer}
          disabled={disabled}
        />
      );

    case ExerciseType.TRANSLATION:
      return (
        <TranslationExercise
          question={exercise.question}
          sourceText={content.sourceText ?? ""}
          correctAnswer={exercise.correctAnswer}
          direction={content.direction ?? "en-de"}
          onAnswer={onAnswer}
          disabled={disabled}
        />
      );

    case ExerciseType.LISTENING:
      return (
        <ListeningExercise
          question={exercise.question}
          word={content.word ?? exercise.correctAnswer}
          options={exercise.options ?? []}
          onAnswer={onAnswer}
          disabled={disabled}
        />
      );

    case ExerciseType.DATIVE_ACCUSATIVE:
      return (
        <DativAkkusativ
          question={exercise.question}
          sentence={content.sentence ?? ""}
          correctAnswer={exercise.correctAnswer}
          onAnswer={onAnswer}
          disabled={disabled}
        />
      );

    case ExerciseType.WRITING:
      return (
        <WritingExercise
          question={exercise.question}
          prompt={content.prompt ?? "Schreibe einen Satz"}
          onAnswer={onAnswer}
          disabled={disabled}
        />
      );

    case ExerciseType.WORD_MEMORY:
      return (
        <WordMemory
          question={exercise.question}
          words={content.words ?? []}
          onAnswer={onScoreAnswer ?? (() => {})}
        />
      );

    case ExerciseType.ARTICLE_BATTLE:
      return (
        <ArticleBattle
          question={exercise.question}
          words={content.words ?? []}
          onAnswer={onScoreAnswer ?? (() => {})}
        />
      );

    case ExerciseType.GRAMMAR_DUEL:
      return (
        <GrammarDuel
          question={exercise.question}
          sentences={content.sentences ?? []}
          onAnswer={onScoreAnswer ?? (() => {})}
        />
      );

    case ExerciseType.ERROR_FINDER:
      return (
        <ErrorFinder
          question={exercise.question}
          sentence={content.sentence ?? ""}
          errors={content.errors ?? []}
          onAnswer={onAnswer}
          disabled={disabled}
        />
      );

    case ExerciseType.PRONUNCIATION:
      return (
        <ListeningExercise
          question={exercise.question}
          word={content.word ?? exercise.correctAnswer}
          options={exercise.options ?? []}
          onAnswer={onAnswer}
          disabled={disabled}
        />
      );

    case ExerciseType.DIALOGUE:
      return (
        <MultipleChoice
          question={exercise.question}
          options={exercise.options ?? []}
          onAnswer={onAnswer}
          disabled={disabled}
        />
      );

    case ExerciseType.WORD_IMAGE:
      return (
        <MultipleChoice
          question={exercise.question}
          options={exercise.options ?? []}
          onAnswer={onAnswer}
          disabled={disabled}
        />
      );

    default:
      return (
        <MultipleChoice
          question={exercise.question}
          options={exercise.options ?? []}
          onAnswer={onAnswer}
          disabled={disabled}
        />
      );
  }
}
