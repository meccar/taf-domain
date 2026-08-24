export const navigation = [
  {
    labelKey: "home",
    href: "/",
  },
  {
    labelKey: "services",
    children: [
      {
        labelKey: "servicesTaxPreparation",
        href: "/services/tax-preparation",
      },
      {
        labelKey: "servicesAccounting",
        href: "/services/accounting",
      },
      {
        labelKey: "servicesPayroll",
        href: "/services/payroll",
      },
      {
        labelKey: "servicesAdvisory",
        href: "/services/advisory",
      },
    ],
  },
  {
    labelKey: "resources",
    children: [
      {
        labelKey: "resourcesGuides",
        href: "/resources",
      },
      {
        labelKey: "resourcesCalculators",
        href: "/resources/calculators",
      },
    ],
  },
  {
    labelKey: "blog",
    href: "/blog",
  },
  {
    labelKey: "about",
    href: "/about",
  },
  {
    labelKey: "contact",
    href: "/contact",
  },
] as const;
