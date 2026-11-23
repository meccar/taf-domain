import { createServicePage } from "@/lib/service-page";

const svc = createServicePage({
  key: "accounting",
  path: "/services/accounting",
  categoryId: "accounting",
});
export const generateMetadata = svc.generateMetadata;
export default svc.Page;
