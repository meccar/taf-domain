import "server-only";

import { createClient } from "@/lib/supabase/server";
import { revalidateTag } from "next/cache";
import type {
  ContactSubmission,
  ContactSubmissionStatus,
} from "@/types/contact-submission";

export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch contact submissions:", error);
    return [];
  }

  return data.map((submission) => ({
    id: submission.id,
    name: submission.name,
    email: submission.email,
    phone: submission.phone,
    subject: submission.subject,
    message: submission.message,
    status: submission.status,
    createdAt: submission.created_at,
  }));
}

export async function updateContactSubmissionStatus(
  id: string,
  status: ContactSubmissionStatus,
): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("contact_submissions")
    .update({ status })
    .eq("id", id);

  if (error) {
    throw new Error(`Failed to update contact submission: ${error.message}`);
  }

  revalidateTag("admin-dashboard", "max");
}

export async function deleteContactSubmission(id: string): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("contact_submissions")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(`Failed to delete contact submission: ${error.message}`);
  }

  revalidateTag("admin-dashboard", "max");
}
