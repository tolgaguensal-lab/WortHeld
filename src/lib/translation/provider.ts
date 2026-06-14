export interface TranslationResult {
  translatedText: string;
  detectedSourceLang?: string;
  provider: string;
}

export interface TranslationProvider {
  name: string;
  translateText(text: string, sourceLang: string, targetLang: string): Promise<TranslationResult>;
  translateBatch(texts: string[], sourceLang: string, targetLang: string): Promise<TranslationResult[]>;
  detectLanguage(text: string): Promise<string>;
  getSupportedLanguages(): Promise<{ code: string; name: string }[]>;
}

export type ProviderType = "libretranslate" | "mock";

export const SUPPORTED_LANGUAGES: { code: string; name: string }[] = [
  { code: "de", name: "Deutsch" },
  { code: "en", name: "Englisch" },
  { code: "tr", name: "Türkisch" },
  { code: "ru", name: "Russisch" },
  { code: "ar", name: "Arabisch" },
  { code: "pl", name: "Polnisch" },
  { code: "ro", name: "Rumänisch" },
  { code: "uk", name: "Ukrainisch" },
  { code: "sq", name: "Albanisch" },
  { code: "ku", name: "Kurdisch (Kurmandschi)" },
  { code: "it", name: "Italienisch" },
];
