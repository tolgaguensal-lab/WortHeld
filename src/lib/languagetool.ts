/**
 * LanguageTool Client — Open-Source Grammatik- & Rechtschreibprüfung
 *
 * LanguageTool läuft lokal im Docker-Netzwerk (wortwende-languagetool:8010)
 * Docs: https://languagetool.org/http-api/
 */

const LT_URL = process.env.LANGUAGE_TOOL_API_URL || "http://languagetool:8010";

interface LTMatch {
  message: string;
  shortMessage: string;
  offset: number;
  length: number;
  replacements: { value: string }[];
  rule: { id: string; description: string; category: { name: string } };
  sentence: string;
}

interface LTCheckResult {
  language: { code: string; name: string };
  matches: LTMatch[];
}

export async function checkGrammar(text: string, language = "de-DE"): Promise<{
  errors: { message: string; correction?: string; offset: number; length: number; category: string }[];
  text: string;
}> {
  try {
    const res = await fetch(`${LT_URL}/v2/check`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ text, language }),
    });

    if (!res.ok) throw new Error(`LanguageTool: ${res.status}`);

    const data: LTCheckResult = await res.json();

    return {
      text,
      errors: data.matches.map(m => ({
        message: m.message,
        correction: m.replacements?.[0]?.value,
        offset: m.offset,
        length: m.length,
        category: m.rule.category.name,
      })),
    };
  } catch (e) {
    // Fallback: wenn LanguageTool nicht verfügbar, leeres Ergebnis
    console.warn("LanguageTool nicht erreichbar:", e);
    return { text, errors: [] };
  }
}

export async function checkSpelling(word: string): Promise<{
  correct: boolean;
  suggestions: string[];
}> {
  const result = await checkGrammar(word, "de-DE");
  const spellingErrors = result.errors.filter(
    e => e.category === "Tippfehler" || e.category === "Possible Typo" || e.message.includes("Rechtschreibung")
  );
  return {
    correct: spellingErrors.length === 0,
    suggestions: spellingErrors.flatMap(e => (e.correction ? [e.correction] : [])),
  };
}
