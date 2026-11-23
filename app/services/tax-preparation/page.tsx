import { createServicePage } from "@/lib/service-page";

const svc = createServicePage({
  key: "tax-preparation",
  path: "/services/tax-preparation",
  categoryId: "tax-preparation",
});
export const generateMetadata = svc.generateMetadata;
export default svc.Page;
