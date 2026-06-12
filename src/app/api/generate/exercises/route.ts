import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ generated: 0, exercises: [] });
}
