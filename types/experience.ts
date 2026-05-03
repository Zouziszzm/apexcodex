export interface Role {
  position: string;
  duration: string;
  dateRange: string;
}

export interface Job {
  company: string;
  href?: string;
  roles?: Role[];
  position?: string; // For single role jobs
  duration?: string;
  dateRange?: string;
}
