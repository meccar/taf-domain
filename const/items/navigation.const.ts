// navigation.ts

export const navigation = [
  {
    label: "Trang chủ",
    href: "/",
  },
  {
    label: "Dịch vụ",
    children: [
      {
        label: "Kê khai thuế",
        href: "/services/tax-preparation",
      },
      {
        label: "Kế toán & Ghi sổ",
        href: "/services/accounting",
      },
      {
        label: "Dịch vụ tiền lương",
        href: "/services/payroll",
      },
      {
        label: "Tư vấn & Cố vấn",
        href: "/services/advisory",
      },
    ],
  },
  {
    label: "Tài nguyên",
    children: [
      {
        label: "Hướng dẫn & Biểu mẫu",
        href: "/resources",
      },
      {
        label: "Máy tính thuế",
        href: "/resources/calculators",
      },
    ],
  },
  {
    label: "Bài viết",
    href: "/blog",
  },
  {
    label: "Về chúng tôi",
    href: "/about",
  },
  {
    label: "Liên hệ",
    href: "/contact",
  },
];
