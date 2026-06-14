import { TranslationProvider, type TranslationResult } from "./provider";
import { LibreTranslateProvider } from "./libretranslate";
import { MockProvider } from "./mock";

const CACHE_TTL = 60 * 60 * 1000; // 1 hour
const cache = new Map<string, { result: TranslationResult; expiresAt: number }>();

function getCacheKey(text: string, sourceLang: string, targetLang: string): string {
  return `${sourceLang}:${targetLang}:${text}`;
}

function getFromCache(key: string): TranslationResult | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }
  return entry.result;
}

function setCache(key: string, result: TranslationResult): void {
  cache.set(key, { result, expiresAt: Date.now() + CACHE_TTL });
  // Limit cache size to 1000 entries
  if (cache.size > 1000) {
    const firstKey = cache.keys().next().value;
    if (firstKey) cache.delete(firstKey);
  }
}

function createProvider(): TranslationProvider {
  const providerType = process.env.TRANSLATION_PROVIDER ?? "libretranslate";

  switch (providerType) {
    case "libretranslate":
      return new LibreTranslateProvider();
    case "mock":
    default:
      return new MockProvider();
  }
}

const provider = createProvider();

export async function translateText(
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<string> {
  if (sourceLang === targetLang) return text;

  const cacheKey = getCacheKey(text, sourceLang, targetLang);
  const cached = getFromCache(cacheKey);
  if (cached) return cached.translatedText;

  const result = await provider.translateText(text, sourceLang, targetLang);
  setCache(cacheKey, result);
  return result.translatedText;
}

export async function translateBatch(
  texts: string[],
  sourceLang: string,
  targetLang: string
): Promise<string[]> {
  const results = await Promise.all(
    texts.map((text) => translateText(text, sourceLang, targetLang))
  );
  return results;
}

export async function detectLanguage(text: string): Promise<string> {
  return provider.detectLanguage(text);
}

export async function getSupportedLanguages(): Promise<{ code: string; name: string }[]> {
  return provider.getSupportedLanguages();
}

export { type TranslationProvider, type TranslationResult } from "./provider";
