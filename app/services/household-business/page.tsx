import { createServicePage } from "@/lib/service-page";

const svc = createServicePage({
  key: "household-business",
  path: "/services/household-business",
  categoryId: "household-business",
});
export const generateMetadata = svc.generateMetadata;
export default svc.Page;
