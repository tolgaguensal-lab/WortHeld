import { TranslationProvider, type TranslationResult, SUPPORTED_LANGUAGES } from "./provider";
import { prisma } from "@/lib/db";

interface LibreTranslateResponse {
  translatedText: string;
}

interface LibreTranslateDetectResponse {
  language: string;
  confidence: number;
}

interface LibreTranslateLanguagesResponse {
  code: string;
  name: string;
  targets?: boolean;
}

export class LibreTranslateProvider implements TranslationProvider {
  name = "libretranslate";
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.LIBRETRANSLATE_URL ?? "http://libretranslate:5000";
  }

  private async request<T>(path: string, body: Record<string, unknown>): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`LibreTranslate error (${res.status}): ${text}`);
    }

    return res.json() as Promise<T>;
  }

  private async requestGet<T>(path: string): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const res = await fetch(url);

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`LibreTranslate error (${res.status}): ${text}`);
    }

    return res.json() as Promise<T>;
  }

  async translateText(text: string, sourceLang: string, targetLang: string): Promise<TranslationResult> {
    const body: Record<string, unknown> = {
      q: text,
      source: sourceLang === "ku" ? "auto" : sourceLang,
      target: targetLang === "ku" ? "en" : targetLang,
      format: "text",
    };

    if (sourceLang === "auto") {
      body.source = "auto";
    }

    const result = await this.request<LibreTranslateResponse>("/translate", body);

    // Cache the translation in the database
    await prisma.translation.create({
      data: {
        sourceText: text,
        sourceLang,
        targetLang,
        translatedText: result.translatedText,
        provider: "libretranslate",
        reviewedByAdmin: false,
      },
    }).catch(() => {
      // Non-critical: cache failure shouldn't break the translation
    });

    return { translatedText: result.translatedText, provider: "libretranslate" };
  }

  async translateBatch(texts: string[], sourceLang: string, targetLang: string): Promise<TranslationResult[]> {
    // LibreTranslate supports batch via POST with multiple q params
    const results = await Promise.allSettled(
      texts.map((t) => this.translateText(t, sourceLang, targetLang))
    );

    return results.map((r) =>
      r.status === "fulfilled"
        ? r.value
        : { translatedText: `[Fehler]`, provider: "libretranslate" }
    );
  }

  async detectLanguage(text: string): Promise<string> {
    try {
      const result = await this.request<LibreTranslateDetectResponse>("/detect", { q: text });
      return result.language;
    } catch {
      return "de";
    }
  }

  async getSupportedLanguages(): Promise<{ code: string; name: string }[]> {
    try {
      const langs = await this.requestGet<LibreTranslateLanguagesResponse[]>("/languages");
      return langs.map((l) => ({ code: l.code, name: l.name }));
    } catch {
      return SUPPORTED_LANGUAGES;
    }
  }
}
