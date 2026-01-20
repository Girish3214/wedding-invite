import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data/ganesha_segments.json");
    const data = await fs.readFile(filePath, "utf8");
    const segments = JSON.parse(data);
    return NextResponse.json(segments);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to load segments" },
      { status: 500 },
    );
  }
}
