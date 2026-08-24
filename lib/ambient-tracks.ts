export const AMBIENT_TRACKS = [
  "/audio/alex-morgan-calm-piano-541028.mp3",
  "/audio/leberch-peaceful-piano-576857.mp3",
] as const;

/** Web Audio gain — keep very low; phone volume still affects output. */
export const AMBIENT_VOLUME = 0.04;

export function pickAmbientTrack(previous?: string) {
  let next =
    AMBIENT_TRACKS[Math.floor(Math.random() * AMBIENT_TRACKS.length)];

  while (previous && next === previous) {
    next =
      AMBIENT_TRACKS[Math.floor(Math.random() * AMBIENT_TRACKS.length)];
  }

  return next;
}
