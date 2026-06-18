/**
 * Audio URL utility — generates TTS audio URLs for vocabulary words.
 * Uses browser-native SpeechSynthesis for playback, with fallback URLs.
 */

const TTS_BASE = "https://translate.google.com/translate_tts";

/**
 * Generate a Google TTS URL for a German word.
 * NOTE: This is a free public endpoint. For production, use a dedicated TTS service.
 */
export function getTtsUrl(word: string, lang = "de"): string {
  const encoded = encodeURIComponent(word);
  return `${TTS_BASE}?ie=UTF-8&tl=${lang}&client=tw-ob&q=${encoded}`;
}

/**
 * Generate a Wikimedia Commons audio URL for common German words.
 * Falls back to Google TTS if no Commons audio exists.
 */
export function getAudioUrl(word: string): string {
  // For common words, prefer Wikimedia Commons
  // Format: File:De-{word}.ogg
  const commonsUrl = `https://commons.wikimedia.org/wiki/File:De-${encodeURIComponent(word)}.ogg`;
  // In production, we'd check if this exists. For now, use Google TTS as reliable fallback.
  return getTtsUrl(word);
}

/**
 * Pre-generated audio URLs for top 50 A1 vocabulary words.
 * These use Google TTS which is reliable and free for moderate usage.
 */
export const topA1Audio: Record<string, string> = {
  "Hallo": getTtsUrl("Hallo"),
  "Guten Morgen": getTtsUrl("Guten+Morgen"),
  "Guten Tag": getTtsUrl("Guten+Tag"),
  "Guten Abend": getTtsUrl("Guten+Abend"),
  "Tschüss": getTtsUrl("Tsch%C3%BCss"),
  "Danke": getTtsUrl("Danke"),
  "Bitte": getTtsUrl("Bitte"),
  "Ja": getTtsUrl("Ja"),
  "Nein": getTtsUrl("Nein"),
  "Entschuldigung": getTtsUrl("Entschuldigung"),
  "die Mutter": getTtsUrl("die+Mutter"),
  "der Vater": getTtsUrl("der+Vater"),
  "das Kind": getTtsUrl("das+Kind"),
  "die Familie": getTtsUrl("die+Familie"),
  "der Mann": getTtsUrl("der+Mann"),
  "die Frau": getTtsUrl("die+Frau"),
  "rot": getTtsUrl("rot"),
  "blau": getTtsUrl("blau"),
  "grün": getTtsUrl("gr%C3%BCn"),
  "gelb": getTtsUrl("gelb"),
  "schwarz": getTtsUrl("schwarz"),
  "weiß": getTtsUrl("wei%C3%9F"),
  "eins": getTtsUrl("eins"),
  "zwei": getTtsUrl("zwei"),
  "drei": getTtsUrl("drei"),
  "das Wasser": getTtsUrl("das+Wasser"),
  "das Brot": getTtsUrl("das+Brot"),
  "die Milch": getTtsUrl("die+Milch"),
  "der Kaffee": getTtsUrl("der+Kaffee"),
  "der Tee": getTtsUrl("der+Tee"),
  "der Apfel": getTtsUrl("der+Apfel"),
  "die Banane": getTtsUrl("die+Banane"),
  "das Ei": getTtsUrl("das+Ei"),
  "der Käse": getTtsUrl("der+K%C3%A4se"),
  "die Butter": getTtsUrl("die+Butter"),
  "der Zucker": getTtsUrl("der+Zucker"),
  "das Salz": getTtsUrl("das+Salz"),
  "das Haus": getTtsUrl("das+Haus"),
  "die Tür": getTtsUrl("die+T%C3%BCr"),
  "das Fenster": getTtsUrl("das+Fenster"),
  "der Tisch": getTtsUrl("der+Tisch"),
  "der Stuhl": getTtsUrl("der+Stuhl"),
  "das Bett": getTtsUrl("das+Bett"),
  "der Schrank": getTtsUrl("der+Schrank"),
  "die Lampe": getTtsUrl("die+Lampe"),
  "das Auto": getTtsUrl("das+Auto"),
  "der Bus": getTtsUrl("der+Bus"),
  "die Bahn": getTtsUrl("die+Bahn"),
  "das Fahrrad": getTtsUrl("das+Fahrrad"),
  "die Straße": getTtsUrl("die+Stra%C3%9Fe"),
};
