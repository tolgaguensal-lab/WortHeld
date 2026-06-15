import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withApiKey } from "@/lib/api";
import { errorResponse } from "@/lib/api/api-errors";
import bcrypt from "bcryptjs";

async function registerUser(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { email, password, name } = body;

  if (!email || !password) {
    return errorResponse(400, "VALIDATION_ERROR", "email und password sind erforderlich");
  }
  if (password.length < 6) {
    return errorResponse(400, "VALIDATION_ERROR", "Passwort muss mindestens 6 Zeichen lang sein");
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return errorResponse(400, "VALIDATION_ERROR", "Email bereits registriert");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      name: name || email.split("@")[0],
      hashedPassword,
      profile: { create: { nativeLanguage: "en" } },
    },
  });

  return NextResponse.json({ success: true, userId: user.id }, { status: 201 });
}

export const POST = withApiKey(registerUser, "write:user");
