import { ReactNode } from "react";
import { ProtectedContent } from "@/lib/auth/components";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

interface IUserDashboardLayoutProps {
  children: ReactNode;
}

const UserDashboardLayout = (props: IUserDashboardLayoutProps) => {
  const { children } = props;

  return (
    <ProtectedContent fallbackPath="/login">
      <SidebarProvider defaultOpen>
        <AppSidebar />
        <main className="flex w-full p-4">
          <SidebarTrigger className="md:!hidden" />
          {children}
        </main>
      </SidebarProvider>
    </ProtectedContent>
  );
};

export default UserDashboardLayout;
