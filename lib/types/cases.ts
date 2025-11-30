export interface CaseStudy {
  id: number;
  slug: string;
  image: string;
  title: string;
  titleJapanese: string;
  year: string;
  overview: string;
  overviewJapanese: string;
  category?: string;
  technologies?: string[];
  features?: string[];
  status?: string;
  duration?: string;
  teamSize?: string;
  client?: string;
  demoLink?: string;
  githubLink?: string;
}

export type CasesData = {
  cases: CaseStudy[];
};