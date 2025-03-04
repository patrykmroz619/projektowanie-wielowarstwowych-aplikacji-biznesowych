import { ClerkProvider } from "@clerk/nextjs";
import React from "react";

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props;

  return <ClerkProvider>{children}</ClerkProvider>;
};
