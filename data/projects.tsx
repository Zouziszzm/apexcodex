import { Project } from "@/types/projects";

export const manualProjects: Project[] = [
  {
    id: "professional--ecocrew",
    title: "EcoCrew",
    subtext:
      "Core developer across admin dashboard, landing page, and React Native mobile app — led JSX-to-TypeScript & Ant Design-to-Tailwind migration.",
    date: "2025",
    description: `### Overview

**[EcoCrew](https://www.ecocrew.in)** is an Indian sustainability and waste-management platform that makes doorstep scrap collection and recycling structured, transparent, and rewarding for households and businesses.

### My Contribution

Served as a **core developer** across the entire product surface:

- **Admin Panel & Landing Page** — Built and maintained the operations admin dashboard and public landing page.
- **TypeScript & Tailwind Migration** — Led the migration of the web codebase from **JSX + Ant Design** to **strict TypeScript + Tailwind CSS**, establishing a cleaner component architecture.
- **Map & Serviceable Zones** — Built interactive map tooling to define, section, and manage serviceable pickup areas.
- **Mobile App** — Built core UI and functionality in React Native, including the app navigation menu and ongoing bug fixes.

### Architecture

- **Web & Admin Dashboard:** React + Vite, migrated from JSX / Ant Design to **TypeScript** and **Tailwind CSS**.
- **Mobile Application:** **React Native** cross-platform app for Android and iOS.
- **Geospatial Layer:** Interactive map integration for polygon-based serviceable area management and pickup routing.

### Engineering Challenges

- **Serviceable Area Polygon Alignment:** Designing map sections so operations teams could draw and assign serviceable zones that aligned cleanly with real-world boundaries without gaps or overlapping coverage.
- **Zero-Downtime Migration:** Refactoring an active JSX + Ant Design dashboard to TypeScript + Tailwind CSS incrementally while keeping daily operations uninterrupted.

### Results

- **Higher Reliability:** Strict TypeScript types eliminated classes of runtime UI/API bugs and made the codebase significantly easier to upgrade and extend.
- **Faster Operations:** Streamlined serviceable-area configuration directly inside the admin panel.`,
    liveUrl: "https://www.ecocrew.in",
    images: [],
    tags: ["React Native", "TypeScript", "Vite", "Tailwind CSS"],
    contribution: "Core Developer (Mantiqh)",
    extent: ["Admin Panel", "Mobile App", "Maps", "TS Migration"],
    stack: ["React", "React Native", "TypeScript", "Vite", "Tailwind CSS"],
    category: "Professional",
    group: "professional",
    order: 1,
    markdown: true,
    portfolioMode: "summary",
  },
  {
    id: "professional--keysonrent",
    title: "KeysOnRent",
    subtext:
      "Built Next.js locality & map-area search engine and React Native property viewing UI across web and mobile.",
    date: "2025",
    description: `### Overview

**[KeysOnRent](https://www.keysonrent.com)** is an Indian proptech and property management platform that simplifies renting for tenants and landlords across semi-furnished and fully-furnished flats, houses, PGs, and co-living spaces.

### My Contribution

Worked across both the **Next.js web platform** and the **React Native mobile app**:

- **Locality & Map Search Engine** — Owned the search criteria logic allowing users to search by locality and dynamically filter listings by map areas.
- **Mobile Property Viewing UI** — Built the apartment and property detail screens, viewing pane, and resolved cross-device UI bugs in React Native.

### Architecture

- **Web Platform:** **Next.js** with SSR/SEO-friendly property discovery and synchronized locality + map-bounds filter state.
- **Mobile Application:** **React Native** app sharing consistent property presentation and filtering behavior.

### Engineering Challenges

- **Geospatial Proximity & Nearest-Neighbor Search:** Designing search-parameter matching and proximity-based ranking (by locality coordinates, radius, and map bounds) so queries returned accurate nearby properties even when exact-match inventory was sparse.

### Results

- **Unified Discovery:** Consistent locality-aware search and property viewing experience across both Next.js web and React Native mobile.`,
    liveUrl: "https://www.keysonrent.com",
    images: [],
    tags: ["Next.js", "React Native", "TypeScript", "Geospatial Search"],
    contribution: "Software Engineer (Mantiqh)",
    extent: ["Web Search", "Mobile UI", "Algorithms"],
    stack: ["Next.js", "React Native", "TypeScript", "React"],
    category: "Professional",
    group: "professional",
    order: 2,
    markdown: true,
    portfolioMode: "summary",
  },
  {
    id: "professional--weareskky",
    title: "WeAreSkky",
    subtext:
      "Lead developer — built and shipped the full Vite + Three.js site with a custom 3D carousel in 3 days.",
    date: "2025",
    description: `### Overview

**[WeAreSkky](https://www.weareskky.com)** is an e-commerce management and growth acceleration service provider helping brands scale across major online marketplaces through storefront setup, listing optimization, advertising, compliance, and analytics.

### My Contribution

Served as **Lead Developer**, owning the entire frontend build from scratch and shipping the complete production site in **3 days**:

- **End-to-End Site Build** — Architected, styled, and deployed the full multi-section web experience under an accelerated client deadline.
- **Custom Three.js 3D Carousel** — Engineered a smooth, hardware-accelerated carousel component built purely with **Three.js**.

### Architecture

- **Build & Runtime:** **Vite** + **React** + **TypeScript** for rapid iteration and lean production bundling.
- **3D Motion:** Pure **Three.js** rendering pipeline powering the interactive carousel without heavy third-party carousel wrappers.

### Engineering Challenges

- **3-Day Delivery with Custom WebGL:** Balancing a tight 72-hour client deadline with the precision required to keep a pure Three.js carousel responsive, smooth, and artifact-free across viewports.

### Results

- **On-Time Launch:** Delivered the full production website in **3 days** with fluid Three.js carousel interactions.`,
    liveUrl: "https://www.weareskky.com",
    images: [],
    tags: ["Vite", "Three.js", "Lead Dev", "3D Carousel"],
    contribution: "Lead Developer (Mantiqh)",
    extent: ["Full Site", "Three.js 3D", "Architecture"],
    stack: ["Vite", "React", "TypeScript", "Three.js"],
    category: "Professional",
    group: "professional",
    order: 3,
    markdown: true,
    portfolioMode: "summary",
  },
  {
    id: "professional--nextgen-bullion",
    title: "NextGen Bullion",
    subtext:
      "Frontend Lead across 5 Next.js apps (3 storefronts + 2 admin panels) — architected secure precious-metals selling, cart, and checkout flows.",
    date: "2025",
    description: `### Overview

**[NextGen Bullion](https://www.nextgenbullion.com)** is a high-security precious metals e-commerce platform specializing in buying and selling physical gold, silver, platinum, and palladium coins, bars, and rounds.

### My Contribution

Served as **Frontend Lead**, guiding a team of frontend developers across a **5-application ecosystem** (**3 customer-facing sites** and **2 admin panels**):

- **Team & Architecture Leadership** — Led overall frontend development, code reviews, and architectural standards across all 5 Next.js apps.
- **Selling, Cart & Checkout** — Directly engineered the end-to-end selling, cart, and checkout workflows for high-value precious metals orders.
- **Admin Panels** — Built core management interfaces across the two internal admin dashboards.

### Architecture

- **Multi-App Platform:** **Next.js** + **TypeScript** powering **3 storefronts** and **2 admin panels** with shared patterns and strict validation boundaries.
- **Transactional Integrity:** Defensive client/server state synchronization for live bullion pricing, cart totals, selling flows, and checkout steps.

### Engineering Challenges

- **High-Security E-Commerce & Multi-App Coordination:** Designing tamper-resistant selling, cart, and checkout flows for high-value bullion transactions while keeping UI state, security checks, and developer velocity consistent across 5 interconnected apps.

### Results

- **5-App Production Launch:** Shipped **3 storefronts and 2 admin panels** as Frontend Lead with reliable, secure selling and checkout workflows.`,
    liveUrl: "https://www.nextgenbullion.com",
    images: [],
    tags: ["Next.js", "Frontend Lead", "E-Commerce", "Security"],
    contribution: "Frontend Lead (Mantiqh)",
    extent: ["5 Apps", "Cart & Checkout", "Admin Panels"],
    stack: ["Next.js", "React", "TypeScript"],
    category: "Professional",
    group: "professional",
    order: 4,
    markdown: true,
    portfolioMode: "summary",
  },
];
