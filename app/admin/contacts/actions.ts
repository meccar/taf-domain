"use server";

import {
  deleteContactSubmission,
  updateContactSubmissionStatus,
} from "@/lib/contact-submissions";
import { ContactSubmissionStatus } from "@/types/contact-submission";
import { revalidatePath } from "next/cache";

export async function setSubmissionStatusAction(
  id: string,
  status: ContactSubmissionStatus,
) {
  await updateContactSubmissionStatus(id, status);
  revalidatePath("/admin/contact-submissions");
}

export async function deleteSubmissionAction(id: string) {
  await deleteContactSubmission(id);
  revalidatePath("/admin/contact-submissions");
}
