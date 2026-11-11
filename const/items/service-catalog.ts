export type ServiceCatalogItem = {
  id: string;
  href: string;
  titleKey: string;
  enabled?: boolean;
};

export type ServiceCatalogGroup = {
  id: "business" | "personal" | "household";
  href: string;
  titleKey: string;
  descriptionKey: string;
  items: ServiceCatalogItem[];
};

export const serviceCatalog: ServiceCatalogGroup[] = [
  {
    id: "business",
    href: "/services/business",
    titleKey: "serviceGroups.business.title",
    descriptionKey: "serviceGroups.business.description",
    items: [
      {
        id: "accounting",
        href: "/services/accounting",
        titleKey: "serviceGroups.business.items.accounting.title",
      },
      {
        id: "corporate-tax",
        href: "/services/tax-preparation",
        titleKey: "serviceGroups.business.items.corporate-tax.title",
      },
      {
        id: "financial-statements",
        href: "/services/accounting",
        titleKey: "serviceGroups.business.items.financial-statements.title",
      },
      {
        id: "payroll",
        href: "/services/payroll",
        titleKey: "serviceGroups.business.items.payroll.title",
      },
      {
        id: "accounting-review",
        href: "/services/advisory",
        titleKey: "serviceGroups.business.items.accounting-review.title",
      },
      {
        id: "management-accounting",
        href: "/services/advisory",
        titleKey: "serviceGroups.business.items.management-accounting.title",
      },
      {
        id: "business-formation",
        href: "/services/legal",
        titleKey: "serviceGroups.business.items.business-formation.title",
      },
    ],
  },
  {
    id: "personal",
    href: "/services/personal",
    titleKey: "serviceGroups.personal.title",
    descriptionKey: "serviceGroups.personal.description",
    items: [
      {
        id: "pit-finalization",
        href: "/services/personal",
        titleKey: "serviceGroups.personal.items.pit-finalization.title",
      },
      {
        id: "multiple-income",
        href: "/services/personal",
        titleKey: "serviceGroups.personal.items.multiple-income.title",
      },
      {
        id: "tax-refund",
        href: "/services/personal",
        titleKey: "serviceGroups.personal.items.tax-refund.title",
      },
      {
        id: "tax-registration",
        href: "/services/personal",
        titleKey: "serviceGroups.personal.items.tax-registration.title",
      },
      {
        id: "freelancer-tax",
        href: "/services/personal",
        titleKey: "serviceGroups.personal.items.freelancer-tax.title",
      },
      {
        id: "expat-tax",
        href: "/services/personal",
        titleKey: "serviceGroups.personal.items.expat-tax.title",
      },
      {
        id: "tax-notice",
        href: "/services/personal",
        titleKey: "serviceGroups.personal.items.tax-notice.title",
      },
    ],
  },
  {
    id: "household",
    href: "/services/household-business",
    titleKey: "serviceGroups.household.title",
    descriptionKey: "serviceGroups.household.description",
    items: [
      {
        id: "household-accounting",
        href: "/services/household-business",
        titleKey: "serviceGroups.household.items.household-accounting.title",
      },
      {
        id: "household-tax",
        href: "/services/household-business",
        titleKey: "serviceGroups.household.items.household-tax.title",
      },
      {
        id: "revenue-expense",
        href: "/services/household-business",
        titleKey: "serviceGroups.household.items.revenue-expense.title",
      },
      {
        id: "einvoice",
        href: "/services/household-business",
        titleKey: "serviceGroups.household.items.einvoice.title",
      },
      {
        id: "marketplace-reconciliation",
        href: "/services/household-business",
        titleKey:
          "serviceGroups.household.items.marketplace-reconciliation.title",
      },
      {
        id: "multichannel-accounting",
        href: "/services/household-business",
        titleKey: "serviceGroups.household.items.multichannel-accounting.title",
      },
      {
        id: "inventory-cost",
        href: "/services/household-business",
        titleKey: "serviceGroups.household.items.inventory-cost.title",
      },
      {
        id: "household-review",
        href: "/services/household-business",
        titleKey: "serviceGroups.household.items.household-review.title",
      },
      {
        id: "conversion-advisory",
        href: "/services/household-business",
        titleKey: "serviceGroups.household.items.conversion-advisory.title",
      },
    ],
  },
];
