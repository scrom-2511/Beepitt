import {
  ChartArea,
  CircleCheckBigIcon,
  CircleXIcon,
  DollarSign,
  LogOut,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useState } from "react";
import ButtonComp from "./ButtonComp";

const items = [
  {
    title: "Open Incidents",
    url: "#",
    icon: CircleXIcon,
  },
  {
    title: "Closed Incidents",
    url: "#",
    icon: CircleCheckBigIcon,
  },
  {
    title: "System Health",
    url: "#",
    icon: ChartArea,
  },
];

const items_footer = [
  { title: "Settings", url: "", icon: Settings },
  { title: "Billing", url: "", icon: DollarSign },
  { title: "Log Out", url: "", icon: LogOut },
];

export function AppSidebar() {
  const [selected, setSelected] = useState<string>("Open Incidents");
  return (
    <Sidebar variant="inset" className="p-5">
      <SidebarContent className="overflow-hidden">
        <SidebarHeader className="mb-4">logo aayega</SidebarHeader>
        <SidebarMenu className="gap-2.5">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <ButtonComp
                variant={selected === item.title ? "default" : "ghost"}
                className="flex flex-row w-full justify-start gap-5 text-md cursor-pointer"
              >
                <item.icon className="size-4.5" />
                {item.title}
              </ButtonComp>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SideBarFooterComp />
    </Sidebar>
  );
}

const SideBarFooterComp = () => {
  return (
    <SidebarFooter>
      <SidebarMenu className="gap-2.5">
        {items_footer.map((item) => (
          <SidebarMenuItem>
            <ButtonComp
              variant={item.title === "Log Out" ? "destructive" : "ghost"}
              className="flex flex-row w-full justify-start gap-5 text-md cursor-pointer"
            >
              <item.icon className="size-4.5" />
              {item.title}
            </ButtonComp>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarFooter>
  );
};
