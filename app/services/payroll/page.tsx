import {
  Users,
  Wallet,
  ShieldCheck,
  Landmark,
  FileSpreadsheet,
  BellRing,
} from "lucide-react";
import { ServicePageLayout } from "@/components/service-page-layout";

export const metadata = {
  title: "Dịch vụ tính lương & bảo hiểm | TAF Việt",
  description:
    "TAF Việt xử lý bảng lương, bảo hiểm xã hội và thuế TNCN hàng tháng cho doanh nghiệp — chính xác, đúng hạn, đúng quy định.",
};

const included = [
  {
    icon: Wallet,
    title: "Tính lương hàng tháng",
    description:
      "Tính lương, thưởng, phụ cấp và các khoản khấu trừ theo bảng chấm công thực tế.",
  },
  {
    icon: ShieldCheck,
    title: "Bảo hiểm xã hội, y tế, thất nghiệp",
    description:
      "Lập hồ sơ tăng/giảm lao động, tính và theo dõi các khoản trích nộp bảo hiểm bắt buộc.",
  },
  {
    icon: Users,
    title: "Thuế TNCN từ tiền lương",
    description:
      "Tính thuế thu nhập cá nhân khấu trừ hàng tháng theo biểu lũy tiến và giảm trừ gia cảnh.",
  },
  {
    icon: FileSpreadsheet,
    title: "Phiếu lương & báo cáo",
    description:
      "Xuất phiếu lương chi tiết cho từng nhân viên và báo cáo tổng hợp quỹ lương cho doanh nghiệp.",
  },
  {
    icon: Landmark,
    title: "Chi trả qua ngân hàng",
    description:
      "Lập danh sách ủy nhiệm chi để doanh nghiệp thực hiện thanh toán lương qua ngân hàng.",
  },
  {
    icon: BellRing,
    title: "Nhắc hạn & cập nhật quy định",
    description:
      "Theo dõi thời hạn nộp bảo hiểm, quyết toán TNCN và cập nhật khi có thay đổi mức lương tối thiểu.",
  },
];

const steps = [
  {
    title: "Nhận bảng chấm công",
    description:
      "Doanh nghiệp gửi bảng chấm công, thông tin tăng giảm nhân sự trong tháng.",
  },
  {
    title: "Tính lương & khấu trừ",
    description:
      "Tính lương gộp, các khoản bảo hiểm, thuế TNCN và lương thực nhận cho từng nhân viên.",
  },
  {
    title: "Đối soát với doanh nghiệp",
    description:
      "Gửi bảng lương nháp để doanh nghiệp xác nhận trước khi chốt số liệu.",
  },
  {
    title: "Xuất phiếu lương & hồ sơ bảo hiểm",
    description:
      "Hoàn thiện phiếu lương từng nhân viên và hồ sơ bảo hiểm xã hội cần nộp trong kỳ.",
  },
  {
    title: "Bàn giao & lưu trữ",
    description:
      "Gửi báo cáo quỹ lương hàng tháng và lưu trữ hồ sơ phục vụ quyết toán cuối năm.",
  },
];

const plans = [
  {
    name: "Cơ bản",
    price: "1.200.000đ",
    period: "/ tháng",
    description: "Phù hợp doanh nghiệp dưới 10 nhân sự.",
    features: [
      "Tính lương hàng tháng",
      "Phiếu lương từng nhân viên",
      "Hỗ trợ qua email",
    ],
  },
  {
    name: "Tiêu chuẩn",
    price: "2.800.000đ",
    period: "/ tháng",
    description: "Phù hợp doanh nghiệp 10–50 nhân sự.",
    features: [
      "Toàn bộ gói Cơ bản",
      "Quản lý bảo hiểm xã hội, y tế, thất nghiệp",
      "Tính thuế TNCN khấu trừ hàng tháng",
      "Hỗ trợ ưu tiên qua điện thoại",
    ],
    highlighted: true,
  },
  {
    name: "Chuyên sâu",
    price: "Liên hệ",
    period: "",
    description: "Phù hợp doanh nghiệp trên 50 nhân sự hoặc nhiều chi nhánh.",
    features: [
      "Toàn bộ gói Tiêu chuẩn",
      "Quyết toán thuế TNCN cuối năm",
      "Báo cáo quỹ lương theo phòng ban",
      "Chuyên viên phụ trách riêng",
    ],
  },
];

const faqs = [
  {
    q: "TAF Việt có xử lý được nhiều mức lương và phụ cấp khác nhau không?",
    a: "Có. Hệ thống tính lương của TAF Việt hỗ trợ cấu hình linh hoạt theo từng vị trí, phụ cấp và chính sách thưởng riêng của doanh nghiệp.",
  },
  {
    q: "Nếu có nhân viên vào/nghỉ giữa tháng thì tính lương thế nào?",
    a: "TAF Việt tính lương theo số ngày công thực tế và cập nhật hồ sơ bảo hiểm tăng/giảm tương ứng trong kỳ đó.",
  },
  {
    q: "Dữ liệu lương của nhân viên có được bảo mật không?",
    a: "Có. Thông tin lương được xử lý bảo mật và chỉ những người được ủy quyền từ phía doanh nghiệp mới có quyền truy cập.",
  },
  {
    q: "Có hỗ trợ quyết toán thuế TNCN cuối năm cho nhân viên không?",
    a: "Có, trong gói Chuyên sâu. Với các gói khác, TAF Việt có thể bổ sung dịch vụ này theo yêu cầu riêng.",
  },
];

export default function PayrollPage() {
  return (
    <ServicePageLayout
      eyebrow="Dịch vụ tính lương"
      title="Bảng lương & bảo hiểm chính xác, đúng hạn mỗi tháng"
      description="TAF Việt xử lý toàn bộ quy trình tính lương, bảo hiểm xã hội và thuế TNCN cho nhân viên — giúp doanh nghiệp giảm tải công việc hành chính và tránh sai sót."
      included={included}
      steps={steps}
      plans={plans}
      faqs={faqs}
      ctaTitle="Sẵn sàng để TAF Việt lo phần bảng lương?"
      ctaDescription="Để lại thông tin, đội ngũ TAF Việt sẽ liên hệ tư vấn trong vòng 24 giờ."
      contactFormTitle="Yêu cầu tư vấn dịch vụ tính lương"
      source="service-payroll"
    />
  );
}
