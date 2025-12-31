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
    name: "Takuya Matsuyama",
    role: "Digital Craftsman ( Artist / Developer / Designer )",
    url: "https://github.com/craftzdog",
    description:
      "Takuya is a freelance and a full-stack developer based in Osaka with a passion for building digital services/stuff he wants.",
  },
  {
    name: "ThePrimeagen",
    role: "Developer",
    url: "https://github.com/theprimeagen",
    description:
      "Just a guy looking to make my developer workflow more awesome, build performant projects, understand memory, and ultimately craft really awesome software.",
  },
];

export const recommendedProjects: ProjectRecommendation[] = [
  {
    name: "apexcodex",
    license: "MIT License",
    url: "https://github.com/zouziszzm/apexcodex",
  },
  {
    name: "Reply Conduit",
    license: "MIT License",
    url: "https://github.com/Zouziszzm/Reply-Conduit",
  },
];
