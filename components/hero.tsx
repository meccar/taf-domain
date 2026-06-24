import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

export function Hero() {
  return (
    <div className="flex flex-col items-center text-center px-6 py-20 max-w-3xl mx-auto">
      {/* Badge */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground border rounded-full px-4 py-1.5 mb-8">
        <ShieldCheck size={14} />
        <span>Được tin tưởng bởi hơn 500 doanh nghiệp</span>
      </div>

      {/* Heading */}
      <h1 className="text-4xl lg:text-5xl font-medium leading-tight mb-5">
        Giải pháp kế toán &<br />
        thuế toàn diện
      </h1>

      {/* Subheading */}
      <p className="text-lg text-muted-foreground max-w-lg leading-relaxed mb-10">
        TAF Viet đồng hành cùng doanh nghiệp trong việc quản lý tài chính, khai
        báo thuế và tuân thủ pháp luật — chính xác, đúng hạn, an tâm.
      </p>

      {/* CTAs */}
      <div className="flex gap-3 flex-wrap justify-center">
        <Button size="lg" asChild>
          <Link href="/lien-he">Nhận tư vấn miễn phí</Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="/dich-vu">Xem dịch vụ</Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 divide-x border rounded-xl mt-16 w-full">
        <div className="py-6 px-4">
          <p className="text-2xl font-medium">10+</p>
          <p className="text-sm text-muted-foreground mt-1">Năm kinh nghiệm</p>
        </div>
        <div className="py-6 px-4">
          <p className="text-2xl font-medium">500+</p>
          <p className="text-sm text-muted-foreground mt-1">
            Khách hàng doanh nghiệp
          </p>
        </div>
        <div className="py-6 px-4">
          <p className="text-2xl font-medium">99%</p>
          <p className="text-sm text-muted-foreground mt-1">Hồ sơ đúng hạn</p>
        </div>
      </div>
    </div>
  );
}
