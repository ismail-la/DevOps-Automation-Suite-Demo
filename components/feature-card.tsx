import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DivideIcon as LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  buttonText?: string;
  className?: string;
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
  href,
  buttonText = "Learn More",
  className,
}: FeatureCardProps) {
  return (
    <Card className={`h-full overflow-hidden transition-all duration-200 hover:shadow-lg ${className}`}>
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className="rounded-full bg-primary/10 p-2 text-primary">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="min-h-[4rem] text-base">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" size="sm">
          <Link href={href}>{buttonText}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}