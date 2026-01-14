import { AppSidebar } from "@/components/AppSidebar";
import ClosedIncidents from "@/components/ClosedIncidents";
import { OpenIncidents } from "@/components/OpenIncidents";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UnseenIncidents } from "@/components/UnseenIncidents";
import { useState } from "react";
import Settings from "./Settings";

const Dashboard = () => {
  const [selected, setSelected] = useState<string>("Open Incidents");
  return (
    <SidebarProvider className="h-full w-full p-5">
      <AppSidebar selected={selected} setSelected={setSelected} />
      <ScrollArea className="bg-background w-full h-full rounded-2xl pb-5">
        <TopBar selected={selected} />
        {selected === "Unseen Incidents" && <UnseenIncidents />}
        {selected === "Open Incidents" && <OpenIncidents />}
        {selected === "Closed Incidents" && <ClosedIncidents />}
        {selected === "Settings" && <Settings />}
      </ScrollArea>
    </SidebarProvider>
  );
};

export default Dashboard;

const TopBar = ({ selected }: { selected: string }) => {
  return (
    <>
      <div className="flex p-5 gap-5 items-center font-montserrat">
        <SidebarTrigger />
        <h1 className="text-foreground font-medium text-xl">{selected}</h1>
      </div>
      <div className="border border-foreground opacity-25"></div>
    </>
  );
};
