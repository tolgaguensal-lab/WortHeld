import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const specPath = path.join(process.cwd(), "src", "lib", "api", "openapi.json");
    const spec = JSON.parse(fs.readFileSync(specPath, "utf-8"));
    return NextResponse.json(spec);
  } catch {
    return NextResponse.json(
      { error: "OpenAPI-Spec nicht verfügbar", code: "INTERNAL_ERROR" },
      { status: 500 },
    );
  }
}
