import {
  BriefcaseBusiness,
  Building2,
  Landmark,
  UserRound,
} from "lucide-react";

// Shape of each item in messages -> ServicesOverview.categories
export type ServiceCategory = {
  name: string;
  description: string;
  href: string;
  services: string[];
};

// Same icon order as the /services page.
export const categoryIcons = [
  BriefcaseBusiness,
  UserRound,
  Building2,
  Landmark,
];

// "/services/household-business" -> "household-business"
// Used as the key for ProblemFinder.problems.<id> and as the selected state.
export function getCategoryId(href: string): string {
  return href.split("/").filter(Boolean).pop() ?? href;
}
