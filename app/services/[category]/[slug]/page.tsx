import { notFound } from "next/navigation";
import {
  ArrowRight,
  BadgeDollarSign,
  BriefcaseBusiness,
  Building2,
  Calculator,
  FileText,
  Landmark,
  ReceiptText,
  ShieldCheck,
  Store,
  TrendingUp,
  UserRound,
  Users,
} from "lucide-react";
import {
  AudienceSection,
  ContactCTASection,
  DeliverablesSection,
  FAQSection,
  PricingSection,
  ProblemsSection,
  ProcessSection,
  ServiceHeroSection,
  SolutionsSection,
  ChecklistSection,
} from "@/components/services";
import { getLocale, getTranslations } from "next-intl/server";

const SERVICE_DETAIL_ROUTES = [
  { category: "business", slug: "accounting" },
  { category: "business", slug: "corporate-tax-compliance" },
  { category: "business", slug: "financial-statements" },
  { category: "business", slug: "payroll" },
  { category: "business", slug: "accounting-review" },
  { category: "business", slug: "management-accounting" },
  { category: "personal", slug: "pit-finalization" },
  { category: "personal", slug: "multiple-income" },
  { category: "personal", slug: "tax-refund" },
  { category: "personal", slug: "tax-registration" },
  { category: "personal", slug: "freelancer-tax" },
  { category: "personal", slug: "expat-tax" },
  { category: "personal", slug: "tax-notice" },
  { category: "household-business", slug: "household-accounting" },
  { category: "household-business", slug: "household-tax" },
  { category: "household-business", slug: "revenue-expense" },
  { category: "household-business", slug: "einvoice" },
  { category: "household-business", slug: "marketplace-reconciliation" },
  { category: "household-business", slug: "multichannel-accounting" },
  { category: "household-business", slug: "inventory-cost" },
  { category: "household-business", slug: "household-review" },
] as const;

const CATEGORY_META = {
  business: {
    en: {
      label: "Business support",
      summary:
        "Corporate compliance, payroll, and financial review support for operating companies.",
    },
    vi: {
      label: "Hỗ trợ doanh nghiệp",
      summary:
        "Hỗ trợ tuân thủ doanh nghiệp, tiền lương và rà soát tài chính cho doanh nghiệp đang vận hành.",
    },
  },
  personal: {
    en: {
      label: "Personal tax support",
      summary:
        "Tax filing, income review, and advisory support for employees, freelancers, and individuals.",
    },
    vi: {
      label: "Hỗ trợ thuế cá nhân",
      summary:
        "Hỗ trợ khai báo thuế, rà soát thu nhập và tư vấn cho cá nhân, freelancer và người làm việc độc lập.",
    },
  },
  "household-business": {
    en: {
      label: "Household business support",
      summary:
        "Practical accounting, revenue tracking, and tax guidance for household businesses and online sellers.",
    },
    vi: {
      label: "Hỗ trợ hộ kinh doanh",
      summary:
        "Hỗ trợ kế toán thực tế, theo dõi doanh thu và tư vấn thuế cho hộ kinh doanh và người bán online.",
    },
  },
} as const;

const genericSteps = {
  en: [
    {
      title: "Document intake",
      description:
        "Collect the relevant records, transactions, and supporting documents for review.",
    },
    {
      title: "Review and reconcile",
      description:
        "Assess the current data, identify gaps, and compare the figures against expected reporting standards.",
    },
    {
      title: "Prepare recommendations",
      description:
        "Turn the findings into a clear action plan, deadlines, and decision-ready guidance.",
    },
    {
      title: "Implementation support",
      description:
        "Stay involved through submission, follow-up, or the next review cycle as needed.",
    },
  ],
  vi: [
    {
      title: "Thu thập hồ sơ",
      description:
        "Tổng hợp chứng từ, dữ liệu và hồ sơ liên quan để kiểm tra thực trạng ban đầu.",
    },
    {
      title: "Rà soát và đối chiếu",
      description:
        "Đánh giá dữ liệu hiện có, phát hiện điểm chưa hợp lý và so sánh với tiêu chuẩn báo cáo cần thiết.",
    },
    {
      title: "Lập phương án hỗ trợ",
      description:
        "Chuyển thông tin thành kế hoạch hành động, mốc thời gian và định hướng quyết định rõ ràng.",
    },
    {
      title: "Hỗ trợ triển khai",
      description:
        "Theo dõi quá trình nộp hồ sơ, xử lý bổ sung hoặc rà soát kỳ tiếp theo khi cần thiết.",
    },
  ],
};

