/**
 * POST /api/check-grammar — Grammatik- & Rechtschreibprüfung per LanguageTool
 * Body: { text: string, language?: string }
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { checkGrammar } from "@/lib/languagetool";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Nicht authentifiziert" }, { status: 401 });
  }

  const { text, language } = await req.json();
  if (!text || typeof text !== "string") {
    return NextResponse.json({ error: "Text erforderlich" }, { status: 400 });
  }

  const result = await checkGrammar(text, language || "de-DE");
  return NextResponse.json(result);
}
