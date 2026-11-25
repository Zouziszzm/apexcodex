import type { Locale } from "@/app/contexts/LocaleContext";

/**
 * Note: All Japanese (`jp`) doodle annotations intentionally use ONLY
 * Hiragana and Katakana (zero Kanji) so they remain airy and legible
 * in the handwritten Yomogi font at smaller sizes.
 */

export const NAME_HINTS: Record<Locale, string[]> = {
  en: [
    "hey, that's my name — if it's a mouthful, just Farhaan works",
    "yes, it's 13 letters long — just Farhaan works fine",
    "sounds like an anime incantation, but Farhaan works",
    "my friends just call me Farhaan",
  ],
  jp: [
    "ながい なまえ だけど「ファルハーン」で だいじょうぶ です",
    "ちょっと ながい ので、ファルハーン と よんでね",
    "じゅもん みたい な ひびき だけど、ファルハーン で どうぞ",
    "ともだち からは ファルハーン と よばれて います",
  ],
};

export const LOCALE_HINTS: Record<Locale, string[]> = {
  en: [
    "site speaks japanese too",
    "tap for nihongo",
    "flip to japanese?",
  ],
  jp: [
    "えいご に きりかえ",
    "タップ して えいご へ",
    "えいご で みる？",
  ],
};

export const VOXEL_HINTS: Record<Locale, string[]> = {
  en: [
    "psst — drag to spin!",
    "interactive! give it a spin",
    "drag around to look closer",
  ],
  jp: [
    "ドラッグ して くるくる まわせるよ",
    "マウス で ぐるっと まわしてみて",
    "ひっぱって うごかせるよ",
  ],
};

export const EXPERIENCE_HINTS: Record<Locale, string[]> = {
  en: [
    "earlier chapters live here",
    "tap to peek at earlier roles",
  ],
  jp: [
    "かこ の けいれき は こちら",
    "タップ して まえ の しごと を みる",
  ],
};

export const PROJECTS_HINTS: Record<Locale, string[]> = {
  en: [
    "click a folder to unfold",
    "tap any group to peek inside",
  ],
  jp: [
    "タップ して なか を のぞいてみて",
    "クリック で リスト が ひらきます",
  ],
};

export const subscribeNoop = () => () => {};

function createSessionRandomIndex(length: number) {
  let cached: number | null = null;
  return function getSnapshot(): number {
    if (typeof window === "undefined") return 0;
    if (cached === null) {
      cached = Math.floor(Math.random() * length);
    }
    return cached;
  };
}

export const getSessionNameIdx = createSessionRandomIndex(NAME_HINTS.en.length);
export const getSessionLocaleIdx = createSessionRandomIndex(LOCALE_HINTS.en.length);
export const getSessionVoxelIdx = createSessionRandomIndex(VOXEL_HINTS.en.length);
export const getSessionExpIdx = createSessionRandomIndex(EXPERIENCE_HINTS.en.length);
export const getSessionProjectsIdx = createSessionRandomIndex(PROJECTS_HINTS.en.length);
