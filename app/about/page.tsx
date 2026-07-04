import Link from "next/link";
import { CheckCircle2, Target, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const stats = [
  { label: "Năm kinh nghiệm", value: "10+" },
  { label: "Khách hàng tin dùng", value: "500+" },
  { label: "Chuyên gia", value: "30+" },
  { label: "Hồ sơ xử lý mỗi năm", value: "1,200+" },
];

const values = [
  {
    icon: Target,
    title: "Chính xác",
    desc: "Mọi báo cáo, hồ sơ thuế đều được kiểm tra kỹ lưỡng, tuân thủ đúng quy định pháp luật hiện hành.",
  },
  {
    icon: Users,
    title: "Tận tâm",
    desc: "Đội ngũ luôn đồng hành, tư vấn sát sao theo từng giai đoạn phát triển của doanh nghiệp khách hàng.",
  },
  {
    icon: Award,
    title: "Chuyên nghiệp",
    desc: "Quy trình làm việc rõ ràng, minh bạch, được xây dựng theo chuẩn mực kế toán quốc tế.",
  },
];

const highlights = [
  "Tuân thủ 100% quy định pháp luật thuế hiện hành",
  "Báo cáo minh bạch, cập nhật theo thời gian thực",
  "Đội ngũ chuyên gia giàu kinh nghiệm thực chiến",
  "Hỗ trợ tư vấn nhanh chóng, sát sao",
];

const team = [
  { name: "Nguyễn Văn Mười", role: "Giám đốc điều hành" },
  { name: "Trần Thị B", role: "Trưởng phòng Kế toán" },
  { name: "Lê Văn C", role: "Chuyên viên Thuế" },
  { name: "Phạm Thị D", role: "Tư vấn Tài chính" },
];

export default function About() {
  return (
    <main className="w-full">
      {/* Hero */}
      <div className="bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center flex flex-col items-center gap-4">
          <Badge variant="outline" className="uppercase tracking-widest">
            Về chúng tôi
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            Đồng hành cùng doanh nghiệp
            <br className="hidden sm:block" /> trên hành trình phát triển
          </h1>
          <CardDescription className="max-w-2xl text-base leading-relaxed">
            TAF Việt là đơn vị cung cấp dịch vụ kế toán, thuế và tư vấn tài
            chính uy tín, giúp doanh nghiệp vận hành minh bạch và tối ưu chi
            phí.
          </CardDescription>
        </div>
      </div>

      <Separator />

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map(({ label, value }) => (
            <Card key={label} className="border-none shadow-none text-center">
              <CardHeader className="gap-1 pb-0">
                <CardTitle className="text-3xl sm:text-4xl font-semibold">
                  {value}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{label}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator />

      {/* Mission */}
      <div className="bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col gap-4">
            <Badge
              variant="outline"
              className="uppercase tracking-widest w-fit"
            >
              Sứ mệnh
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Đơn giản hóa bài toán kế toán - thuế cho doanh nghiệp Việt
            </h2>
            <CardDescription className="text-base leading-relaxed">
              Chúng tôi tin rằng mỗi doanh nghiệp, dù lớn hay nhỏ, đều xứng đáng
              có một đối tác tài chính đáng tin cậy. Đó là lý do TAF Việt ra đời
              — để giải quyết các vấn đề kế toán, thuế phức tạp bằng giải pháp
              rõ ràng, hiệu quả.
            </CardDescription>
          </div>
          <ul className="flex flex-col gap-4">
            {highlights.map((text) => (
              <li key={text} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <CardDescription className="text-sm">{text}</CardDescription>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Separator />

      {/* Values */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center flex flex-col items-center gap-3 mb-12">
          <Badge variant="outline" className="uppercase tracking-widest">
            Giá trị cốt lõi
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Điều làm nên sự khác biệt
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {values.map(({ icon: Icon, title, desc }) => (
            <Card key={title} className="hover:shadow-sm transition-shadow">
              <CardHeader className="gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-base font-medium">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed">
                  {desc}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator />

      {/* Team */}
      <div className="bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center flex flex-col items-center gap-3 mb-12">
            <Badge variant="outline" className="uppercase tracking-widest">
              Đội ngũ
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Gặp gỡ những người đồng hành cùng bạn
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map(({ name, role }) => (
              <Card
                key={name}
                className="border-none shadow-none text-center bg-transparent"
              >
                <CardHeader className="items-center pb-2">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-muted" />
                </CardHeader>
                <CardContent className="flex flex-col gap-1">
                  <CardTitle className="text-sm font-medium">{name}</CardTitle>
                  <CardDescription className="text-xs">{role}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center flex flex-col items-center gap-4">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Sẵn sàng hợp tác cùng chúng tôi?
        </h2>
        <CardDescription className="max-w-xl text-base">
          Liên hệ ngay để được tư vấn miễn phí giải pháp kế toán - thuế phù hợp
          với doanh nghiệp của bạn.
        </CardDescription>
        <Button asChild size="lg">
          <Link href="/lien-he">Liên hệ tư vấn</Link>
        </Button>
      </div>
    </main>
  );
}
