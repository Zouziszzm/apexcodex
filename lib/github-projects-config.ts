export const GITHUB_PROJECT_SOURCES = [
  { owner: "Zouziszzm", repo: "Rust", branch: "main" },
  // Add more monorepos here, e.g.:
  // { owner: "Zouziszzm", repo: "javascript", branch: "main" },
] as const;

export type GitHubProjectSource = (typeof GITHUB_PROJECT_SOURCES)[number];
