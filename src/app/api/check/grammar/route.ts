import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { text } = await req.json();
  const url = `${process.env.LANGUAGE_TOOL_API_URL ?? "https://api.languagetool.org"}/v2/check`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `text=${encodeURIComponent(text)}&language=de-DE`,
    });
    if (!res.ok) return NextResponse.json({ matches: [] });
    const data = await res.json();
    return NextResponse.json({
      matches: (data?.matches ?? []).map((m: any) => ({
        message: m.message,
        offset: m.offset,
        length: m.length,
        suggestions: (m.replacements ?? []).slice(0, 3).map((r: any) => r.value),
        rule: m.rule?.id,
      })),
    });
  } catch {
    return NextResponse.json({ matches: [] });
  }
}
