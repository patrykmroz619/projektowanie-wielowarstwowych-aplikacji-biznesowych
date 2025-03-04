import React, { ReactNode } from "react";
import { redirect } from "next/navigation";

import { getUser } from "../utils";

interface IProtectedContentProps {
  children: ReactNode;
  fallbackPath: string;
}

export const ProtectedContent = async (props: IProtectedContentProps) => {
  const { children, fallbackPath } = props;

  const user = await getUser();

  if (!user) {
    return redirect(fallbackPath);
  }

  return <>{children}</>;
};
