export interface PlaygroundItem {
  id: string;
  title: string;
  tags: readonly string[]; // "Text" | "Transition" | "Element"
  githubUrl: string;
  image: string;
}

export const playgroundData = {
  en: {
    title: "PLAYGROUND",
    description: [
      "This is my creative playground. A space where I experiment with animations, interactions, and ideas that don’t always start with a brief — just curiosity and a lot of tweaking. Many of these experiments later show up in my main projects, refined and battle-tested.",
      "All snippets are open-source. Steal them, improve them, break them, make them better — that’s the point. No credit needed. Just have fun with it.",
    ],
    filters: ["All", "Text", "Transition", "Element"],
    items: [
      {
        id: "1",
        title: "Text Reveal",
        tags: ["Text"],
        githubUrl: "https://github.com",
        image: "/assets/img1.jpeg",
      },
      {
        id: "2",
        title: "Page Transition",
        tags: ["Transition"],
        githubUrl: "https://github.com",
        image: "/assets/img2.jpeg",
      },
      {
        id: "3",
        title: "Magnetic Button",
        tags: ["Element"],
        githubUrl: "https://github.com",
        image: "/assets/img3.jpeg",
      },
    ] as PlaygroundItem[],
  },
  jp: {
    title: "プレイグラウンド",
    description: [
      "これは私のクリエイティブな遊び場です。アニメーション、インタラクション、そしてアイデアを実験する場所であり、これらは必ずしも明確な要件から始まるわけではありません。ただの好奇心と試行錯誤から生まれます。ここでの実験の多くは、後に洗練され、実戦テストを経てメインプロジェクトに登場します。",
      "すべてのスニペットはオープンソースです。盗んで、改良して、壊して、より良くしてください。それがこの場所の目的です。クレジットは必要ありません。ただ楽しんでください。",
    ],
    filters: ["すべて", "テキスト", "トランジション", "要素"],
    items: [
      {
        id: "1",
        title: "Text Reveal",
        tags: ["テキスト"],
        githubUrl: "https://github.com",
        image: "/assets/img1.jpeg",
      },
      {
        id: "2",
        title: "Page Transition",
        tags: ["トランジション"],
        githubUrl: "https://github.com",
        image: "/assets/img2.jpeg",
      },
      {
        id: "3",
        title: "Magnetic Button",
        tags: ["要素"],
        githubUrl: "https://github.com",
        image: "/assets/img3.jpeg",
      },
    ] as PlaygroundItem[],
  },
} as const;
