import { Project } from "@/types/projects";

export const projects: Project[] = [
  {
    id: "ginink",
    title: "Ginink",
    subtext:
      "An indie studio and product lab — crafting thoughtful digital experiences from the ground up.",
    date: "2026",
    description:
      "Ginink is my personal indie venture — a space to explore ideas freely, ship small products with care, and build the kind of software I wish existed. From interaction design to full-stack implementation, every project here is driven by curiosity, craft, and the freedom that comes with working independently.",
    devNotes:
      "A living lab for side projects, experiments, and products built outside the constraints of client work.",
    github: undefined,
    liveUrl: "https://ginink-web.vercel.app",
    images: [],
    tags: ["Indie", "Product", "Design"],
    contribution: "Founder & Solo Developer",
    extent: ["Design", "Develop"],
    stack: ["Next.js", "TypeScript", "React", "Tauri"],
    category: "Personal",
  },
  {
    id: "ecocrew",
    title: "Ecocrew",
    subtext:
      "A sustainable waste management platform focused on incentivizing recycling through digital rewards.",
    date: "Feb 2025",
    description:
      "A key contributor to the Ecocrew platform, a high-impact sustainability initiative in Bangalore. I worked on bridging the gap between waste generators and recyclers by developing robust mobile applications (Android & iOS) and a clean web interface. My focus was on implementing the doorstep pickup scheduling logic, real-time rate tracking for recyclables, and a unique 'Eco-Coins' reward system that gamifies environmental responsibility.",
    devNotes:
      "I do not own any right to this application / software but i have worked in making this.",
    github: undefined,
    liveUrl: "https://www.ecocrew.in/",
    images: [],
    tags: ["Android", "iOS", "Web", "Sustainability"],
    contribution: "Mobile Developer & Sr. Frontend Developer",
    extent: ["Android", "iOS", "Web"],
    stack: ["React Native", "Xcode", "Next.js", "Node.js"],
    category: "Professional",
  },
  {
    id: "keys-on-rent",
    title: "KeysOnRent",
    subtext:
      "A comprehensive property rental platform simplifying the connection between landlords and tenants in Bangalore.",
    date: "April 2025",
    description:
      "Collaborated with Rental Arrow Private Limited to build KeysOnRent, a modern rental ecosystem. I was responsible for the core mobile app development (Android & iOS) and crafting high-conversion web platforms for their aggregator marketing platform. The project involved building complex features like property browsing with advanced filtering, integrated viewing schedulers, and a secure landlord dashboard for maintenance and rent tracking.",
    devNotes:
      "I do not own any right to this application / software but i have worked in making this.",
    github: undefined,
    liveUrl: "https://www.keysonrent.com/",
    images: [],
    tags: ["Android", "iOS", "Web", "Real Estate"],
    contribution: "Mobile Developer & Sr. Frontend Developer",
    extent: ["Android", "iOS", "Web"],
    stack: ["React Native", "Xcode", "Next.js", "Node.js"],
    category: "Professional",
  },
  {
    id: "texas-gold-bureau",
    title: "Texas Gold Bureau",
    subtext:
      "A high-fidelity e-commerce application for precious metals, featuring real-time spot pricing and secure physical asset acquisition.",
    date: "May 2025",
    description:
      "Built the application for Texas Gold Bureau, an educational and e-commerce hub for precious metals. I implemented real-time market data integration for gold, silver, and platinum spot prices, along with secure transaction flows for physical asset purchasing and investment planning.",
    devNotes:
      "I do not own any right to this application / software but i have worked in making this.",
    github: undefined,
    liveUrl: "https://txgoldbureau.com/",
    images: [],
    tags: ["E-commerce", "FinTech", "Web"],
    contribution: "Software Engineer (Professional)",
    extent: ["Web Development", "API Integration"],
    stack: ["Next.js", "Tailwind CSS", "Market Data APIs"],
    category: "Professional",
  },
  {
    id: "sell-your-legacy",
    title: "Sell Your Legacy",
    subtext:
      "A premium business M&A and advisory platform facilitating high-value deal origination and investor matchmaking.",
    date: "August 2025",
    description:
      "Developed the web platform for Sell Your Legacy, a sophisticated deal origination and advisory service. The platform connects entrepreneurs with strategic investors, featuring secure deal rooms, business listing management, and confidential advisory workflows for mergers and acquisitions.",
    devNotes:
      "I do not own any right to this application / software but i have worked in making this.",
    github: undefined,
    liveUrl: "https://www.sellyourlegacy.com/",
    images: [],
    tags: ["M&A", "Business Advisory", "Web App"],
    contribution: "Web Developer (Professional)",
    extent: ["Web Development", "Backend Services"],
    stack: ["Next.js", "Tailwind CSS", "Node.js"],
    category: "Professional",
  },
  {
    id: "voxel-chunks",
    title: "Voxel Construct",
    subtext:
      "An experimental world-building engine focused on high-performance voxel rendering.",
    date: "Jan 2024",
    description:
      "A deep dive into the world of 3D web engineering, born from a fascination with how complex forms can breathe life into a browser canvas. This project represents a pivotal learning phase during my time at MetaLine-X, where I explored the intersection of Web3 and immersive visuals.",
    github: "https://github.com/Zouziszzm/Voxel-Construct",
    devNotes:
      "Inspired by craftzdog's voxel aesthetic. Mastered texture baking and Three.js optimization while exploring the potential of 3D in the Web3 space at MetaLine X. A technical playground for high-performance rendering.",
    images: ["/assets/Voxel.png", "/assets/Voxel2.png"],
    tags: ["Design", "Voxel Art", "3D"],
    contribution: "Voxel Designer",
    extent: ["Design"],
    stack: ["Voxel Rendering", "C#"],
    category: "Personal",
  },
  {
    id: "hammered-oath",
    title: "Hammered Oath",
    subtext:
      "An energetic 2D platformer that marks my very first leap into the world of game development.",
    date: "Dec 2021",
    description:
      "A vibrant 2D platformer born from college ambition and the pure thrill of building my first playable world. This was the project where I first fell in love with code—wrestling with Unity physics and C# scripts to bring my creative ideas to life. It’s a fun, heart-filled milestone that represents the exact moment I realized I wanted to build experiences for a living.",
    github: "https://github.com/Zouziszzm/Hammered-Oath",
    devNotes:
      "The first code I ever felt proud of. Features custom physics that occasionally fought back and parallax systems fueled by college ambition and late-night curiosity. A digital relic of where it all began.",
    images: ["/assets/hammeredOath.png"],
    tags: ["Desktop", "Game Design", "Unity 3D"],
    contribution: "Solo Game Designer & Developer",
    extent: ["Design", "Develop"],
    stack: ["Unity 3D", "C#"],
    category: "Personal",
  },
];
