export interface Project {
  id: string;
  title: string;
  tags: string[];
  category: "Personal" | "Commercial" | "Freelance";
  href: string;
  description: string;
  date: string;
  contribution: string;
  extent: string[];
  stack: string[];
  liveUrl?: string;
  iosUrl?: string;
  androidUrl?: string;
}

export const casesData = {
  en: {
    title: "CASES",
    description:
      "A curated collection of my works — the things I've designed, built, and occasionally lost sleep over (in a good way). These are the projects I'm genuinely proud of — the kind that make me say, “yeah, that turned out pretty cool.”",
    filters: ["All", "Web", "Mobile", "Desktop", "Design"],
    projects: [
      {
        id: "1",
        title: "Silver Soul",
        tags: ["Web"],
        category: "Personal",
        href: "#",
        description:
          "Silver Soul is a creative platform where writers and poets publish original work, connect with a like-minded audience, and build visibility through discovery, appreciation, and meaningful community engagement around written expression.",
        date: "2022",
        contribution: "Solo contributor",
        extent: ["Design", "Develop"],
        stack: ["Unity 3D", "C#"],
        liveUrl: "#",
        iosUrl: "#",
        androidUrl: "#",
      },
      {
        id: "2",
        title: "Apex Codex",
        tags: ["Web", "Design"],
        category: "Personal",
        href: "#",
        description:
          "An innovative platform for developers to explore and master complex coding patterns. Features interactive documentation and real-time examples.",
        date: "2023",
        contribution: "Lead Developer",
        extent: ["Design", "Develop"],
        stack: ["Next.js", "Tailwind CSS"],
      },
      {
        id: "3",
        title: "Echo Sphere",
        tags: ["Mobile", "Design"],
        category: "Commercial",
        href: "#",
        description:
          "A mobile-first solution for seamless communication across global teams. Optimized for low-latency and high reliability in demanding environments.",
        date: "2023",
        contribution: "Mobile Architect",
        extent: ["Develop"],
        stack: ["React Native", "WebRTC"],
      },
      {
        id: "4",
        title: "Nova Dashboard",
        tags: ["Web", "Desktop"],
        category: "Commercial",
        href: "#",
        description:
          "A powerful data visualization tool for enterprise-level analytics. Transforms complex datasets into actionable insights with intuitive charts.",
        date: "2022",
        contribution: "Data Visualization Specialist",
        extent: ["Develop"],
        stack: ["D3.js", "TypeScript"],
      },
      {
        id: "5",
        title: "Lumina App",
        tags: ["Mobile"],
        category: "Personal",
        href: "#",
        description:
          "A lightweight utility app designed to simplify daily tasks. Focuses on accessibility and user-friendly interaction design.",
        date: "2024",
        contribution: "UI/UX Designer",
        extent: ["Design"],
        stack: ["Figma", "Flutter"],
      },
      {
        id: "6",
        title: "Zenith Port",
        tags: ["Web", "Design"],
        category: "Freelance",
        href: "#",
        description:
          "A bespoke portfolio site for a creative agency. Showcases their work through dynamic layouts and fluid motion design.",
        date: "2023",
        contribution: "Creative Developer",
        extent: ["Design", "Develop"],
        stack: ["WebGL", "GSAP"],
      },
      {
        id: "7",
        title: "Pulse Tracker",
        tags: ["Mobile", "Web"],
        category: "Personal",
        href: "#",
        description:
          "A health and fitness companion that tracks vital signs in real-time. Integrates with wearable devices for a holistic health view.",
        date: "2022",
        contribution: "Product Owner",
        extent: ["Design", "Develop"],
        stack: ["Next.js", "Swift"],
      },
      {
        id: "8",
        title: "Orbit Design System",
        tags: ["Design"],
        category: "Commercial",
        href: "#",
        description:
          "A robust set of UI components and design tokens for scaling digital products. Ensures consistency across all platforms and teams.",
        date: "2021",
        contribution: "Design Systems Engineer",
        extent: ["Design", "Develop"],
        stack: ["Storybook", "React"],
      },
      {
        id: "9",
        title: "Aether CMS",
        tags: ["Web", "Desktop"],
        category: "Freelance",
        href: "#",
        description:
          "A flexible content management system tailored for high-traffic media sites. Prioritizes performance and easy content editing.",
        date: "2023",
        contribution: "Backend Lead",
        extent: ["Develop"],
        stack: ["Go", "Kubernetes"],
      },
      {
        id: "10",
        title: "Vortex Engine",
        tags: ["Desktop"],
        category: "Personal",
        href: "#",
        description:
          "An experimental rendering engine for advanced 3D graphics. Explores new ways of visualizing spatial data in the browser.",
        date: "2024",
        contribution: "Graphics Researcher",
        extent: ["Develop"],
        stack: ["Rust", "WGPU"],
      },
    ],
  },
  jp: {
    title: "制作事例",
    description:
      "私が設計、構築し、時には（良い意味で）夜更かしをして作り上げた作品の厳選されたコレクションです。これらは私が心から誇りに思っているプロジェクトです。「ああ、これはかなりクールに仕上がったな」と思えるようなものです。",
    filters: ["すべて", "ウェブ", "モバイル", "デスクトップ", "デザイン"],
    projects: [
      {
        id: "1",
        title: "Silver Soul",
        tags: ["ウェブ"],
        category: "個人用",
        href: "#",
        description:
          "Silver Soulは、作家や詩人がオリジナル作品を公開し、志を同じくする読者とつながり、発見、鑑賞、そして書かれた表現をめぐる有意義なコミュニティへの関与を通じて知名度を高めるためのクリエイティブなプラットフォームです。",
        date: "2022",
        contribution: "単独コントリビューター",
        extent: ["デザイン", "開発"],
        stack: ["Unity 3D", "C#"],
        liveUrl: "#",
        iosUrl: "#",
        androidUrl: "#",
      },
      {
        id: "2",
        title: "Apex Codex",
        tags: ["ウェブ", "デザイン"],
        category: "個人用",
        href: "#",
        description:
          "開発者が複雑なコーディングパターンを探索し、習得するための革新的なプラットフォーム。インタラクティブなドキュメントとリアルタイムの例が特徴です。",
        date: "2023",
        contribution: "リードデベロッパー",
        extent: ["デザイン", "開発"],
        stack: ["Next.js", "Tailwind CSS"],
      },
      {
        id: "3",
        title: "Echo Sphere",
        tags: ["モバイル", "デザイン"],
        category: "商業用",
        href: "#",
        description:
          "グローバルチーム間のシームレスなコミュニケーションのためのモバイルファーストのソリューション。厳しい環境での低遅延と高い信頼性に最適化されています。",
        date: "2023",
        contribution: "モバイルアーキテクト",
        extent: ["開発"],
        stack: ["React Native", "WebRTC"],
      },
      {
        id: "4",
        title: "Nova Dashboard",
        tags: ["ウェブ", "デスクトップ"],
        category: "商業用",
        href: "#",
        description:
          "企業レベルの分析のための強力なデータ視覚化ツール。直感的なチャートを使用して、複雑なデータセットを実行可能なインサイトに変換します。",
        date: "2022",
        contribution: "データ可視化スペシャリスト",
        extent: ["開発"],
        stack: ["D3.js", "TypeScript"],
      },
      {
        id: "5",
        title: "Lumina App",
        tags: ["モバイル"],
        category: "個人用",
        href: "#",
        description:
          "日常業務を簡素化するために設計された軽量なユーティリティアプリ。アクセシビリティとユーザーフレンドリーなインタラクションデザインに焦点。れています。",
        date: "2024",
        contribution: "UI/UXデザイナー",
        extent: ["デザイン"],
        stack: ["Figma", "Flutter"],
      },
      {
        id: "6",
        title: "Zenith Port",
        tags: ["ウェブ", "デザイン"],
        category: "フリーランス",
        href: "#",
        description:
          "クリエイティブエージェンシーのための特注のポートフォリオサイト。ダイナミックなレイアウトと流動的なモーションデザインを通じて彼らの作品を紹介します。",
        date: "2023",
        contribution: "クリエイティブデベロッパー",
        extent: ["デザイン", "開発"],
        stack: ["WebGL", "GSAP"],
      },
      {
        id: "7",
        title: "Pulse Tracker",
        tags: ["モバイル", "ウェブ"],
        category: "個人用",
        href: "#",
        description:
          "バイタルサインをリアルタイムで追跡するヘルス＆フィットネスコンパニオン。ホリスティックな健康ビューのためにウェアラブルデバイスと統合します。",
        date: "2022",
        contribution: "プロダクトオーナー",
        extent: ["デザイン", "開発"],
        stack: ["Next.js", "Swift"],
      },
      {
        id: "8",
        title: "Orbit Design System",
        tags: ["デザイン"],
        category: "商業用",
        href: "#",
        description:
          "デジタル製品を拡張するためのUIコンポーネントとデザイントークンの堅牢なセット。すべてのプラットフォームとチーム全体で一貫性を確保します。",
        date: "2021",
        contribution: "デザインシステムエンジニア",
        extent: ["デザイン", "開発"],
        stack: ["Storybook", "React"],
      },
      {
        id: "9",
        title: "Aether CMS",
        tags: ["ウェブ", "デスクトップ"],
        category: "フリーランス",
        href: "#",
        description:
          "高トラフィックのメディアサイト向けに調整された柔軟なコンテンツ管理システム。パフォーマンスと簡単なコンテンツ編集を優先します。",
        date: "2023",
        contribution: "バックエンドリード",
        extent: ["開発"],
        stack: ["Go", "Kubernetes"],
      },
      {
        id: "10",
        title: "Vortex Engine",
        tags: ["デスクトップ"],
        category: "個人用",
        href: "#",
        description:
          "高度な3Dグラフィックスのための実験的なレンダリングエンジン。ブラウザで空間データを視覚化する新しい方法を模索します。",
        date: "2024",
        contribution: "グラフィックス研究者",
        extent: ["開発"],
        stack: ["Rust", "WGPU"],
      },
    ],
  },
} as const;
