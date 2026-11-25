export const GITHUB_PROJECT_SOURCES = [
  { owner: "Zouziszzm", repo: "Rust", branch: "main" },
  { owner: "Zouziszzm", repo: "TypeScript", branch: "main" },
] as const;

export type GitHubProjectSource = (typeof GITHUB_PROJECT_SOURCES)[number];
