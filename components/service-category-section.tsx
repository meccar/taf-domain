import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ServiceCatalogGroup } from "@/const/items/service-catalog";

export function ServiceCategorySection({
  group,
  title,
  description,
  icon,
}: {
  group: ServiceCatalogGroup;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const Icon = icon;

  return (
    <Card className="h-full border-none bg-muted/30">
      <CardHeader className="gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div className="space-y-2">
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription className="text-sm leading-relaxed">
            {description}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {group.items.map((item) => (
            <li key={item.id} className="flex items-start gap-2">
              <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <Link href={item.href} className="hover:text-primary">
                {item.titleKey}
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="pt-3">
        <Button variant="outline" asChild className="w-full sm:w-auto">
          <Link href={group.href}>
            View details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
