"use client";

import React from "react";
import { useClerk } from "@clerk/nextjs";
import { LogInIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ISignInButtonProps {
  children?: React.ReactNode;
  redirectUrl?: string;
}

export const SignInButton = (props: ISignInButtonProps) => {
  const { children, redirectUrl } = props;

  const clerk = useClerk();

  return (
    <Button
      variant="default"
      className="w-full"
      onClick={() =>
        clerk.redirectToSignIn({
          redirectUrl,
        })
      }
    >
      <LogInIcon className="w-6 h-6" />
      {children}
    </Button>
  );
};
