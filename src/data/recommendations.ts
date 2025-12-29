export interface Recommendation {
  name: string;
  role: string;
  url: string;

  description: string;
}

export const recommendedProfiles: Recommendation[] = [
  {
    name: "Takuya Matsuyama",
    role: "Indi Developer",
    url: "https://github.com/craftzdog",

    description: "Takuya is a freelance and a full-stack developer based in Osaka with a passion for building digital services/stuff he wants.",
  },
  {
    name: "Paco Coursey",
    role: "Interface Designer",
    url: "https://github.com/pacocoursey",

    description: "Minimalist design philosophy. Building command menus and high-quality interfaces.",
  },
  {
    name: "Emil Kowalski",
    role: "Design Engineer",
    url: "https://github.com/emilkowalski",

    description: "Master of animations and educational content. Teaching the world how to use Vaul.",
  },
];
