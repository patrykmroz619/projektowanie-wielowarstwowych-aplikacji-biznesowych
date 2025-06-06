import { CirclePlus, Home, List, User } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { ThemeSwitcher } from "@/lib/themes";
import { Logo } from "./logo";

// Menu items.
const items = [
  {
    title: "Start",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Nowa dieta",
    url: "/dashboard/new",
    icon: CirclePlus,
  },
  {
    title: "Lista diet",
    url: "/dashboard/list",
    icon: List,
  },
  {
    title: "Profil",
    url: "/dashboard/profile",
    icon: User,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="flex justify-between items-center">
            <Logo className="w-40 h-auto flex pr-6 py-4 " />
            <ThemeSwitcher />
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="text-lg">
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <NavUser />
      </SidebarContent>
    </Sidebar>
  );
}
