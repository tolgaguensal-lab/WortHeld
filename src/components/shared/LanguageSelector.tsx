"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Globe } from "lucide-react";

// ── Supported Languages ────────────────────────────────────────────────────

export const LANGUAGES = {
  en: { name: "English", native: "English", flag: "🇬🇧" },
  tr: { name: "Türkçe", native: "Türkçe", flag: "🇹🇷" },
  ar: { name: "العربية", native: "العربية", flag: "🇸🇦" },
  ru: { name: "Русский", native: "Русский", flag: "🇷🇺" },
  pl: { name: "Polski", native: "Polski", flag: "🇵🇱" },
  ro: { name: "Română", native: "Română", flag: "🇷🇴" },
  uk: { name: "Українська", native: "Українська", flag: "🇺🇦" },
  sq: { name: "Shqip", native: "Shqip", flag: "🇦🇱" },
  ku: { name: "Kurdî", native: "Kurdî", flag: "🏴" },
  it: { name: "Italiano", native: "Italiano", flag: "🇮🇹" },
} as const;

export type LangCode = keyof typeof LANGUAGES;

// ── Context ─────────────────────────────────────────────────────────────────

interface LanguageContextType {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
  translationField: string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  translationField: "translationEn",
});

export function useLanguage() {
  return useContext(LanguageContext);
}

export function getTranslationField(lang: LangCode): string {
  const map: Record<LangCode, string> = {
    en: "translationEn", tr: "translationTr", ar: "translationAr",
    ru: "translationRu", pl: "translationPl", ro: "translationRo",
    uk: "translationUk", sq: "translationSq", ku: "translationKu",
    it: "translationIt",
  };
  return map[lang] || "translationEn";
}

// ── Provider ────────────────────────────────────────────────────────────────

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<LangCode>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("wortwende-lang") as LangCode | null;
    if (saved && LANGUAGES[saved]) setLang(saved);
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem("wortwende-lang", lang);
  }, [lang, mounted]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, translationField: getTranslationField(lang) }}>
      {children}
    </LanguageContext.Provider>
  );
}

// ── Selector UI ─────────────────────────────────────────────────────────────

export function LanguageSelector({ variant = "dropdown" }: { variant?: "dropdown" | "inline" }) {
  const { lang, setLang } = useLanguage();
  const current = LANGUAGES[lang];

  if (variant === "inline") {
    return (
      <div className="flex gap-1 flex-wrap">
        {(Object.entries(LANGUAGES) as [LangCode, typeof LANGUAGES[keyof typeof LANGUAGES]][]).map(([code, info]) => (
          <button
            key={code}
            onClick={() => setLang(code)}
            className={`px-2 py-1 rounded-lg text-xs font-medium transition-all ${
              lang === code
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-secondary text-muted-foreground hover:bg-primary-muted"
            }`}
          >
            {info.flag} {info.native}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="relative group">
      <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all">
        <Globe size={14} />
        <span>{current.flag}</span>
        <span className="hidden sm:inline">{current.native}</span>
      </button>
      <div className="absolute right-0 top-full mt-1 w-48 bg-card border border-border rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 py-2">
        {(Object.entries(LANGUAGES) as [LangCode, typeof LANGUAGES[keyof typeof LANGUAGES]][]).map(([code, info]) => (
          <button
            key={code}
            onClick={() => setLang(code)}
            className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 transition-colors ${
              lang === code
                ? "bg-primary/10 text-primary font-medium"
                : "text-foreground hover:bg-secondary/50"
            }`}
          >
            <span>{info.flag}</span>
            <span>{info.native}</span>
            <span className="ml-auto text-xs text-muted-foreground">{info.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
