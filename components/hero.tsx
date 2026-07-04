"use client";

import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogOverlay,
} from "@/components/ui/dialog";
import { useState } from "react";
import { ContactForm } from "./contact-form";
import { ServicesList } from "./services-list";

export function Hero() {
  const [contactOpen, setContactOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center text-center px-6 py-20 max-w-3xl mx-auto">
        {/* Badge */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground border rounded-full px-4 py-1.5 mb-8">
          <ShieldCheck size={14} />
          <span>Được tin tưởng bởi hơn 500 doanh nghiệp</span>
        </div>

        <h1 className="text-4xl lg:text-5xl font-medium leading-tight mb-5">
          Giải pháp kế toán &<br />
          thuế toàn diện
        </h1>

        <p className="text-lg text-muted-foreground max-w-lg leading-relaxed mb-10">
          TAF Viet đồng hành cùng doanh nghiệp trong việc quản lý tài chính,
          khai báo thuế và tuân thủ pháp luật — chính xác, đúng hạn, an tâm.
        </p>

        <div className="flex gap-3 flex-wrap justify-center">
          <Button size="lg" onClick={() => setContactOpen(true)}>
            Nhận tư vấn miễn phí
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => setServicesOpen(true)}
          >
            Xem dịch vụ
          </Button>
        </div>

        <div className="grid grid-cols-3 divide-x border rounded-xl mt-16 w-full">
          <div className="py-6 px-4">
            <p className="text-2xl font-medium">10+</p>
            <p className="text-sm text-muted-foreground mt-1">
              Năm kinh nghiệm
            </p>
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

      {/* Contact — Sheet slides in from the right */}
      <Dialog open={contactOpen} onOpenChange={setContactOpen}>
        <DialogOverlay className="bg-black/30 backdrop-blur-sm" />
        <DialogContent className="w-full sm:max-w-lg overflow-y-auto ">
          <DialogHeader className="mb-6">
            <DialogTitle>Nhận tư vấn miễn phí</DialogTitle>
            <DialogDescription>
              Chúng tôi sẽ liên hệ trong vòng 24 giờ làm việc.
            </DialogDescription>
          </DialogHeader>
          <ContactForm
            variant="card"
            compact
            title="Nhận tư vấn miễn phí"
            description="Để lại số điện thoại, chúng tôi gọi lại trong 15 phút."
            submitLabel="Gọi lại cho tôi"
            source="home-cta"
          />
        </DialogContent>
      </Dialog>

      {/* Services — Dialog pops up centered */}
      <Dialog open={servicesOpen} onOpenChange={setServicesOpen}>
        <DialogOverlay className="bg-black/30 backdrop-blur-sm" />
        <DialogContent className="w-full sm:max-w-lg overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Dịch vụ của chúng tôi</DialogTitle>
            <DialogDescription>
              Giải pháp toàn diện cho mọi nhu cầu tài chính doanh nghiệp.
            </DialogDescription>
          </DialogHeader>
          <ServicesList />
        </DialogContent>
      </Dialog>
    </>
  );
}
