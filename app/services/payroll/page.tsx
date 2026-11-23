import { createServicePage } from "@/lib/service-page";

const svc = createServicePage({
  key: "payroll",
  path: "/services/payroll",
  categoryId: "payroll",
});
export const generateMetadata = svc.generateMetadata;
export default svc.Page;
