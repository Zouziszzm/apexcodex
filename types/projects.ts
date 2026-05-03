export interface Project {
  id: string;
  title: string;
  subtext: string;
  date: string;
  description: string;
  devNotes?: string;
  images: string[];
  tags: string[];
  contribution: string;
  extent: string[];
  stack: string[];
  category: "Personal" | "Commercial" | "Freelance";
  liveUrl?: string;
}
