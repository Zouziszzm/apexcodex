import { NextRequest, NextResponse } from "next/server";
import { getSpotifyRedirectUri } from "@/lib/spotify-config";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const error = request.nextUrl.searchParams.get("error");

  if (error) {
    return new NextResponse(`Spotify authorization failed: ${error}`, {
      status: 400,
    });
  }

  if (!code) {
    return new NextResponse("Missing authorization code.", { status: 400 });
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = getSpotifyRedirectUri();

  if (!clientId || !clientSecret) {
    return new NextResponse("Missing Spotify credentials in .env.local", {
      status: 500,
    });
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64",
  );

  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${credentials}`,
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
  });

  const data = await tokenRes.json();

  if (!tokenRes.ok || !data.refresh_token) {
    return new NextResponse(
      `Token exchange failed: ${JSON.stringify(data, null, 2)}`,
      { status: 500 },
    );
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>Spotify connected</title></head>
<body style="font-family:system-ui,sans-serif;max-width:640px;margin:3rem auto;padding:0 1.5rem;line-height:1.6">
  <h1>Spotify connected</h1>
  <p>Copy this into <code>.env.local</code> as <code>SPOTIFY_REFRESH_TOKEN</code>, then restart <code>pnpm dev</code>:</p>
  <pre style="background:#111;color:#eee;padding:1rem;border-radius:8px;overflow:auto;word-break:break-all">${data.refresh_token}</pre>
  <p>After saving, play something on Spotify and check the Contact section on your site.</p>
</body>
</html>`;

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
