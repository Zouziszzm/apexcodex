import { NextResponse } from "next/server";
import { getNowPlaying } from "@/lib/spotify";

export async function GET() {
  try {
    const nowPlaying = await getNowPlaying();
    return NextResponse.json(nowPlaying, {
      headers: {
        "Cache-Control": "public, s-maxage=25, stale-while-revalidate=30",
      },
    });
  } catch {
    return NextResponse.json(
      {
        isPlaying: false,
        title: "",
        artist: "",
        songUrl: "",
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=15, stale-while-revalidate=15",
        },
      },
    );
  }
}
