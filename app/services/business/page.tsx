import { createServicePage } from "@/lib/service-page";

const svc = createServicePage({
  key: "business",
  path: "/services/business",
  categoryId: "business",
});
export const generateMetadata = svc.generateMetadata;
export default svc.Page;
