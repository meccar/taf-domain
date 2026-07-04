export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: "Thuế" | "Kế toán" | "Doanh nghiệp" | "Quy định mới";
  date: string;
  readTime: string;
  author: string;
  featured?: boolean;
}

export const categories = [
  "Tất cả",
  "Thuế",
  "Kế toán",
  "Doanh nghiệp",
  "Quy định mới",
] as const;

export const posts: BlogPost[] = [
  {
    slug: "thay-doi-thue-gtgt-2026",
    title: "Những thay đổi mới về thuế GTGT năm 2026 doanh nghiệp cần biết",
    excerpt:
      "Tổng hợp các điều chỉnh về thuế suất, ngưỡng doanh thu và thủ tục kê khai áp dụng từ năm 2026, cùng hướng dẫn cập nhật cho bộ phận kế toán.",
    category: "Thuế",
    date: "28/06/2026",
    readTime: "6 phút đọc",
    author: "TAF Việt",
    featured: true,
  },
  {
    slug: "quyet-toan-thue-tncn",
    title: "Hướng dẫn quyết toán thuế TNCN cuối năm cho người lao động",
    excerpt:
      "Các bước chuẩn bị hồ sơ, thời hạn nộp và những khoản giảm trừ dễ bị bỏ sót khi quyết toán.",
    category: "Thuế",
    date: "20/06/2026",
    readTime: "5 phút đọc",
    author: "TAF Việt",
  },
  {
    slug: "sai-lam-bao-cao-tai-chinh",
    title: "5 sai lầm phổ biến khi lập báo cáo tài chính",
    excerpt:
      "Những lỗi thường gặp khiến báo cáo tài chính bị từ chối hoặc phải điều chỉnh, và cách phòng tránh.",
    category: "Kế toán",
    date: "14/06/2026",
    readTime: "4 phút đọc",
    author: "TAF Việt",
  },
  {
    slug: "chuyen-doi-so-ke-toan",
    title: "Chuyển đổi số trong kế toán: Doanh nghiệp nhỏ nên bắt đầu từ đâu?",
    excerpt:
      "Lộ trình từng bước để số hóa quy trình kế toán mà không làm gián đoạn vận hành hiện tại.",
    category: "Kế toán",
    date: "05/06/2026",
    readTime: "7 phút đọc",
    author: "TAF Việt",
  },
  {
    slug: "thu-tuc-thanh-lap-doanh-nghiep",
    title: "Thủ tục thành lập doanh nghiệp mới nhất 2026",
    excerpt:
      "Hồ sơ, quy trình và thời gian xử lý khi đăng ký thành lập công ty theo quy định hiện hành.",
    category: "Doanh nghiệp",
    date: "29/05/2026",
    readTime: "5 phút đọc",
    author: "TAF Việt",
  },
  {
    slug: "hoa-don-dien-tu",
    title: "Nghị định mới về hóa đơn điện tử: Những điều cần lưu ý",
    excerpt:
      "Điểm qua các quy định mới nhất về hóa đơn điện tử và mốc thời gian doanh nghiệp cần tuân thủ.",
    category: "Quy định mới",
    date: "22/05/2026",
    readTime: "4 phút đọc",
    author: "TAF Việt",
  },
  {
    slug: "toi-uu-chi-phi-thue",
    title: "Tối ưu chi phí thuế hợp pháp cho doanh nghiệp vừa và nhỏ",
    excerpt:
      "Các phương án hoạch định thuế hợp pháp giúp doanh nghiệp vừa và nhỏ tối ưu dòng tiền.",
    category: "Thuế",
    date: "15/05/2026",
    readTime: "6 phút đọc",
    author: "TAF Việt",
  },
  {
    slug: "phan-biet-ke-toan-quan-tri-tai-chinh",
    title: "Phân biệt kế toán quản trị và kế toán tài chính",
    excerpt:
      "Hai mảng kế toán này phục vụ mục đích khác nhau — doanh nghiệp cần hiểu rõ để vận hành hiệu quả.",
    category: "Kế toán",
    date: "08/05/2026",
    readTime: "4 phút đọc",
    author: "TAF Việt",
  },
];
