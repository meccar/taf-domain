import { ContactSubmissionsTable } from "@/components/admin/contact-submissions-table";
import { getContactSubmissions } from "@/lib/contact-submissions";

export const metadata = {
  title: "Contact Submissions | Admin",
};

export default async function ContactSubmissionsPage() {
  const submissions = await getContactSubmissions();

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Contact Submissions
        </h1>
        <p className="text-muted-foreground">
          {submissions.length} total submission
          {submissions.length === 1 ? "" : "s"}
        </p>
      </div>

      <ContactSubmissionsTable submissions={submissions} />
    </div>
  );
}
