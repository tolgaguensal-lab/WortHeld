"use client";

let synth: SpeechSynthesis | null = null;

function getSynth(): SpeechSynthesis | null {
  if (typeof window === "undefined") return null;
  if (!synth) synth = window.speechSynthesis;
  return synth;
}

export function speak(text: string, lang = "de-DE"): void {
  const s = getSynth();
  if (!s) return;
  s.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.9;
  s.speak(utterance);
}

export function stopSpeaking(): void {
  getSynth()?.cancel();
}

export function isSpeaking(): boolean {
  return getSynth()?.speaking ?? false;
}

export function getAvailableVoices(): string[] {
  const s = getSynth();
  if (!s) return [];
  return s.getVoices().filter((v) => v.lang.startsWith("de")).map((v) => v.name);
}
