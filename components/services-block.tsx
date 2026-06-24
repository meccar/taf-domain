import { Calculator, FileText, Building2 } from "lucide-react";

const services = [
  {
    icon: Calculator,
    title: "Kế toán doanh nghiệp",
    desc: "Sổ sách, báo cáo tài chính, quản lý dòng tiền hàng tháng.",
  },
  {
    icon: FileText,
    title: "Khai báo thuế",
    desc: "VAT, thuế TNDN, thuế TNCN — đúng hạn, đúng luật.",
  },
  {
    icon: Building2,
    title: "Tư vấn tài chính",
    desc: "Cơ cấu vốn, hoạch định ngân sách, tối ưu chi phí thuế.",
  },
];

export function ServicesBlock() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x border rounded-xl">
      {services.map(({ icon: Icon, title, desc }) => (
        <div key={title} className="p-6">
          <Icon size={22} className="text-primary mb-3" />
          <p className="font-medium mb-1">{title}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {desc}
          </p>
        </div>
      ))}
    </div>
  );
}
