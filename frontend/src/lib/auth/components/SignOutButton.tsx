"use client";

import React, { ReactNode } from "react";
import { useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";

interface ISignOutButtonProps {
  children?: ReactNode;
}

export const SignOutButton = (props: ISignOutButtonProps) => {
  const { children } = props;

  const auth = useAuth();

  return (
    <Button
      variant="secondary"
      onClick={() =>
        auth.signOut({
          redirectUrl: "/login",
        })
      }
    >
      <LogOutIcon className="w-6 h-6" />
      {children}
    </Button>
  );
};
