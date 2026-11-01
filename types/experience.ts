export interface CompanySpan {
  start: string;
  end: string;
  isTechnical?: boolean;
}

export interface Role {
  position: string;
  duration?: string;
  dateRange: string;
  startDate?: string;
  endDate?: string;
  description?: string[];
  employmentType?: string;
  location?: string;
  workArrangement?: string;
  classification?: string;
}

export interface Job {
  company: string;
  href?: string;
  roles?: Role[];
  position?: string; // For single role jobs
  duration?: string;
  dateRange?: string;
  startDate?: string;
  endDate?: string;
  description?: string[];
  employmentType?: string;
  location?: string;
  workArrangement?: string;
  classification?: string;
}
