import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { FileText, Calculator, ShieldCheck, BarChart3 } from "lucide-react";

const services = [
  {
    icon: FileText,
    title: "Khai báo thuế",
    desc: "Thuế GTGT, TNDN, TNCN — đúng hạn, đúng luật.",
    badge: "Phổ biến",
  },
  {
    icon: Calculator,
    title: "Kế toán doanh nghiệp",
    desc: "Ghi sổ, lập báo cáo tài chính theo chuẩn VAS.",
    badge: null,
  },
  {
    icon: ShieldCheck,
    title: "Tuân thủ pháp luật",
    desc: "Cập nhật thay đổi pháp lý, tư vấn rủi ro thuế.",
    badge: null,
  },
  {
    icon: BarChart3,
    title: "Phân tích tài chính",
    desc: "Báo cáo quản trị, dòng tiền, hoạch định ngân sách.",
    badge: null,
  },
];

export function ServicesList() {
  return (
    <div className="flex flex-col">
      {services.map(({ icon: Icon, title, desc, badge }, i) => (
        <div key={title}>
          <div className="flex items-start gap-4 py-4">
            <div className="mt-0.5 p-2 rounded-md bg-muted shrink-0">
              <Icon size={16} className="text-foreground" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-medium text-sm">{title}</p>
                {badge && <Badge variant="secondary">{badge}</Badge>}
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">{desc}</p>
            </div>
          </div>
          {i < services.length - 1 && <Separator />}
        </div>
      ))}
    </div>
  );
}
