import { TranslationProvider, type TranslationResult, SUPPORTED_LANGUAGES } from "./provider";

const MOCK_TRANSLATIONS: Record<string, string> = {
  "de:tr:Hallo": "Merhaba",
  "de:tr:Guten Morgen": "Günaydın",
  "de:tr:Guten Tag": "İyi günler",
  "de:tr:Guten Abend": "İyi akşamlar",
  "de:tr:Tschüss": "Hoşça kal",
  "de:tr:Danke": "Teşekkürler",
  "de:tr:Bitte": "Lütfen",
  "de:tr:Ja": "Evet",
  "de:tr:Nein": "Hayır",
  "de:tr:Wie geht es Ihnen?": "Nasılsınız?",
  "de:tr:Ich heiße": "Benim adım",
  "de:tr:Woher kommen Sie?": "Nerelisiniz?",
  "de:tr:Ich komme aus": "Ben ...den geliyorum",
  "de:en:Hallo": "Hello",
  "de:en:Guten Morgen": "Good morning",
  "de:en:tschüss": "bye",
  "de:en:danke": "thank you",
  "de:en:bitte": "please",
};

const LANG_NAMES: Record<string, string> = {
  de: "Deutsch", tr: "Türkisch", ru: "Russisch", ar: "Arabisch",
  pl: "Polnisch", en: "Englisch", ro: "Rumänisch", uk: "Ukrainisch",
  sq: "Albanisch", ku: "Kurdisch", it: "Italienisch",
};

export class MockProvider implements TranslationProvider {
  name = "mock";

  async translateText(text: string, sourceLang: string, targetLang: string): Promise<TranslationResult> {
    const key = `${sourceLang}:${targetLang}:${text}`;
    const cached = MOCK_TRANSLATIONS[key];
    if (cached) {
      return { translatedText: cached, provider: "mock" };
    }

    const lower = text.toLowerCase();
    const cachedLower = MOCK_TRANSLATIONS[`${sourceLang}:${targetLang}:${lower}`];
    if (cachedLower) {
      return { translatedText: cachedLower, provider: "mock" };
    }

    // Fallback: prefix with [Mock] to indicate it's not real translation
    return {
      translatedText: `[${sourceLang}→${targetLang}] ${text}`,
      provider: "mock",
    };
  }

  async translateBatch(texts: string[], sourceLang: string, targetLang: string): Promise<TranslationResult[]> {
    return Promise.all(texts.map((t) => this.translateText(t, sourceLang, targetLang)));
  }

  async detectLanguage(text: string): Promise<string> {
    if (/^[a-zA-Z\s,.-]+$/.test(text)) return "en";
    if (/[äöüß]/.test(text)) return "de";
    if (/[çğıöşü]/.test(text)) return "tr";
    if (/[а-яё]/.test(text)) return "ru";
    if (/[א-ת]/.test(text)) return "he";
    return "de";
  }

  async getSupportedLanguages(): Promise<{ code: string; name: string }[]> {
    return SUPPORTED_LANGUAGES.map((l) => ({
      ...l,
      name: LANG_NAMES[l.code] ?? l.name,
    }));
  }
}
