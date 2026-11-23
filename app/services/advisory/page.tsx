import { createServicePage } from "@/lib/service-page";

const svc = createServicePage({
  key: "advisory",
  path: "/services/advisory",
  categoryId: "advisory",
});
export const generateMetadata = svc.generateMetadata;
export default svc.Page;
