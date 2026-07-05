import {
  Receipt,
  Calculator,
  Users,
  ShieldCheck,
  FileCheck,
  Clock,
} from "lucide-react";
import { ServicePageLayout } from "@/components/service-page-layout";

export const metadata = {
  title: "Dịch vụ khai quyết toán thuế | TAF Việt",
  description:
    "TAF Việt hỗ trợ doanh nghiệp kê khai, quyết toán thuế GTGT, TNCN, TNDN đúng hạn, đúng quy định — giảm rủi ro, tiết kiệm thời gian.",
};

const included = [
  {
    icon: Receipt,
    title: "Kê khai thuế GTGT",
    description:
      "Lập và nộp tờ khai thuế giá trị gia tăng theo kỳ, đối chiếu số liệu đầu vào – đầu ra.",
  },
  {
    icon: Calculator,
    title: "Quyết toán thuế TNDN",
    description:
      "Tính toán, lập hồ sơ quyết toán thuế thu nhập doanh nghiệp cuối năm tài chính.",
  },
  {
    icon: Users,
    title: "Quyết toán thuế TNCN",
    description:
      "Tổng hợp thu nhập, giảm trừ gia cảnh và quyết toán thuế thu nhập cá nhân cho người lao động.",
  },
  {
    icon: ShieldCheck,
    title: "Rà soát rủi ro thuế",
    description:
      "Kiểm tra hồ sơ, chứng từ để phát hiện sớm sai lệch trước khi cơ quan thuế thanh kiểm tra.",
  },
  {
    icon: FileCheck,
    title: "Đại diện làm việc với cơ quan thuế",
    description:
      "TAF Việt thay mặt doanh nghiệp giải trình, bổ sung hồ sơ khi có yêu cầu từ cơ quan thuế.",
  },
  {
    icon: Clock,
    title: "Nhắc hạn & theo dõi nghĩa vụ",
    description:
      "Theo dõi thời hạn kê khai, nộp thuế theo tháng/quý/năm, tránh phát sinh phạt chậm nộp.",
  },
];

const steps = [
  {
    title: "Tiếp nhận & khảo sát hồ sơ",
    description:
      "TAF Việt thu thập sổ sách, hóa đơn, chứng từ và đánh giá tình trạng thuế hiện tại của doanh nghiệp.",
  },
  {
    title: "Rà soát & đối chiếu số liệu",
    description:
      "Kiểm tra tính khớp đúng giữa sổ sách kế toán và các tờ khai đã nộp trước đó.",
  },
  {
    title: "Lập tờ khai & tính thuế",
    description:
      "Chuẩn bị tờ khai theo đúng biểu mẫu, tính toán số thuế phải nộp hoặc được hoàn.",
  },
  {
    title: "Nộp hồ sơ & theo dõi",
    description:
      "Nộp tờ khai qua hệ thống thuế điện tử, theo dõi trạng thái xử lý và phản hồi kịp thời.",
  },
  {
    title: "Báo cáo kết quả",
    description:
      "Gửi báo cáo tổng hợp cho doanh nghiệp kèm khuyến nghị cho kỳ kê khai tiếp theo.",
  },
];

const plans = [
  {
    name: "Cơ bản",
    price: "1.500.000đ",
    period: "/ tháng",
    description: "Phù hợp hộ kinh doanh, doanh nghiệp mới thành lập.",
    features: [
      "Kê khai thuế GTGT hàng tháng/quý",
      "Nhắc hạn nộp thuế",
      "Hỗ trợ qua email",
    ],
  },
  {
    name: "Tiêu chuẩn",
    price: "3.500.000đ",
    period: "/ tháng",
    description: "Phù hợp doanh nghiệp vừa và nhỏ có phát sinh thường xuyên.",
    features: [
      "Toàn bộ gói Cơ bản",
      "Quyết toán thuế TNCN, TNDN cuối năm",
      "Rà soát rủi ro thuế định kỳ",
      "Hỗ trợ ưu tiên qua điện thoại",
    ],
    highlighted: true,
  },
  {
    name: "Chuyên sâu",
    price: "Liên hệ",
    period: "",
    description:
      "Phù hợp doanh nghiệp có quy mô lớn hoặc cấu trúc thuế phức tạp.",
    features: [
      "Toàn bộ gói Tiêu chuẩn",
      "Đại diện làm việc với cơ quan thuế",
      "Tư vấn hoạch định thuế theo năm",
      "Chuyên viên phụ trách riêng",
    ],
  },
];

const faqs = [
  {
    q: "Doanh nghiệp cần chuẩn bị gì khi sử dụng dịch vụ?",
    a: "Chỉ cần cung cấp hóa đơn, chứng từ và sổ sách hiện có. TAF Việt sẽ rà soát và hướng dẫn bổ sung nếu còn thiếu.",
  },
  {
    q: "Thời gian xử lý một kỳ kê khai là bao lâu?",
    a: "Thông thường 3–5 ngày làm việc kể từ khi nhận đủ hồ sơ, tùy vào khối lượng phát sinh trong kỳ.",
  },
  {
    q: "Nếu cơ quan thuế yêu cầu giải trình thì sao?",
    a: "TAF Việt hỗ trợ soạn văn bản giải trình và có thể đại diện làm việc trực tiếp với cơ quan thuế trong gói Chuyên sâu.",
  },
  {
    q: "Có thể đổi gói dịch vụ giữa chừng không?",
    a: "Có. Doanh nghiệp có thể nâng hoặc hạ gói vào đầu mỗi kỳ thanh toán, không phát sinh phí chuyển đổi.",
  },
];

export default function TaxPreparationPage() {
  return (
    <ServicePageLayout
      eyebrow="Dịch vụ thuế"
      title="Khai & quyết toán thuế đúng hạn, đúng quy định"
      description="TAF Việt đồng hành cùng doanh nghiệp trong toàn bộ quy trình kê khai và quyết toán thuế GTGT, TNCN, TNDN — giảm rủi ro, tiết kiệm thời gian nội bộ."
      included={included}
      steps={steps}
      plans={plans}
      faqs={faqs}
      ctaTitle="Sẵn sàng để TAF Việt lo phần thuế?"
      ctaDescription="Để lại thông tin, đội ngũ TAF Việt sẽ liên hệ tư vấn trong vòng 24 giờ."
      contactFormTitle="Yêu cầu tư vấn dịch vụ thuế"
      source="service-tax-preparation"
    />
  );
}
