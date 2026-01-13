import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const Dashboard = () => {
  return (
    <SidebarProvider className="h-full w-full p-5">
      <AppSidebar />
      <div className="bg-background w-full h-full rounded-2xl">
        <TopBar />
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;

const TopBar = () => {
  return (
    <>
      <div className="flex p-5 gap-5 items-center font-montserrat">
        <SidebarTrigger />
        <h1 className="text-foreground font-medium text-xl">Dashboard</h1>
      </div>
      <div className="border border-foreground opacity-25"></div>
    </>
  );
};
