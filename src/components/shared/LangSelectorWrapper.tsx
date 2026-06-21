"use client";

import { LanguageSelector } from "./LanguageSelector";

export function LangSelectorWrapper() {
  return (
    <div className="px-1">
      <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mb-1.5 px-2">
        Meine Sprache
      </p>
      <LanguageSelector variant="inline" />
    </div>
  );
}
