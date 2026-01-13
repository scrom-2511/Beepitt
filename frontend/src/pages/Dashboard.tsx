import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const Dashboard = () => {
  return (
    <SidebarProvider className="h-full w-full p-5">
      <AppSidebar />
      <div className="bg-background w-full h-full rounded-2xl">
        <SidebarTrigger />
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
