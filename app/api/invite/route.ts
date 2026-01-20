import { NextResponse } from "next/server";
import { getInviteByNames } from "@/lib/db-json";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const bride = searchParams.get("bride");
  const groom = searchParams.get("groom");

  if (!bride || !groom) {
    return NextResponse.json(
      { error: "Missing bride or groom parameters" },
      { status: 400 },
    );
  }

  try {
    const invite = await getInviteByNames(bride, groom);

    if (!invite) {
      return NextResponse.json(
        { error: "Invitation not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(invite);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
