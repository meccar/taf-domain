import { ContactSubmissionsTable } from "./contact-submissions-table";
import { getContactSubmissions } from "@/lib/contact-submissions";

export async function ContactSubmissionsTableWrapper() {
  const submissions = await getContactSubmissions();

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        {submissions.length} total submission
        {submissions.length === 1 ? "" : "s"}
      </p>
      <ContactSubmissionsTable submissions={submissions} />
    </div>
  );
}
