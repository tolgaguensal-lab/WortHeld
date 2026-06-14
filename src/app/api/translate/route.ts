import { NextResponse } from "next/server";
import { translateText, translateBatch, detectLanguage, getSupportedLanguages } from "@/lib/translation";

export async function POST(req: Request) {
  try {
    const { text, texts, sourceLang, targetLang } = await req.json();

    if (texts && Array.isArray(texts)) {
      const results = await translateBatch(texts, sourceLang ?? "de", targetLang);
      return NextResponse.json({ results });
    }

    if (!text) {
      return NextResponse.json({ error: "Text ist erforderlich" }, { status: 400 });
    }

    const translated = await translateText(text, sourceLang ?? "de", targetLang);
    return NextResponse.json({ translatedText: translated });
  } catch (error) {
    console.error("Translation error:", error);
    return NextResponse.json(
      { error: "Übersetzung fehlgeschlagen" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get("action");

  if (action === "languages") {
    const languages = await getSupportedLanguages();
    return NextResponse.json({ languages });
  }

  if (action === "detect") {
    const text = searchParams.get("text");
    if (!text) {
      return NextResponse.json({ error: "Text erforderlich" }, { status: 400 });
    }
    const lang = await detectLanguage(text);
    return NextResponse.json({ language: lang });
  }

  return NextResponse.json({ error: "Unbekannte Aktion" }, { status: 400 });
}
