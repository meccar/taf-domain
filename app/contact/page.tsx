import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "info@tafviet.vn",
    href: "mailto:info@tafviet.vn",
  },
  {
    icon: Phone,
    label: "Điện thoại",
    value: "+84 936 378 955",
    href: "tel:0936378955",
  },
  {
    icon: MapPin,
    label: "Địa chỉ",
    value: "Hà Nội, Việt Nam",
    href: "#",
  },
];

export default function Contact() {
  return (
    <main className="w-full">
      {/* Hero */}
      <div className="bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center flex flex-col items-center gap-4">
          <Badge variant="outline" className="uppercase tracking-widest">
            Liên hệ
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            Chúng tôi luôn sẵn sàng hỗ trợ bạn
          </h1>
          <CardDescription className="max-w-2xl text-base leading-relaxed">
            Để lại thông tin hoặc liên hệ trực tiếp — đội ngũ TAF Việt sẽ phản
            hồi trong thời gian sớm nhất.
          </CardDescription>
        </div>
      </div>

      <Separator />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-12">
          {/* Contact info */}
          <div className="flex flex-col gap-6">
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <Card
                key={label}
                className="border-none shadow-none hover:bg-accent/50 transition-colors"
              >
                <Link href={href} className="flex items-start gap-4 p-2">
                  <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardHeader className="p-0 gap-1">
                    <CardDescription className="text-xs uppercase tracking-widest">
                      {label}
                    </CardDescription>
                    <CardTitle className="text-sm font-medium">
                      {value}
                    </CardTitle>
                  </CardHeader>
                </Link>
              </Card>
            ))}

            <Card className="overflow-hidden p-0 h-56">
              <iframe
                title="Bản đồ văn phòng TAF Việt"
                src="https://www.google.com/maps?q=Hanoi,Vietnam&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Card>
          </div>

          {/* Contact form */}
          <Card>
            <CardContent className="pt-6">
              <form className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name">Họ và tên</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Nguyễn Văn A"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input id="phone" name="phone" placeholder="0912 345 678" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="ban@congty.vn"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="subject">Chủ đề</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Tư vấn dịch vụ kế toán"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="message">Nội dung</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Mô tả nhu cầu của bạn..."
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full sm:w-fit">
                  Gửi yêu cầu
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
