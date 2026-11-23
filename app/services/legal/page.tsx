import { createServicePage } from "@/lib/service-page";

const svc = createServicePage({
  key: "legal",
  path: "/services/legal",
  categoryId: "legal",
});
export const generateMetadata = svc.generateMetadata;
export default svc.Page;
