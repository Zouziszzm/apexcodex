export interface Recommendation {
  name: string;
  role: string;
  url: string;
  description: string;
}

export interface ProjectRecommendation {
  name: string;
  license: string;
  url: string;
}

export const sourceData = {
  en: {
    title: "SOURCE CODE",
    intro:
      "Everything here is open source. I believe in learning by breaking things apart. Here are my contributions and some projects I admire.",
    linkGithub: "View GitHub Profile",
    recommendedProfilesTitle:
      "Check these people out, I have learned from them a lot.",
    recommendedProjectsTitle: "Projects I Recommend", // Optional/Implicit in list?
  },
  jp: {
    title: "ソースコード",
    intro:
      "ここにあるすべてはオープンソースです。私は物を分解して学ぶことを信じています。ここに私の貢献と、私が感銘を受けたプロジェクトをいくつか紹介します。",
    linkGithub: "GitHubプロフィールを見る",
    recommendedProfilesTitle:
      "これらの人々をチェックしてください、私は彼らから多くを学びました。",
    recommendedProjectsTitle: "おすすめのプロジェクト",
  },
};

export const recommendedProfiles: Recommendation[] = [
  {
    name: "Rauno Freiberg",
    role: "Design Engineer",
    url: "https://github.com/raunofreiberg",
    description:
      "Incredible attention to detail in UI/UX. Creator of Vercel's interaction details.",
  },
  {
    name: "Paco Coursey",
    role: "Interface Designer",
    url: "https://github.com/pacocoursey",
    description:
      "Minimalist design philosophy. Building command menus and high-quality interfaces.",
  },
  {
    name: "Emil Kowalski",
    role: "Design Engineer",
    url: "https://github.com/emilkowalski",
    description:
      "Master of animations and educational content. Teaching the world how to use Vaul.",
  },
];

export const recommendedProjects: ProjectRecommendation[] = [
  {
    name: "apexcodex",
    license: "MIT License",
    url: "https://github.com/zouziszzm/apexcodex",
  },
];
