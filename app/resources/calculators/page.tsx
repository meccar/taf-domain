import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SalaryCalculator } from "@/components/calculators/salary-calculator";
import { VatCalculator } from "@/components/calculators/vat-calculator";

export const metadata = {
  title: "Máy tính thuế & lương | TAF Việt",
  description:
    "Công cụ tính lương Gross-Net và thuế GTGT nhanh, miễn phí từ TAF Việt.",
};

export default function CalculatorsPage() {
  return (
    <main className="w-full">
      <div className="bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center flex flex-col items-center gap-4">
          <Badge variant="outline" className="uppercase tracking-widest">
            Công cụ hỗ trợ
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            Máy tính lương & thuế
          </h1>
          <p className="max-w-xl text-base text-muted-foreground leading-relaxed">
            Ước tính nhanh lương Gross-Net và thuế GTGT. Kết quả chỉ mang tính
            tham khảo.
          </p>
        </div>
      </div>

      <Separator />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Chọn công cụ</CardTitle>
            <CardDescription>
              Kết quả cập nhật trực tiếp khi bạn thay đổi số liệu.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="salary" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="salary">Lương Gross - Net</TabsTrigger>
                <TabsTrigger value="vat">Thuế GTGT</TabsTrigger>
              </TabsList>
              <TabsContent value="salary">
                <SalaryCalculator />
              </TabsContent>
              <TabsContent value="vat">
                <VatCalculator />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
