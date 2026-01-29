import { AppSidebar } from "@/components/dashboard/AppSidebar";
import Billing from "@/components/dashboard/Billing";
import ClosedIncidents from "@/components/dashboard/ClosedIncidents";
import { OpenIncidents } from "@/components/dashboard/OpenIncidents";
import { UnseenIncidents } from "@/components/dashboard/UnseenIncidents";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useState } from "react";
import Settings from "./Settings";

export type DashboardState =
  | "Unseen Incidents"
  | "Open Incidents"
  | "Closed Incidents"
  | "Settings"
  | "Billing";

const Dashboard = () => {
  const [selected, setSelected] = useState<DashboardState>("Unseen Incidents");
  return (
    <SidebarProvider className="h-full w-max-500 p-5">
      <AppSidebar selected={selected} setSelected={setSelected} />
      <div className="bg-background w-full h-full grid grid-rows-[70px_auto] rounded-2xl pb-5">
        <TopBar selected={selected} />
        <div className="overflow-y-scroll">
          {selected === "Unseen Incidents" && <UnseenIncidents />}
          {selected === "Open Incidents" && <OpenIncidents />}
          {selected === "Closed Incidents" && <ClosedIncidents />}
          {selected === "Settings" && <Settings />}
          {selected === "Billing" && <Billing />}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;

const TopBar = ({ selected }: { selected: string }) => {
  return (
    <div>
      <div className="flex p-5 gap-5 items-center font-montserrat">
        <SidebarTrigger />
        <h1 className="text-foreground font-medium text-xl">{selected}</h1>
      </div>
      <div className="border border-foreground opacity-25"></div>
    </div>
  );
};
