import Link from "next/link";
import {
  Calculator,
  FileText,
  BookOpen,
  ScrollText,
  Download,
  ArrowUpRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { NewsletterForm } from "@/components/newsletter-form";

export const metadata = {
  title: "Tài nguyên | TAF Việt",
  description:
    "Máy tính thuế, biểu mẫu, văn bản pháp luật và câu hỏi thường gặp từ TAF Việt.",
};

const categories = [
  {
    icon: Calculator,
    title: "Máy tính lương & thuế",
    description: "Ước tính lương Gross-Net, thuế GTGT chỉ trong vài giây.",
    href: "/resources/calculators",
  },
  {
    icon: BookOpen,
    title: "Blog & tin tức",
    description: "Cập nhật quy định thuế, kế toán mới nhất mỗi tuần.",
    href: "/blog",
  },
];

const downloads = [
  {
    title: "Mẫu đề nghị hoàn thuế GTGT",
    file: "/downloads/mau-de-nghi-hoan-thue-gtgt.docx",
  },
  {
    title: "Bảng kê chi phí hợp lý cho doanh nghiệp",
    file: "/downloads/bang-ke-chi-phi.xlsx",
  },
  {
    title: "Checklist hồ sơ quyết toán thuế TNDN",
    file: "/downloads/checklist-quyet-toan-tndn.pdf",
  },
  {
    title: "Mẫu hợp đồng lao động chuẩn 2026",
    file: "/downloads/mau-hop-dong-lao-dong.docx",
  },
];

const legalDocs = [
  "Luật Thuế giá trị gia tăng (sửa đổi, bổ sung)",
  "Nghị định về hóa đơn điện tử",
  "Thông tư hướng dẫn quyết toán thuế TNCN",
  "Luật Doanh nghiệp hiện hành",
];

const faqs = [
  {
    q: "TAF Việt có hỗ trợ doanh nghiệp mới thành lập không?",
    a: "Có. TAF Việt hỗ trợ từ giai đoạn đăng ký thành lập đến vận hành kế toán, thuế hàng tháng.",
  },
  {
    q: "Tôi có thể tải biểu mẫu về dùng miễn phí không?",
    a: "Có, toàn bộ biểu mẫu trong mục Tài nguyên đều miễn phí tải về và sử dụng.",
  },
  {
    q: "Các văn bản pháp luật có được cập nhật thường xuyên không?",
    a: "TAF Việt cập nhật danh mục văn bản khi có thay đổi quy định mới liên quan đến thuế và kế toán.",
  },
];

export default function ResourcesPage() {
  return (
    <main className="w-full">
      {/* Hero */}
      <div className="bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center flex flex-col items-center gap-4">
          <Badge variant="outline" className="uppercase tracking-widest">
            Tài nguyên
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            Công cụ & tài liệu cho doanh nghiệp
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground leading-relaxed">
            Máy tính thuế, biểu mẫu tải về và văn bản pháp luật cập nhật — tất
            cả ở một nơi.
          </p>
        </div>
      </div>

      <Separator />

      {/* Category cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid sm:grid-cols-2 gap-6">
          {categories.map(({ icon: Icon, title, description, href }) => (
            <Link key={title} href={href} className="group">
              <Card className="h-full transition-colors hover:border-foreground/20">
                <CardHeader className="gap-3">
                  <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="flex items-center gap-1.5 text-base">
                    {title}
                    <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <Separator />

      {/* Downloads */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-2xl mb-10">
          <Badge variant="outline" className="uppercase tracking-widest mb-4">
            Biểu mẫu tải về
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Mẫu tài liệu thường dùng
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {downloads.map((d) => (
            <Link key={d.title} href={d.file} download>
              <Card className="flex-row items-center gap-3 p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium">{d.title}</span>
                <Download className="h-4 w-4 text-muted-foreground ml-auto shrink-0" />
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <Separator />

      {/* Legal documents + FAQ + newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 flex flex-col gap-16">
            <div>
              <Badge
                variant="outline"
                className="uppercase tracking-widest mb-4"
              >
                Văn bản pháp luật
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-6">
                Văn bản liên quan doanh nghiệp cần biết
              </h2>
              <div className="flex flex-col divide-y border rounded-lg">
                <Card>
                  <CardContent className="p-0">
                    {legalDocs.map((doc, i) => (
                      <div key={doc}>
                        <div className="flex items-center gap-3 p-4">
                          <ScrollText className="h-4 w-4 text-muted-foreground shrink-0" />
                          <span className="text-sm">{doc}</span>
                        </div>
                        {i < legalDocs.length - 1 && <Separator />}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <Badge
                variant="outline"
                className="uppercase tracking-widest mb-4"
              >
                Câu hỏi thường gặp
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-6">
                Giải đáp nhanh
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((item, i) => (
                  <AccordionItem key={item.q} value={`item-${i}`}>
                    <AccordionTrigger className="text-left">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          <div>
            <Card>
              <CardHeader className="gap-2">
                <CardTitle className="text-base">Đăng ký bản tin</CardTitle>
                <CardDescription>
                  Nhận cập nhật quy định thuế & kế toán mới nhất mỗi tháng, miễn
                  phí.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NewsletterForm source="resources-page" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
