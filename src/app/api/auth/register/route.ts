import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { registerSchema, validate, handleValidation, parseBody } from "@/lib/validation";
import { createRateLimiter } from "@/lib/api/rate-limiter";

const registerLimiter = createRateLimiter(5, 60000); // 5 Versuche pro Minute pro IP

export async function POST(req: Request) {
  return handleValidation(async () => {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || req.headers.get("x-real-ip")
      || "unknown";
    if (!registerLimiter(`register:${ip}`)) {
      return NextResponse.json({ error: "Zu viele Anfragen. Bitte warte eine Minute." }, { status: 429 });
    }

    const body = await parseBody(req);
    const { name, email, password } = validate(registerSchema, body);

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return NextResponse.json({ error: "E-Mail bereits registriert" }, { status: 409 });

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { email, name, hashedPassword, profile: { create: {} } },
    });
    return NextResponse.json({ success: true, userId: user.id });
  });
}
