import { AppSidebar } from "@/components/app-sidebar";
import ButtonComp from "@/components/ButtonComp";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const Dashboard = () => {
  return (
    <SidebarProvider className="h-full w-full p-5">
      <AppSidebar />
      <div className="bg-background w-full h-full rounded-2xl">
        <TopBar />
        <FilterSection />
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

const filters_items = [
  { title: "Critical", color: "bg-red-600" },
  { title: "High", color: "bg-red-500" },
  { title: "Low", color: "bg-yellow-600" },
];

const FilterSection = () => {
  return (
    <section className="w-full flex">
      <div className="w-96 flex gap-2 p-5">
        {filters_items.map((item) => (
          <ButtonComp variant={"outline"} className="text-foreground w-full cursor-pointer p-0 h-8">
            <div className={`h-2 w-2 rounded-full ${item.color}`}></div>
            {item.title}
          </ButtonComp>
        ))}
      </div>
      <div>Search</div>
    </section>
  );
};
