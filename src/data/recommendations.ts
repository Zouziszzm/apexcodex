export interface Recommendation {
  name: string;
  role: string;
  url: string;

  description: string;
}

export const recommendedProfiles: Recommendation[] = [
  {
    name: "Rauno Freiberg",
    role: "Design Engineer",
    url: "https://github.com/raunofreiberg",

    description: "Incredible attention to detail in UI/UX. Creator of Vercel's interaction details.",
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
