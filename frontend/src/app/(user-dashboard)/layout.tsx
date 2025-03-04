import { ProtectedContent } from "@/lib/auth/components";
import { ReactNode } from "react";

interface IUserDashboardLayoutProps {
  children: ReactNode;
}

const UserDashboardLayout = (props: IUserDashboardLayoutProps) => {
  const { children } = props;

  return <ProtectedContent fallbackPath="/login">{children}</ProtectedContent>;
};

export default UserDashboardLayout;
