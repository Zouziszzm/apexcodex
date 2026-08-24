export const SPOTIFY_SCOPES = "user-read-currently-playing";

export function getSpotifyRedirectUri() {
  return (
    process.env.SPOTIFY_REDIRECT_URI ??
    "http://127.0.0.1:3000/api/spotify/callback"
  );
}
