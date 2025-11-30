export interface ExperienceRole {
  title: string;
  duration: string;
  period: string;
}

export interface Experience {
  company: string;
  href: string;
  location: string;
  type: string;
  workMode: string;
  roles: ExperienceRole[];
}

export interface ExperienceItemProps {
  experience: Experience;
}

