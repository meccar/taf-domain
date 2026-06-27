"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CtaBlock() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = () => {
    setOpen(false);
  };

  return (
    <div className="bg-secondary rounded-xl p-10 text-center">
      <h2 className="text-2xl font-medium mb-2">
        Bắt đầu với buổi tư vấn miễn phí
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        Để lại thông tin, chúng tôi sẽ liên hệ trong vòng 24 giờ.
      </p>
      <Button size="lg" onClick={() => setOpen(true)}>
        Đặt lịch tư vấn
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogOverlay className="bg-black/30 backdrop-blur-sm" />
        <DialogContent className="w-full sm:max-w-lg overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Đặt lịch tư vấn</DialogTitle>
            <DialogDescription>
              Chọn ngày và để lại thông tin, chúng tôi sẽ liên hệ trong vòng 24
              giờ.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div className="grid gap-1.5">
              <Label htmlFor="name">Họ và tên</Label>
              <Input
                id="name"
                placeholder="Nguyễn Văn A"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                placeholder="0912 345 678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="grid gap-1.5">
              <Label>Ngày tư vấn</Label>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                className="rounded-md border w-fit mx-auto"
              />
            </div>

            <Button onClick={handleSubmit} disabled={!name || !phone || !date}>
              Xác nhận đặt lịch
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
