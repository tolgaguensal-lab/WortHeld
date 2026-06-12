import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  if (!email || !password || !name) return NextResponse.json({ error: "Pflichtfelder fehlen" }, { status: 400 });

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return NextResponse.json({ error: "E-Mail bereits registriert" }, { status: 409 });

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { email, name, hashedPassword, profile: { create: {} } },
  });
  return NextResponse.json({ success: true, userId: user.id });
}
