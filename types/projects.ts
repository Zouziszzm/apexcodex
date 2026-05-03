import { ReactNode } from "react";

export interface Project {
  id: string;
  title: string;
  subtext: string;
  date: string;
  description: string | ReactNode;
  devNotes?: string | ReactNode;
  github?: string;
  images: string[];
  tags: string[];
  contribution: string;
  extent: string[];
  stack: string[];
  category: "Personal" | "Commercial" | "Freelance";
  liveUrl?: string;
}
