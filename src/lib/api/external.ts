import type { TatoebaResult, WiktionaryResult, GrammarCheckResult } from "@/types";

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(key);
  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= max) return false;
  entry.count++;
  return true;
}

const cache = new Map<string, { data: any; expiresAt: number }>();

function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry || Date.now() > entry.expiresAt) { cache.delete(key); return null; }
  return entry.data as T;
}

function setCache(key: string, data: any, ttlMs: number): void {
  cache.set(key, { data, expiresAt: Date.now() + ttlMs });
}

export async function fetchTatoebaSentences(query: string, lang = "deu"): Promise<TatoebaResult[]> {
  const cacheKey = `tatoeba:${query}:${lang}`;
  const cached = getCached<TatoebaResult[]>(cacheKey);
  if (cached) return cached;

  if (!checkRateLimit("tatoeba", 1, 1000)) throw new Error("Rate limit überschritten");

  const url = `${process.env.TATOEBA_API_URL ?? "https://tatoeba.org/api"}/sentences/search?query=${encodeURIComponent(query)}&language=${lang}&limit=20`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  const results: TatoebaResult[] = (data?.results ?? []).map((r: any) => ({
    text: r.text ?? "",
    translation: r.translations?.[0]?.text ?? "",
    lang: r.lang ?? lang,
  }));
  setCache(cacheKey, results, 3600000);
  return results;
}

export async function fetchWiktionaryEntry(word: string): Promise<WiktionaryResult | null> {
  const cacheKey = `wiktionary:${word}`;
  const cached = getCached<WiktionaryResult>(cacheKey);
  if (cached) return cached;

  const url = `https://en.wiktionary.org/api/rest_v1/page/definition/${encodeURIComponent(word)}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  const de = data?.de;
  if (!de) return null;
  const result: WiktionaryResult = {
    word,
    pos: de?.[0]?.partOfSpeech ?? "unknown",
    definition: de?.[0]?.definitions?.[0]?.definition?.replace(/<[^>]*>/g, "") ?? "",
    examples: [],
  };
  setCache(cacheKey, result, 86400000);
  return result;
}

export async function checkGrammar(text: string): Promise<GrammarCheckResult> {
  if (!checkRateLimit("languagetool", 20, 60000)) throw new Error("Rate limit überschritten");
  const url = `${process.env.LANGUAGE_TOOL_API_URL ?? "https://api.languagetool.org"}/v2/check`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `text=${encodeURIComponent(text)}&language=de-DE`,
  });
  if (!res.ok) return { matches: [] };
  const data = await res.json();
  return {
    matches: (data?.matches ?? []).map((m: any) => ({
      message: m.message ?? "",
      offset: m.offset ?? 0,
      length: m.length ?? 0,
      suggestions: (m.replacements ?? []).slice(0, 3).map((r: any) => r.value ?? ""),
      rule: m.rule?.id ?? "",
      context: m.context?.text ?? "",
    })),
  };
}

export async function translateText(text: string, from = "de", to = "en"): Promise<string> {
  const cacheKey = `translate:${from}:${to}:${text}`;
  const cached = getCached<string>(cacheKey);
  if (cached) return cached;
  const result = `[${to}] ${text}`;
  setCache(cacheKey, result, 86400000);
  return result;
}