const detailPlans = {
  en: [
    {
      name: "Starter",
      price: "From 1,500,000đ",
      period: "/ month",
      description:
        "A lightweight plan for small volumes and regular compliance tracking.",
      features: [
        "Core review and filing support",
        "Email guidance",
        "Deadline tracking",
      ],
    },
    {
      name: "Growth",
      price: "From 3,500,000đ",
      period: "/ month",
      description:
        "Built for ongoing work, more documents, and recurring operational support.",
      features: [
        "All Starter features",
        "Priority review cycle",
        "Monthly checkpoints",
      ],
      highlighted: true,
    },
    {
      name: "Custom",
      price: "Contact",
      period: "",
      description:
        "For larger or more complex situations needing dedicated advisory support.",
      features: [
        "Dedicated specialist",
        "Tailored workflow",
        "Strategic planning support",
      ],
    },
  ],
  vi: [
    {
      name: "Cơ bản",
      price: "Từ 1.500.000đ",
      period: "/ tháng",
      description: "Gói nhẹ cho quy mô nhỏ và theo dõi tuân thủ định kỳ.",
      features: [
        "Hỗ trợ rà soát và nộp hồ sơ cơ bản",
        "Hỗ trợ qua email",
        "Theo dõi thời hạn",
      ],
    },
    {
      name: "Phát triển",
      price: "Từ 3.500.000đ",
      period: "/ tháng",
      description:
        "Phù hợp với các công việc định kỳ, nhiều hồ sơ và nhu cầu hỗ trợ vận hành thường xuyên.",
      features: [
        "Tất cả tính năng Cơ bản",
        "Chu kỳ rà soát ưu tiên",
        "Theo dõi định kỳ",
      ],
      highlighted: true,
    },
    {
      name: "Tùy chỉnh",
      price: "Liên hệ",
      period: "",
      description:
        "Dành cho doanh nghiệp lớn hoặc trường hợp cần hỗ trợ tư vấn chuyên biệt.",
      features: [
        "Chuyên gia riêng",
        "Quy trình tùy chỉnh",
        "Hỗ trợ lập kế hoạch chiến lược",
      ],
    },
  ],
};

function slugToTitle(category: string, slug: string, locale: string) {
  const raw = slug
    .split("-")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");

  if (locale === "vi") {
    if (category === "business") return `${raw} cho doanh nghiệp`;
    if (category === "personal") return `${raw} cho cá nhân`;
    return `${raw} cho hộ kinh doanh`;
  }

  return raw;
}

function getAudienceIcons(category: string) {
  if (category === "business")
    return [BriefcaseBusiness, Building2, Users, Landmark];
  if (category === "personal")
    return [UserRound, Calculator, ReceiptText, ShieldCheck];
  return [Store, BadgeDollarSign, TrendingUp, ArrowRight];
}

function getSolutionIcons(category: string) {
  if (category === "business")
    return [BriefcaseBusiness, Landmark, ShieldCheck, TrendingUp];
  if (category === "personal")
    return [UserRound, Calculator, ReceiptText, ShieldCheck];
  return [Store, TrendingUp, FileText, ArrowRight];
}

