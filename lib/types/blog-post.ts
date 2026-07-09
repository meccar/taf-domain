export type PostCategory = "Thuế" | "Kế toán" | "Doanh nghiệp" | "Quy định mới";

export const categories: PostCategory[] = [
  "Thuế",
  "Kế toán",
  "Doanh nghiệp",
  "Quy định mới",
];

export interface DbPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string | null;
  category: PostCategory;
  author: string;
  featured: boolean;
  status: "draft" | "published";
  created_at: string;
  updated_at: string;
}
