export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export enum CEFRLevel {
  A1 = "A1",
  A2 = "A2",
  B1 = "B1",
  B2 = "B2",
  C1 = "C1",
}

export enum ExerciseType {
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  FILL_BLANK = "FILL_BLANK",
  SENTENCE_ORDER = "SENTENCE_ORDER",
  TRANSLATION = "TRANSLATION",
  LISTENING = "LISTENING",
  WORD_IMAGE = "WORD_IMAGE",
  ARTICLE_TRAINING = "ARTICLE_TRAINING",
  VERB_CONJUGATION = "VERB_CONJUGATION",
  DATIVE_ACCUSATIVE = "DATIVE_ACCUSATIVE",
  WRITING = "WRITING",
  PRONUNCIATION = "PRONUNCIATION",
  DIALOGUE = "DIALOGUE",
  WORD_MEMORY = "WORD_MEMORY",
  ARTICLE_BATTLE = "ARTICLE_BATTLE",
  GRAMMAR_DUEL = "GRAMMAR_DUEL",
  ERROR_FINDER = "ERROR_FINDER",
}

export enum DifficultyLevel {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}

export enum ReviewQuality {
  BLACKOUT = 0,
  HARD = 3,
  GOOD = 4,
  PERFECT = 5,
}

export enum Gender {
  MASCULINE = "MASCULINE",
  FEMININE = "FEMININE",
  NEUTER = "NEUTER",
}

export interface Course {
  id: string;
  name: string;
  description: string;
  level: CEFRLevel;
  imageUrl?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  units?: Unit[];
}

export interface Unit {
  id: string;
  courseId: string;
  name: string;
  description: string;
  order: number;
  themeColor?: string;
  iconUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  unitId: string;
  name: string;
  description: string;
  order: number;
  xpReward: number;
  isLocked: boolean;
  requiredXp: number;
  createdAt: Date;
  updatedAt: Date;
  exercises?: Exercise[];
}

export interface Exercise {
  id: string;
  lessonId: string;
  type: ExerciseType;
  question: string;
  content: string;
  correctAnswer: string;
  explanation?: string;
  xpValue: number;
  difficulty: DifficultyLevel;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  options?: ExerciseOption[];
}

export interface ExerciseOption {
  id: string;
  exerciseId: string;
  text: string;
  isCorrect: boolean;
  order: number;
  vocabularyId?: string;
}

export interface Vocabulary {
  id: string;
  word: string;
  article?: string;
  plural?: string;
  pos: string;
  level: CEFRLevel;
  gender?: Gender;
  baseForm?: string;
  conjugationJson?: string;
  steigerungJson?: string;
  translationEn: string;
  translationTr?: string;
  exampleSentence?: string;
  exampleTranslation?: string;
  audioUrl?: string;
  sourceName?: string;
  sourceUrl?: string;
  license?: string;
  attribution?: string;
  importedAt?: Date;
  reviewedByAdmin: boolean;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProgress {
  id: string;
  userId: string;
  lessonId: string;
  completed: boolean;
  score: number;
  xpEarned: number;
  timeSpent: number;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  id: string;
  userId: string;
  currentLevel: CEFRLevel;
  totalXp: number;
  level: number;
  hearts: number;
  maxHearts: number;
  streak: number;
  longestStreak: number;
  dailyGoal: number;
  lastActiveAt?: Date;
  preferredTheme: string;
  nativeLanguage: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReviewItem {
  id: string;
  userId: string;
  vocabularyId?: string;
  easeFactor: number;
  interval: number;
  repetitions: number;
  nextReview: Date;
  lastReview?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  iconUrl?: string;
  category: string;
  requirement: number;
  xpReward: number;
  createdAt: Date;
}

export interface UserAchievement {
  id: string;
  userId: string;
  achievementId: string;
  unlockedAt: Date;
}

export interface Streak {
  id: string;
  userId: string;
  date: Date;
  completedGoal: boolean;
}

export interface XPTransaction {
  id: string;
  userId: string;
  amount: number;
  source: string;
  sourceId?: string;
  createdAt: Date;
}

export interface ExerciseData {
  type: ExerciseType;
  question: string;
  content: string;
  correctAnswer: string;
  explanation?: string;
  options?: { text: string; isCorrect: boolean }[];
}

export interface TatoebaResult {
  text: string;
  translation: string;
  lang: string;
}

export interface WiktionaryResult {
  word: string;
  article?: string;
  plural?: string;
  pos: string;
  definition: string;
  examples: string[];
  conjugations?: Record<string, string>;
}

export interface GrammarCheckResult {
  matches: {
    message: string;
    offset: number;
    length: number;
    suggestions: string[];
    rule: string;
    context: string;
  }[];
}
