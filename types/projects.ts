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
  category: "Personal" | "Commercial" | "Freelance" | "Professional";
  liveUrl?: string;
  markdown?: boolean;
  group?: string;
  order?: number;
  portfolioMode?: "metadata-only" | "summary" | "summary-collapsible";
  technicalDetails?: string;
  detailsCollapsed?: boolean;
}
