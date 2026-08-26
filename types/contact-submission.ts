export type ContactSubmissionStatus = "new" | "read" | "archived";

export interface ContactSubmission {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  message?: string | null;
  source?: string | null;
  status: ContactSubmissionStatus;
  createdAt: string;
}
