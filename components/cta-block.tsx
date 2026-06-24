import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CtaBlock() {
  return (
    <div className="bg-secondary rounded-xl p-10 text-center">
      <h2 className="text-2xl font-medium mb-2">
        Bắt đầu với buổi tư vấn miễn phí
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        Để lại thông tin, chúng tôi sẽ liên hệ trong vòng 24 giờ.
      </p>
      <Button size="lg" asChild>
        <Link href="/lien-he">Đặt lịch tư vấn</Link>
      </Button>
    </div>
  );
}
