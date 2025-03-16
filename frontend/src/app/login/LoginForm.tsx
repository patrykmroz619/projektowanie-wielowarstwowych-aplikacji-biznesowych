import type React from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignInButton } from "@/lib/auth";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Logowanie</CardTitle>
          <CardDescription>Zaloguj się go swojego konta</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <SignInButton redirectUrl="/dashboard">
              Zaloguj się z Clerk
            </SignInButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
