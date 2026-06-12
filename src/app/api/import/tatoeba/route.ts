import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Nicht authentifiziert" }, { status: 401 });
  const { query, level } = await req.json();
  try {
    const res = await fetch(`${process.env.TATOEBA_API_URL ?? "https://tatoeba.org/api"}/sentences/search?query=${encodeURIComponent(query)}&language=deu&limit=10`);
    if (!res.ok) return NextResponse.json({ imported: 0 });
    const data = await res.json();
    const sentences = (data?.results ?? []).map((r: any) => ({
      text: r.text ?? "",
      translationEn: r.translations?.[0]?.text ?? "",
      level: level ?? "A1",
      sourceName: "Tatoeba",
      sourceUrl: `https://tatoeba.org/sentences/show/${r.id}`,
      license: "CC BY 2.0 FR",
      attribution: "Tatoeba Project",
      reviewedByAdmin: false,
      isPublished: false,
    }));
    if (sentences.length > 0) {
      await prisma.sentence.createMany({ data: sentences });
    }
    return NextResponse.json({ imported: sentences.length, sentences });
  } catch {
    return NextResponse.json({ imported: 0 });
  }
}
