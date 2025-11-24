"use client";

import { IconCar, IconDashboard, IconMotorbike } from "@tabler/icons-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Logo from "./logo";

const data = {
  navAdmin: [
    {
      title: "Dashboard",
      url: "/dashboard/admin",
      icon: IconDashboard,
    },
    {
      title: "Vehicles",
      url: "/dashboard/admin/vehicles",
      icon: IconCar,
    },
    {
      title: "Driver Requests",
      url: "/dashboard/admin/driver-requests",
      icon: IconMotorbike,
    },
  ],
  navDriver: [
    {
      title: "Dashboard",
      url: "/dashboard/driver",
      icon: IconDashboard,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Logo />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain adminItems={data.navAdmin} driverItems={data.navDriver} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
