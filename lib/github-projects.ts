import matter from "gray-matter";
import { readFile } from "fs/promises";
import path from "path";
import type { Project, RelatedProject } from "@/types/projects";
import {
  GITHUB_PROJECT_SOURCES,
  type GitHubProjectSource,
} from "@/lib/github-projects-config";

const REVALIDATE_SECONDS = 3600;

interface GitHubContentItem {
  name: string;
  path: string;
  type: "file" | "dir";
}

type ProjectCategory = Project["category"];

function githubHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

async function fetchGitHub(url: string): Promise<Response> {
  return fetch(url, {
    headers: githubHeaders(),
    next: { revalidate: REVALIDATE_SECONDS },
  });
}

async function fetchRaw(url: string): Promise<string | null> {
  const response = await fetch(url, {
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    return null;
  }

  return response.text();
}

function repoSlug(repo: string): string {
  return repo.toLowerCase();
}

function formatFolderName(name: string): string {
  return name
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function parseTitleFromReadme(body: string, fallback: string): string {
  const match = body.match(/^#\s+(.+)$/m);
  if (match) {
    const raw = match[1].trim();
    const emDashParts = raw.split(/\s+[—–]\s+/);
    if (emDashParts.length > 1) {
      return emDashParts[emDashParts.length - 1].trim();
    }
    return raw;
  }

  return formatFolderName(fallback);
}

function parseFirstParagraph(body: string): string {
  const lines = body.split("\n");
  const paragraph: string[] = [];

  for (const line of lines) {
    if (line.startsWith("#")) {
      if (paragraph.length > 0) {
        break;
      }
      continue;
    }

    if (!line.trim()) {
      if (paragraph.length > 0) {
        break;
      }
      continue;
    }

    if (line.startsWith("```")) {
      break;
    }

    paragraph.push(line.trim());
  }

  return paragraph.join(" ").trim();
}

function parseStackFromReadme(body: string): string[] {
  const stackMatch = body.match(/^## Stack\s*\n([\s\S]*?)(?=\n## |\n# |\s*$)/im);
  if (!stackMatch) {
    return [];
  }

  const stack: string[] = [];

  for (const line of stackMatch[1].split("\n")) {
    const bullet = line.match(/^[-*]\s+\*?\*?([^*\n]+)/);
    if (bullet) {
      stack.push(bullet[1].trim().replace(/\*\*/g, ""));
    }
  }

  return stack;
}

function parseRootReadmeSummary(
  rootReadme: string,
  folderName: string,
): { title?: string; summary?: string } | null {
  const patterns = [
    new RegExp(
      `###\\s+\\[([^\\]]+)\\]\\(\\./${folderName}/?\\)\\s*\\n+([^#]+)`,
      "i",
    ),
    new RegExp(
      `###\\s+\\[([^\\]]+)\\]\\(${folderName}/?\\)\\s*\\n+([^#]+)`,
      "i",
    ),
  ];

  for (const pattern of patterns) {
    const match = rootReadme.match(pattern);
    if (match) {
      return {
        title: match[1].trim(),
        summary: match[2].trim().split("\n").find(Boolean)?.trim(),
      };
    }
  }

  return null;
}

type ProjectFrontmatter = {
  id?: string;
  title?: string;
  subtext?: string;
  date?: string;
  devNotes?: string;
  liveUrl?: string;
  images?: unknown;
  tags?: unknown;
  contribution?: string;
  extent?: unknown;
  stack?: unknown;
  category?: string;
  order?: number;
  portfolioMode?: "metadata-only" | "summary" | "summary-collapsible";
  detailsCollapsed?: boolean;
  relatedProjects?: unknown;
  github?: string;
  contributedTo?: string;
};

const DEFAULT_FOLDER_ORDER: Record<string, number> = {
  odot: 1,
  "op-exence": 2,
  "s-c-s": 3,
  "s-s-generator": 4,
  "m-search": 5,
  "rate-limiter": 6,
  "nihon-main": 1,
  "Conrad-reader": 2,
  "key-warriors": 3,
  gogen: 1,
  "kana-dojo": 2,
  "centralized-logger-web": 3,
  "response-helper": 4,
};

const DEFAULT_STACK_BY_REPO: Record<string, string> = {
  rust: "Rust",
  typescript: "TypeScript",
  tauri: "Tauri",
  flutter: "Flutter",
  opensource: "Open Source",
};

function extractMarkdownSection(body: string, sectionName: string): string | null {
  const sections = body.split(/\n(?=## [^#\s])/);

  for (const section of sections) {
    const headingMatch = section.match(/^## ([^\n]+)\n([\s\S]*)$/);
    if (!headingMatch) {
      continue;
    }

    if (headingMatch[1].trim().toLowerCase() === sectionName.toLowerCase()) {
      return headingMatch[2].trim();
    }
  }

  return null;
}

const PORTFOLIO_SKIM_SECTIONS = ["Usage", "Quick start", "Library"] as const;

const TECHNICAL_SECTION_NAMES = [
  "Development",
  "Setup",
  "Dev",
  "Other",
  "Tests",
  "Test",
  "Stack",
  "Content layout",
  "API",
  "Publishing",
  "Non-goals",
  "License",
] as const;

function extractTechnicalDetails(body: string): string | null {
  const sections = body.split(/\n(?=## [^#\s])/);
  const technicalParts: string[] = [];

  for (const section of sections) {
    const headingMatch = section.match(/^## ([^\n]+)\n([\s\S]*)$/);
    if (!headingMatch) {
      continue;
    }

    const heading = headingMatch[1].trim();
    const isTechnical = TECHNICAL_SECTION_NAMES.some(
      (name) => name.toLowerCase() === heading.toLowerCase(),
    );

    if (isTechnical) {
      technicalParts.push(`## ${heading}\n\n${headingMatch[2].trim()}`);
    }
  }

  return technicalParts.length > 0 ? technicalParts.join("\n\n") : null;
}

function buildPortfolioDescription(
  body: string,
  portfolioSection: string | null,
): string {
  const parts: string[] = [];

  if (portfolioSection) {
    parts.push(portfolioSection);
  }

  for (const sectionName of PORTFOLIO_SKIM_SECTIONS) {
    const section = extractMarkdownSection(body, sectionName);
    if (section) {
      parts.push(`### ${sectionName}\n\n${section}`);
    }
  }

  if (parts.length > 0) {
    return parts.join("\n\n");
  }

  return parseFirstParagraph(body);
}

function parsePortfolioContent(
  body: string,
  frontmatter: ProjectFrontmatter,
): { description: string; technicalDetails?: string } {
  const portfolioMode = frontmatter.portfolioMode ?? "summary";
  const portfolioSection = extractMarkdownSection(body, "Portfolio");
  const technicalDetails = extractTechnicalDetails(body) ?? undefined;

  if (portfolioMode === "metadata-only") {
    return {
      description: portfolioSection ?? parseFirstParagraph(body),
      technicalDetails: undefined,
    };
  }

  const description = buildPortfolioDescription(body, portfolioSection);

  return {
    description,
    technicalDetails:
      portfolioMode === "summary-collapsible" ? technicalDetails : undefined,
  };
}

async function readLocalReadme(
  repo: string,
  folderName: string,
): Promise<string | null> {
  const localRoot = process.env.GITHUB_LOCAL_REPOS_PATH;
  if (!localRoot || process.env.NODE_ENV !== "development") {
    return null;
  }

  const candidates = [
    path.join(localRoot, repo, folderName, "README.md"),
    path.join(localRoot, repo.toLowerCase(), folderName, "README.md"),
    path.join(localRoot, repo.charAt(0).toUpperCase() + repo.slice(1).toLowerCase(), folderName, "README.md"),
  ];

  for (const readmePath of candidates) {
    try {
      return await readFile(readmePath, "utf-8");
    } catch {
      continue;
    }
  }

  return null;
}

function parseFrontmatter(data: Record<string, unknown>): ProjectFrontmatter {
  return data as ProjectFrontmatter;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}

function asCategory(value: unknown): ProjectCategory {
  const categories: ProjectCategory[] = [
    "Personal",
    "Commercial",
    "Freelance",
    "Professional",
  ];

  if (typeof value === "string" && categories.includes(value as ProjectCategory)) {
    return value as ProjectCategory;
  }

  return "Personal";
}

function asRelatedProjects(value: unknown): RelatedProject[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item) => {
    if (!item || typeof item !== "object") {
      return [];
    }

    const record = item as Record<string, unknown>;
    const id = record.id;
    const label = record.label;
    const role = record.role;

    if (typeof id !== "string" || typeof label !== "string") {
      return [];
    }

    const related: RelatedProject = { id, label };

    if (role === "frontend" || role === "backend") {
      related.role = role;
    }

    return [related];
  });
}

async function getLastCommitDate(
  owner: string,
  repo: string,
  path: string,
  branch: string,
): Promise<string> {
  try {
    const response = await fetchGitHub(
      `https://api.github.com/repos/${owner}/${repo}/commits?path=${encodeURIComponent(path)}&sha=${branch}&per_page=1`,
    );

    if (!response.ok) {
      return new Date().getFullYear().toString();
    }

    const commits = await response.json();
    const date = commits[0]?.commit?.author?.date;

    if (!date) {
      return new Date().getFullYear().toString();
    }

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  } catch {
    return new Date().getFullYear().toString();
  }
}

async function fetchRepoProjects(
  source: GitHubProjectSource,
): Promise<Project[]> {
  const { owner, repo, branch } = source;
  const slug = repoSlug(repo);

  const contentsResponse = await fetchGitHub(
    `https://api.github.com/repos/${owner}/${repo}/contents?ref=${branch}`,
  );

  if (!contentsResponse.ok) {
    console.error(
      `Failed to fetch ${owner}/${repo} contents:`,
      contentsResponse.status,
    );
    return [];
  }

  const contents = (await contentsResponse.json()) as GitHubContentItem[];
  const folders = contents.filter(
    (item) => item.type === "dir" && !item.name.startsWith("."),
  );

  const rootReadme =
    (await fetchRaw(
      `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/README.md`,
    )) ?? "";

  const projects = await Promise.all(
    folders.map(async (folder) => {
      const readmeContent =
        (await readLocalReadme(repo, folder.name)) ??
        (await fetchRaw(
          `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${folder.name}/README.md`,
        )) ??
        "";

      const { data, content: body } = readmeContent
        ? matter(readmeContent)
        : { data: {}, content: "" };
      const frontmatter = parseFrontmatter(data);

      const rootSummary = rootReadme
        ? parseRootReadmeSummary(rootReadme, folder.name)
        : null;

      const title =
        frontmatter.title ||
        (body ? parseTitleFromReadme(body, folder.name) : undefined) ||
        rootSummary?.title ||
        formatFolderName(folder.name);

      const subtext =
        frontmatter.subtext ||
        (body ? parseFirstParagraph(body) : undefined) ||
        rootSummary?.summary ||
        title;

      const { description, technicalDetails } = parsePortfolioContent(
        body,
        frontmatter,
      );

      const stack = asStringArray(frontmatter.stack);
      const parsedStack = stack.length > 0 ? stack : parseStackFromReadme(body);
      const date =
        frontmatter.date ||
        (await getLastCommitDate(owner, repo, folder.path, branch));

      const id = frontmatter.id || `${slug}--${folder.name}`;
      const order =
        frontmatter.order ?? DEFAULT_FOLDER_ORDER[folder.name] ?? 999;

      return {
        id,
        title,
        subtext,
        date,
        description: description || rootSummary?.summary || "",
        technicalDetails,
        detailsCollapsed:
          frontmatter.detailsCollapsed ??
          frontmatter.portfolioMode === "summary-collapsible",
        portfolioMode: frontmatter.portfolioMode ?? "summary",
        order,
        markdown: true,
        devNotes: frontmatter.devNotes,
        github:
          typeof frontmatter.github === "string"
            ? frontmatter.github
            : `https://github.com/${owner}/${repo}/tree/${branch}/${folder.name}`,
        liveUrl: frontmatter.liveUrl,
        images: asStringArray(frontmatter.images),
        tags: asStringArray(frontmatter.tags),
        contribution: frontmatter.contribution || "Solo Developer",
        extent: asStringArray(frontmatter.extent).length
          ? asStringArray(frontmatter.extent)
          : slug === "opensource"
            ? ["Contribute"]
            : ["Develop"],
        stack:
          parsedStack.length > 0
            ? parsedStack
            : [DEFAULT_STACK_BY_REPO[slug] ?? "TypeScript"],
        category: asCategory(frontmatter.category),
        group: slug,
        relatedProjects: asRelatedProjects(frontmatter.relatedProjects),
        contributedTo:
          typeof frontmatter.contributedTo === "string"
            ? frontmatter.contributedTo
            : undefined,
      } satisfies Project;
    }),
  );

  return projects.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

export async function fetchGitHubProjects(): Promise<Project[]> {
  const results = await Promise.all(
    GITHUB_PROJECT_SOURCES.map((source) => fetchRepoProjects(source)),
  );

  return results.flat();
}
