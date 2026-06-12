import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { word } = await req.json();
  try {
    const res = await fetch(`https://en.wiktionary.org/api/rest_v1/page/definition/${encodeURIComponent(word)}`);
    if (!res.ok) return NextResponse.json({ imported: false });
    return NextResponse.json({ imported: true, data: { word } });
  } catch {
    return NextResponse.json({ imported: false });
  }
}
