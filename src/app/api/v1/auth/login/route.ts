import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withApiKey } from "@/lib/api";
import { errorResponse } from "@/lib/api/api-errors";
import bcrypt from "bcryptjs";

async function loginUser(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { email, password } = body;

  if (!email || !password) {
    return errorResponse(400, "VALIDATION_ERROR", "email und password sind erforderlich");
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, name: true, hashedPassword: true },
  });

  if (!user || !user.hashedPassword) {
    return errorResponse(401, "INVALID_KEY", "Falsche Anmeldedaten");
  }

  const valid = await bcrypt.compare(password, user.hashedPassword);
  if (!valid) {
    return errorResponse(401, "INVALID_KEY", "Falsche Anmeldedaten");
  }

  return NextResponse.json({
    success: true,
    user: { id: user.id, name: user.name, email: user.email },
  });
}

export const POST = withApiKey(loginUser, "write:user");
