import {
  BookOpen,
  FileBarChart,
  Wallet,
  Landmark,
  ClipboardCheck,
  RefreshCw,
} from "lucide-react";
import { ServicePageLayout } from "@/components/service-page-layout";

export const metadata = {
  title: "Dịch vụ kế toán trọn gói | TAF Việt",
  description:
    "TAF Việt cung cấp dịch vụ kế toán trọn gói: ghi sổ, lập báo cáo tài chính, bảng lương — chính xác, minh bạch, đúng chuẩn mực kế toán Việt Nam.",
};

const included = [
  {
    icon: BookOpen,
    title: "Ghi sổ kế toán hàng tháng",
    description:
      "Hạch toán chứng từ, cập nhật sổ sách theo đúng chế độ kế toán doanh nghiệp hiện hành.",
  },
  {
    icon: FileBarChart,
    title: "Lập báo cáo tài chính",
    description:
      "Bảng cân đối kế toán, báo cáo kết quả kinh doanh, lưu chuyển tiền tệ cuối năm tài chính.",
  },
  {
    icon: Wallet,
    title: "Quản lý bảng lương",
    description:
      "Tính lương, bảo hiểm xã hội, thuế TNCN và các khoản trích nộp theo quy định.",
  },
  {
    icon: Landmark,
    title: "Đối chiếu công nợ & ngân hàng",
    description:
      "Rà soát công nợ phải thu, phải trả và đối chiếu sao kê ngân hàng định kỳ.",
  },
  {
    icon: ClipboardCheck,
    title: "Kiểm tra & chuẩn hóa sổ sách",
    description:
      "Rà soát sổ sách cũ, phát hiện sai lệch và chuẩn hóa lại theo đúng chuẩn mực kế toán.",
  },
  {
    icon: RefreshCw,
    title: "Chuyển đổi phần mềm kế toán",
    description:
      "Hỗ trợ di chuyển dữ liệu và thiết lập phần mềm kế toán phù hợp với quy mô doanh nghiệp.",
  },
];

const steps = [
  {
    title: "Tiếp nhận chứng từ",
    description:
      "Thu thập hóa đơn, phiếu thu chi, sao kê ngân hàng và các chứng từ phát sinh trong kỳ.",
  },
  {
    title: "Hạch toán & ghi sổ",
    description:
      "Phân loại, hạch toán nghiệp vụ vào sổ sách theo đúng tài khoản kế toán.",
  },
  {
    title: "Đối chiếu số liệu",
    description:
      "Kiểm tra khớp đúng giữa sổ sách, công nợ và số dư ngân hàng thực tế.",
  },
  {
    title: "Lập báo cáo",
    description:
      "Tổng hợp báo cáo tài chính, báo cáo quản trị theo tháng/quý/năm.",
  },
  {
    title: "Bàn giao & tư vấn",
    description:
      "Gửi báo cáo kèm giải thích số liệu và khuyến nghị vận hành cho kỳ tiếp theo.",
  },
];

const plans = [
  {
    name: "Cơ bản",
    price: "2.000.000đ",
    period: "/ tháng",
    description: "Phù hợp doanh nghiệp mới, phát sinh ít giao dịch.",
    features: [
      "Ghi sổ kế toán hàng tháng",
      "Đối chiếu công nợ cơ bản",
      "Hỗ trợ qua email",
    ],
  },
  {
    name: "Tiêu chuẩn",
    price: "4.500.000đ",
    period: "/ tháng",
    description:
      "Phù hợp doanh nghiệp vừa và nhỏ có bảng lương và nhiều giao dịch.",
    features: [
      "Toàn bộ gói Cơ bản",
      "Quản lý bảng lương & bảo hiểm",
      "Báo cáo tài chính hàng quý",
      "Hỗ trợ ưu tiên qua điện thoại",
    ],
    highlighted: true,
  },
  {
    name: "Chuyên sâu",
    price: "Liên hệ",
    period: "",
    description: "Phù hợp doanh nghiệp có quy mô lớn hoặc nhiều chi nhánh.",
    features: [
      "Toàn bộ gói Tiêu chuẩn",
      "Báo cáo quản trị theo yêu cầu",
      "Kế toán trưởng phụ trách riêng",
      "Tư vấn chuyển đổi hệ thống kế toán",
    ],
  },
];

const faqs = [
  {
    q: "Doanh nghiệp đang dùng phần mềm kế toán khác có chuyển đổi được không?",
    a: "Có. TAF Việt hỗ trợ rà soát dữ liệu cũ và chuyển đổi sang hệ thống phù hợp mà không làm gián đoạn vận hành.",
  },
  {
    q: "Báo cáo tài chính được lập theo chuẩn nào?",
    a: "Theo chuẩn mực kế toán Việt Nam (VAS) hiện hành, phù hợp với quy mô và loại hình doanh nghiệp.",
  },
  {
    q: "Có thể chỉ thuê dịch vụ tính lương, không dùng trọn gói không?",
    a: "Có. Doanh nghiệp có thể chọn riêng hạng mục bảng lương hoặc kết hợp cùng các dịch vụ khác theo nhu cầu.",
  },
  {
    q: "Dữ liệu kế toán của doanh nghiệp có được bảo mật không?",
    a: "TAF Việt cam kết bảo mật thông tin theo thỏa thuận hợp đồng và chỉ chia sẻ dữ liệu khi có sự đồng ý của doanh nghiệp.",
  },
];

export default function AccountingPage() {
  return (
    <ServicePageLayout
      eyebrow="Dịch vụ kế toán"
      title="Kế toán trọn gói, chính xác và minh bạch"
      description="Từ ghi sổ hàng tháng đến báo cáo tài chính cuối năm, TAF Việt giúp doanh nghiệp vận hành sổ sách gọn gàng, đúng chuẩn mực kế toán Việt Nam."
      included={included}
      steps={steps}
      plans={plans}
      faqs={faqs}
      ctaTitle="Sẵn sàng để TAF Việt lo phần sổ sách?"
      ctaDescription="Để lại thông tin, đội ngũ TAF Việt sẽ liên hệ tư vấn trong vòng 24 giờ."
      contactFormTitle="Yêu cầu tư vấn dịch vụ kế toán"
      source="service-accounting"
    />
  );
}
