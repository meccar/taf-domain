export const MenuItems: any[] = [
  { label: "Trang chủ", command: () => (window.location.href = "/") },
  {
    label: "Dịch vụ",
    items: [
      [
        {
          items: [
            {
              label: "Kê khai thuế",
              command: () =>
                (window.location.href = "/services/tax-preparation"),
            },
            {
              label: "Kế toán & Ghi sổ",
              command: () => (window.location.href = "/services/accounting"),
            },
            {
              label: "Dịch vụ tiền lương",
              command: () => (window.location.href = "/services/payroll"),
            },
            {
              label: "Tư vấn & Cố vấn",
              command: () => (window.location.href = "/services/advisory"),
            },
          ],
        },
      ],
    ],
  },
  {
    label: "Tài nguyên",
    items: [
      [
        {
          items: [
            {
              label: "Hướng dẫn & Biểu mẫu",
              command: () => (window.location.href = "/resources"),
            },
            {
              label: "Máy tính thuế",
              command: () => (window.location.href = "/resources/calculators"),
            },
          ],
        },
      ],
    ],
  },
  { label: "Bài viết", command: () => (window.location.href = "/blog") },
  { label: "Về chúng tôi", command: () => (window.location.href = "/about") },
  { label: "Liên hệ", command: () => (window.location.href = "/contact") },
  {
    label: "Cổng khách hàng",
    command: () => (window.location.href = "/client-portal"),
  },
];
