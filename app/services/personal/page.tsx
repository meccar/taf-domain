import { createServicePage } from "@/lib/service-page";

const svc = createServicePage({
  key: "personal",
  path: "/services/personal",
  categoryId: "personal",
});
export const generateMetadata = svc.generateMetadata;
export default svc.Page;
