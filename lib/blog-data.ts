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
