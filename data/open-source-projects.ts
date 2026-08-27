import type { Project } from "@/types/projects";

export const openSourceProjects: Project[] = [
  {
    id: "opensource--gogen",
    title: "Gogen",
    subtext:
      "Go CRUD generator CLI for Fiber & Gin — maintainer & co-author on TUI, naming, and docs.",
    date: "2025",
    description: `**[Gogen](https://github.com/gogen-cli/gogen)** is a CLI that generates complete CRUD resources for **Go Fiber** and **Gin** — controllers, services, repositories, and routes in one command. I'm a **maintainer and co-author** on the project.

My contributions focused on developer experience at the terminal: a **premium TUI overhaul** with bordered reports, animated spinners, and an interactive wizard (\`gogen resource\` with no args). I also drove **standardized camelCase naming** — kebab-case inputs like \`user-order\` map to idiomatic \`PascalCase\` / \`camelCase\` across generated files.

On the docs side, I enhanced the **contributing guide** with a detailed workflow, PR conventions, and clearer onboarding ([#28](https://github.com/gogen-cli/gogen/pull/28)).

### Usage

\`\`\`bash
go install github.com/zaheershaikh936/gogen@latest
gogen resource user
gogen resource product --output ./api
\`\`\``,
    github: "https://github.com/gogen-cli/gogen",
    contributedTo: "gogen-cli/gogen",
    images: [],
    tags: ["Open Source", "Go", "CLI"],
    contribution: "Maintainer & Co-author",
    extent: ["Contribute"],
    stack: ["Go", "Fiber", "Gin", "CLI"],
    category: "Personal",
    group: "opensource",
    order: 1,
    markdown: true,
    portfolioMode: "summary",
  },
  {
    id: "opensource--kana-dojo",
    title: "KanaDojo",
    subtext:
      "Open-source Japanese learning platform — themes, kanji data, quotes, and cultural facts.",
    date: "2026",
    description: `**[KanaDojo](https://github.com/lingdojo/kana-dojo)** (かな道場) is an aesthetic, minimalist Japanese learning platform inspired by Duolingo and Monkeytype — 3k+ GitHub stars, sponsored by Vercel. Hiragana, katakana, kanji, and vocabulary across multiple game modes and 100+ themes.

I've contributed content and UI polish across several areas:

- **Kanji & quotes** — expanded kanji meaning data and quote content for study modes
- **Themes** — Shaved Ice theme and Volcanic Ash theme ([#611](https://github.com/lingdojo/kana-dojo/pull/611))
- **Cultural facts** — added komorebi fact ([#623](https://github.com/lingdojo/kana-dojo/pull/623))

The codebase is Next.js 15, React 19, TypeScript, Tailwind, and Zustand — beginner-friendly with good-first issues.`,
    github: "https://github.com/lingdojo/kana-dojo",
    contributedTo: "lingdojo/kana-dojo",
    liveUrl: "https://kanadojo.com",
    images: [],
    tags: ["Open Source", "Japanese", "Next.js"],
    contribution: "Contributor",
    extent: ["Contribute"],
    stack: ["Next.js", "TypeScript", "React", "Tailwind CSS"],
    category: "Personal",
    group: "opensource",
    order: 2,
    markdown: true,
    portfolioMode: "summary",
  },
  {
    id: "opensource--centralized-logger-web",
    title: "Centralized Logger Web",
    subtext:
      "Centralized logging web UI — navbar z-index and mobile responsiveness fix.",
    date: "Jul 2026",
    description: `**[centralized-logger-web](https://github.com/planetmoondrop/centralized-logger-web)** is a web front-end for centralized logging. I contributed a UI fix on the \`dev\` branch: **navbar z-index and mobile visibility** — the nav was hidden or buried on small screens, breaking navigation on mobile.

The fix ([#1](https://github.com/planetmoondrop/centralized-logger-web/pull/1)) ensures the navbar stays visible and correctly layered across breakpoints, with responsiveness improvements so the layout works on phone-sized viewports.`,
    github: "https://github.com/planetmoondrop/centralized-logger-web",
    contributedTo: "planetmoondrop/centralized-logger-web",
    images: [],
    tags: ["Open Source", "Next.js"],
    contribution: "Contributor",
    extent: ["Contribute"],
    stack: ["Next.js", "TypeScript", "React"],
    category: "Personal",
    group: "opensource",
    order: 3,
    markdown: true,
    portfolioMode: "summary",
  },
  {
    id: "opensource--response-helper",
    title: "Better Response Helper",
    subtext:
      "npm library for standardized API response shapes — README and response message improvements.",
    date: "2024",
    description: `**[better-response-helper](https://github.com/zaheershaikh936/response-helper)** is a small npm utility that standardizes how client apps parse backend API responses — consistent \`statusCode\`, \`message\`, \`success\`, \`data\`, and error \`description\` fields across every call.

I contributed two areas:

1. **README** — rewrote docs to be clearer for teammates: structured examples with code blocks, success vs failure response shapes, and custom configuration options
2. **\`response-helper.js\`** — standardized server response messages, required API endpoint fields, and optional parameters so responses are predictable and easier to debug on the client

### Usage

\`\`\`bash
npm install better-response-helper
\`\`\`

\`\`\`javascript
const { ResHelper } = require("better-response-helper");

const result = ResHelper({ status: 404 });
\`\`\``,
    technicalDetails: `## Development

\`\`\`bash
git clone https://github.com/zaheershaikh936/response-helper.git
cd response-helper
npm install
\`\`\`

MIT licensed. Published on npm as \`better-response-helper\`.`,
    github: "https://github.com/zaheershaikh936/response-helper",
    contributedTo: "zaheershaikh936/response-helper",
    images: [],
    tags: ["Open Source", "Node.js"],
    contribution: "Contributor",
    extent: ["Contribute"],
    stack: ["Node.js", "JavaScript"],
    category: "Personal",
    group: "opensource",
    order: 4,
    markdown: true,
    portfolioMode: "summary-collapsible",
    detailsCollapsed: true,
  },
];
