import { NextRequest, NextResponse } from "next/server";
import { withApiKey } from "@/lib/api";
import { errorResponse } from "@/lib/api/api-errors";

async function translate(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("text");
  const from = searchParams.get("from") || "de";
  const to = searchParams.get("to") || "en";

  if (!text) return errorResponse(400, "VALIDATION_ERROR", "text parameter erforderlich");

  const libreUrl = process.env.LIBRETRANSLATE_URL || "http://libretranslate:5000";

  try {
    const res = await fetch(`${libreUrl}/translate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q: text, source: from, target: to }),
    });

    if (!res.ok) {
      // Fallback: Mock-Übersetzung
      return NextResponse.json({ translatedText: `[${to}] ${text}`, source: from, target: to, provider: "mock" });
    }

    const data = await res.json();
    return NextResponse.json({ translatedText: data.translatedText, source: from, target: to, provider: "libretranslate" });
  } catch {
    return NextResponse.json({ translatedText: `[${to}] ${text}`, source: from, target: to, provider: "mock" });
  }
}

export const GET = withApiKey(translate, "read:translate");
