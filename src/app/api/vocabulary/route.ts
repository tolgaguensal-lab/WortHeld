import { authOptions } from "@/lib/auth";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Nicht authentifiziert" }, { status: 401 });
  return NextResponse.json({ vocabulary: [], total: 0 });
}
