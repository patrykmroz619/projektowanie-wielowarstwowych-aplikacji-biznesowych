import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TestimonialCardProps {
  initials: string;
  name: string;
  description: string;
  quote: string;
}

const TestimonialCard = ({
  initials,
  name,
  description,
  quote,
}: TestimonialCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-lg font-bold text-primary">{initials}</span>
          </div>
          <div>
            <CardTitle>{name}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">&quot;{quote}&quot;</p>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
