export interface Role {
  readonly position: string;
  readonly duration: string;
  readonly dateRange: string;
}

export interface Job {
  readonly company: string;
  readonly href: string;
  readonly location: string;
  readonly jobType: string;
  readonly workMode: string;
  readonly roles: readonly Role[];
}
