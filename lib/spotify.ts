const TOKEN_URL = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_URL =
  "https://api.spotify.com/v1/me/player/currently-playing";

export type NowPlaying = {
  isPlaying: boolean;
  title: string;
  artist: string;
  songUrl: string;
  albumImageUrl?: string;
};

export async function getSpotifyAccessToken(): Promise<string | null> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) return null;

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64",
  );

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${credentials}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  if (!res.ok) return null;

  const data = (await res.json()) as { access_token?: string };
  return data.access_token ?? null;
}

export async function getNowPlaying(): Promise<NowPlaying> {
  const token = await getSpotifyAccessToken();
  if (!token) return { isPlaying: false, title: "", artist: "", songUrl: "" };

  const res = await fetch(NOW_PLAYING_URL, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (res.status === 204 || !res.ok) {
    return { isPlaying: false, title: "", artist: "", songUrl: "" };
  }

  const data = await res.json();

  if (!data?.item) {
    return { isPlaying: false, title: "", artist: "", songUrl: "" };
  }

  const track = data.item;
  const artist = track.artists?.map((a: { name: string }) => a.name).join(", ");

  return {
    isPlaying: Boolean(data.is_playing),
    title: track.name ?? "",
    artist: artist ?? "",
    songUrl: track.external_urls?.spotify ?? "",
    albumImageUrl: track.album?.images?.[0]?.url,
  };
}
