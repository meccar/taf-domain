import {
  Lightbulb,
  TrendingUp,
  Building2,
  Scale,
  FileSearch,
  Target,
} from "lucide-react";
import { ServicePageLayout } from "@/components/service-page-layout";

export const metadata = {
  title: "Dịch vụ tư vấn tài chính & thuế | TAF Việt",
  description:
    "TAF Việt tư vấn chiến lược tài chính, hoạch định thuế và cơ cấu doanh nghiệp — giúp lãnh đạo ra quyết định đúng thời điểm.",
};

const included = [
  {
    icon: Lightbulb,
    title: "Hoạch định thuế chiến lược",
    description:
      "Xây dựng phương án tối ưu nghĩa vụ thuế hợp pháp, phù hợp với kế hoạch kinh doanh dài hạn.",
  },
  {
    icon: Building2,
    title: "Tư vấn cơ cấu doanh nghiệp",
    description:
      "Đánh giá và đề xuất mô hình công ty, chi nhánh hoặc tập đoàn phù hợp với giai đoạn phát triển.",
  },
  {
    icon: TrendingUp,
    title: "Phân tích tài chính & dòng tiền",
    description:
      "Rà soát sức khỏe tài chính, dự báo dòng tiền và đề xuất phương án cải thiện hiệu quả vận hành.",
  },
  {
    icon: Scale,
    title: "Tư vấn tuân thủ pháp lý – thuế",
    description:
      "Đối chiếu hoạt động thực tế với quy định hiện hành, giảm thiểu rủi ro pháp lý và thuế.",
  },
  {
    icon: FileSearch,
    title: "Rà soát trước M&A / gọi vốn",
    description:
      "Kiểm tra hồ sơ tài chính, thuế trước các giao dịch mua bán – sáp nhập hoặc gọi vốn đầu tư.",
  },
  {
    icon: Target,
    title: "Tư vấn theo mục tiêu doanh nghiệp",
    description:
      "Đồng hành theo từng cột mốc: mở rộng thị trường, tái cấu trúc, hoặc chuẩn bị niêm yết.",
  },
];

const steps = [
  {
    title: "Trao đổi mục tiêu ban đầu",
    description:
      "Tìm hiểu tình hình hiện tại, mục tiêu kinh doanh và các vấn đề doanh nghiệp đang cần giải quyết.",
  },
  {
    title: "Rà soát dữ liệu tài chính & thuế",
    description:
      "Phân tích báo cáo tài chính, hồ sơ thuế và cơ cấu vận hành hiện có.",
  },
  {
    title: "Xây dựng phương án tư vấn",
    description:
      "Đề xuất các phương án cụ thể kèm phân tích ưu, nhược điểm và rủi ro của từng lựa chọn.",
  },
  {
    title: "Trình bày & thống nhất giải pháp",
    description:
      "Trao đổi trực tiếp với ban lãnh đạo để thống nhất phương án triển khai phù hợp nhất.",
  },
  {
    title: "Đồng hành triển khai",
    description:
      "Hỗ trợ doanh nghiệp thực thi phương án đã thống nhất và điều chỉnh khi cần thiết.",
  },
];

const plans = [
  {
    name: "Tư vấn theo phiên",
    price: "1.800.000đ",
    period: "/ buổi",
    description:
      "Phù hợp nhu cầu tư vấn một vấn đề cụ thể, không cần cam kết dài hạn.",
    features: [
      "Buổi tư vấn 90 phút",
      "Báo cáo khuyến nghị sau buổi tư vấn",
      "Hỗ trợ qua email trong 7 ngày",
    ],
  },
  {
    name: "Đồng hành theo quý",
    price: "9.000.000đ",
    period: "/ quý",
    description:
      "Phù hợp doanh nghiệp cần tư vấn thường xuyên trong giai đoạn tăng trưởng.",
    features: [
      "Tư vấn không giới hạn số buổi trong quý",
      "Rà soát tài chính & thuế định kỳ",
      "Ưu tiên phản hồi trong 24 giờ",
    ],
    highlighted: true,
  },
  {
    name: "Cố vấn chiến lược",
    price: "Liên hệ",
    period: "",
    description: "Phù hợp doanh nghiệp cần cố vấn cấp cao đồng hành dài hạn.",
    features: [
      "Toàn bộ gói Đồng hành theo quý",
      "Tham gia các cuộc họp chiến lược của ban lãnh đạo",
      "Tư vấn chuyên biệt cho M&A / gọi vốn",
      "Chuyên gia cố vấn phụ trách riêng",
    ],
  },
];

const faqs = [
  {
    q: "Dịch vụ tư vấn này khác gì so với dịch vụ kế toán và thuế thông thường?",
    a: "Tư vấn tập trung vào các quyết định chiến lược — cơ cấu doanh nghiệp, hoạch định thuế dài hạn, chuẩn bị giao dịch lớn — thay vì xử lý nghiệp vụ hàng ngày.",
  },
  {
    q: "Doanh nghiệp nhỏ có phù hợp sử dụng dịch vụ tư vấn không?",
    a: "Có. Gói Tư vấn theo phiên phù hợp cho doanh nghiệp nhỏ cần giải quyết một vấn đề cụ thể mà không cần cam kết dài hạn.",
  },
  {
    q: "Có thể kết hợp dịch vụ tư vấn với dịch vụ kế toán/thuế hiện tại không?",
    a: "Có. TAF Việt có thể tư vấn dựa trên dữ liệu từ dịch vụ kế toán/thuế hiện có, giúp phương án đề xuất sát với thực tế vận hành.",
  },
  {
    q: "Thông tin doanh nghiệp chia sẻ trong quá trình tư vấn có được bảo mật không?",
    a: "Có. TAF Việt ký thỏa thuận bảo mật (NDA) khi cần thiết và chỉ sử dụng thông tin phục vụ mục đích tư vấn đã thống nhất.",
  },
];

export default function AdvisoryPage() {
  return (
    <ServicePageLayout
      eyebrow="Dịch vụ tư vấn"
      title="Tư vấn tài chính & thuế cho quyết định chiến lược"
      description="TAF Việt đồng hành cùng ban lãnh đạo trong các quyết định quan trọng — từ hoạch định thuế, cơ cấu doanh nghiệp đến chuẩn bị cho các giao dịch lớn."
      included={included}
      steps={steps}
      plans={plans}
      faqs={faqs}
      ctaTitle="Sẵn sàng thảo luận về chiến lược tài chính?"
      ctaDescription="Để lại thông tin, chuyên gia tư vấn của TAF Việt sẽ liên hệ trong vòng 24 giờ."
      contactFormTitle="Đặt lịch tư vấn chiến lược"
      source="service-advisory"
    />
  );
}
