export const STATUSES = ["applied", "interview", "rejected", "offer"] as const;

export type Status = (typeof STATUSES)[number];

export type Application = {
  id: string;
  company: string;
  role: string;
  url?: string;
  notes?: string;
  status: Status;
  appliedAt: string;
  createdAt: string;
  updatedAt: string;
};

export type NewApplication = Omit<
  Application,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateApplication = Partial<NewApplication>;