export function generateStaticParams() {
  return [...SERVICE_DETAIL_ROUTES] as Array<{
    category: string;
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const locale = await getLocale();
  const categoryInfo = CATEGORY_META[category as keyof typeof CATEGORY_META];

  if (!categoryInfo) {
    return {
      title: "Service details | TAF Việt",
    };
  }

  const title = slugToTitle(category, slug, locale);
  const description = categoryInfo[locale === "en" ? "en" : "vi"].summary;

  return {
    title: `${title} | TAF Việt`,
    description,
    alternates: {
      canonical: `/services/${category}/${slug}`,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const locale = await getLocale();
  const layoutT = await getTranslations("ServicePageLayout");
  const categoryInfo = CATEGORY_META[category as keyof typeof CATEGORY_META];

  if (!categoryInfo) {
    notFound();
  }

  const copy = categoryInfo[locale === "en" ? "en" : "vi"];
  const title = slugToTitle(category, slug, locale);
  const description = `${copy.summary} TAF Việt helps keep the process clear, compliant, and tailored to each service request.`;
  const steps = genericSteps[locale === "en" ? "en" : "vi"];
  const plans = detailPlans[locale === "en" ? "en" : "vi"];
  const faqs =
    locale === "en"
      ? [
          {
            question: "How quickly can we start?",
            answer:
              "Most clients can begin after we receive the necessary documents and confirm the scope of work.",
          },
          {
            question: "Can the service be tailored to our business?",
            answer:
              "Yes. We match the workflow, review points, and communication cadence to the operational reality of your company or household business.",
          },
          {
            question:
              "Do you support ongoing follow-up after the first review?",
            answer:
              "Yes. We can continue with monthly checks, follow-ups, or compliance support depending on the service package you choose.",
          },
        ]
      : [
          {
            question: "Mất bao lâu để bắt đầu?",
            answer:
              "Hầu hết khách hàng có thể bắt đầu sau khi chúng tôi nhận đủ hồ sơ và xác nhận phạm vi công việc.",
          },
          {
            question:
              "Dịch vụ có thể tùy chỉnh theo mô hình doanh nghiệp không?",
            answer:
              "Có. Chúng tôi căn chỉnh quy trình, nội dung rà soát và nhịp làm việc phù hợp với thực tế vận hành của doanh nghiệp hoặc hộ kinh doanh.",
          },
          {
            question: "Sau khi rà soát lần đầu có hỗ trợ theo dõi tiếp không?",
            answer:
              "Có. Chúng tôi có thể tiếp tục hỗ trợ theo tháng, theo quý hoặc theo nhu cầu theo gói dịch vụ đã chọn.",
          },
        ];

  const audiences =
    locale === "en"
      ? [
          {
            title: "Businesses with recurring activity",
            description:
              "Teams needing a clearer, more consistent way to manage filings and records.",
          },
          {
            title: "Growing operations",
            description:
              "Companies that need stronger reporting and better compliance follow-through.",
          },
          {
            title: "Owners managing multiple priorities",
            description:
              "Leaders who want more clarity without turning every task into an internal bottleneck.",
          },
          {
            title: "New or transitional periods",
            description:
              "Periods where structure, reporting, or legal review needs extra attention.",
          },
        ]
      : [
          {
            title: "Doanh nghiệp có hoạt động thường xuyên",
            description:
              "Các đội cần quy trình rõ ràng hơn để quản lý hồ sơ và nghĩa vụ kê khai.",
          },
          {
            title: "Doanh nghiệp đang tăng trưởng",
            description:
              "Công ty cần báo cáo rõ hơn và hỗ trợ tuân thủ tốt hơn theo giai đoạn phát triển.",
          },
          {
            title: "Chủ doanh nghiệp quản lý nhiều việc",
            description:
              "Lãnh đạo muốn đơn giản hóa quy trình mà không làm chậm hoạt động nội bộ.",
          },
          {
            title: "Giai đoạn mới hoặc chuyển đổi",
            description:
              "Thời điểm cần tăng cường cấu trúc, báo cáo hoặc rà soát pháp lý.",
          },
        ];

  const problems =
    locale === "en"
      ? [
          {
            title: "Records are not organized consistently",
            description:
              "The business may have documents spread across different tools and teams.",
          },
          {
            title: "Deadlines are easy to miss",
            description:
              "Monthly or quarterly compliance work can fall behind without a defined rhythm.",
          },
          {
            title: "Reports are not decision-ready",
            description:
              "The numbers exist, but they are not yet structured to support strategic decisions.",
          },
          {
            title: "Business owners need clarity",
            description:
              "The team wants a practical answer about what is going on and what to do next.",
          },
        ]
      : [
          {
            title: "Hồ sơ không được sắp xếp đều đặn",
            description:
              "Doanh nghiệp có thể đang lưu chứng từ rải rác trên nhiều công cụ và bộ phận khác nhau.",
          },
          {
            title: "Dễ bỏ lỡ thời hạn",
            description:
              "Công việc tuân thủ theo tháng hoặc quý có thể trễ nếu không có nhịp theo dõi rõ ràng.",
          },
          {
            title: "Báo cáo chưa sẵn sàng cho quyết định",
            description:
              "Số liệu đã có nhưng chưa được cấu trúc để hỗ trợ ra quyết định chiến lược.",
          },
          {
            title: "Chủ doanh nghiệp cần rõ hướng đi",
            description:
              "Đội ngũ muốn biết tình hình thực tế và bước đi tiếp theo một cách thực tiễn.",
          },
        ];

  const solutions =
    locale === "en"
      ? [
          {
            title: "Tailored process design",
            description:
              "Set up a workflow that matches your documents, deadlines, and reporting rhythm.",
            href: "/contact",
          },
          {
            title: "Clear reconciliation and review",
            description:
              "Check records, identify weak points, and reduce avoidable follow-up work.",
            href: "/contact",
          },
          {
            title: "Practical advice and planning",
            description:
              "Translate findings into a realistic next step for operations and compliance.",
            href: "/contact",
          },
        ]
      : [
          {
            title: "Thiết kế quy trình phù hợp",
            description:
              "Xây dựng quy trình phù hợp với hồ sơ, thời hạn và nhịp báo cáo thực tế của bạn.",
            href: "/contact",
          },
          {
            title: "Rà soát và đối chiếu rõ ràng",
            description:
              "Kiểm tra dữ liệu, phát hiện điểm yếu và giảm công việc bổ sung không cần thiết.",
            href: "/contact",
          },
          {
            title: "Tư vấn thực tế và lập kế hoạch",
            description:
              "Chuyển kết quả rà soát thành bước đi thực tế cho vận hành và tuân thủ.",
            href: "/contact",
          },
        ];

  const documents =
    locale === "en"
      ? [
          "Related account statements and transaction records",
          "Invoices, vouchers, and supporting documents",
          "Bank or payment confirmations",
          "Previous filings or historical reports if available",
          "Operational notes relevant to the service scope",
        ]
      : [
          "Sao kê liên quan và hồ sơ giao dịch",
          "Hóa đơn, chứng từ và giấy tờ hỗ trợ",
          "Xác nhận ngân hàng hoặc thanh toán",
          "Hồ sơ khai báo trước đó hoặc báo cáo lịch sử nếu có",
          "Ghi chú hoạt động liên quan đến phạm vi dịch vụ",
        ];

  const deliverables =
    locale === "en"
      ? [
          "Clear service summary",
          "Action checklist for next steps",
          "Review notes and key risk points",
          "Recommended working plan",
          "Support notes for ongoing reporting",
        ]
      : [
          "Bản tóm tắt dịch vụ rõ ràng",
          "Checklist hành động cho bước tiếp theo",
          "Ghi chú rà soát và điểm rủi ro chính",
          "Kế hoạch làm việc đề xuất",
          "Ghi chú hỗ trợ cho báo cáo tiếp theo",
        ];

  const audienceIcons = getAudienceIcons(category);
  const solutionIcons = getSolutionIcons(category);

  return (
    <main className="w-full">
      <ServiceHeroSection
        eyebrow={copy.label}
        title={title}
        description={description}
        primaryLabel={layoutT("freeConsultation")}
        secondaryLabel={layoutT("viewPricing")}
        secondaryHref="#pricing"
      />

      <ChecklistSection
        eyebrow={locale === "en" ? "Service scope" : "Phạm vi dịch vụ"}
        title={locale === "en" ? "What we handle" : "Những gì chúng tôi xử lý"}
        items={documents}
      />

      <ProcessSection
        eyebrow={layoutT("process")}
        title={layoutT("processTitle", { count: steps.length })}
        steps={steps}
      />

      <PricingSection
        eyebrow={layoutT("pricing")}
        title={layoutT("pricingTitle")}
        plans={plans}
        primaryLabel={layoutT("contactButton")}
      />

      <AudienceSection
        eyebrow={locale === "en" ? "Who it is for" : "Đối tượng phù hợp"}
        title={locale === "en" ? "Who it is for" : "Đối tượng phù hợp"}
        items={audiences.map((item, index) => ({
          ...item,
          icon: audienceIcons[index % audienceIcons.length],
        }))}
      />

      <ProblemsSection
        eyebrow={locale === "en" ? "Common issues" : "Vấn đề thường gặp"}
        title={locale === "en" ? "Common issues" : "Vấn đề thường gặp"}
        items={problems.map((item, index) => ({
          ...item,
          icon: audienceIcons[(index + 1) % audienceIcons.length],
        }))}
      />

      <SolutionsSection
        eyebrow={locale === "en" ? "How we help" : "Cách chúng tôi hỗ trợ"}
        title={locale === "en" ? "How we help" : "Cách chúng tôi hỗ trợ"}
        items={solutions.map((item, index) => ({
          ...item,
          icon: solutionIcons[index % solutionIcons.length],
        }))}
      />

      <DeliverablesSection
        eyebrow={locale === "en" ? "Deliverables" : "Kết quả nhận được"}
        title={locale === "en" ? "Deliverables" : "Kết quả nhận được"}
        items={deliverables}
      />

      <FAQSection
        eyebrow={layoutT("faq")}
        title={layoutT("faqTitle")}
        items={faqs}
      />

      <ContactCTASection
        title={
          locale === "en"
            ? "Need help with this service?"
            : "Cần hỗ trợ cho dịch vụ này?"
        }
        description={
          locale === "en"
            ? "Share a few details and TAF Việt will recommend the most suitable next step for your situation."
            : "Chia sẻ một vài thông tin và TAF Việt sẽ đề xuất bước tiếp theo phù hợp nhất cho tình huống của bạn."
        }
        source={`service-${category}`}
        contactFormTitle={
          locale === "en" ? "Request a consultation" : "Yêu cầu tư vấn"
        }
        primaryLabel={layoutT("contactButton")}
      />
    </main>
  );
}
