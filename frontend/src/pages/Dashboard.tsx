import { AppSidebar } from "@/components/app-sidebar";
import ButtonComp from "@/components/ButtonComp";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CircleX } from "lucide-react";
import { useState } from "react";

const Dashboard = () => {
  return (
    <SidebarProvider className="h-full w-full p-5">
      <AppSidebar />
      <ScrollArea className="bg-background w-full h-full rounded-2xl pb-5">
        <TopBar />
        <FilterSection />
      </ScrollArea>
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
  const [selected, setSelected] = useState<string>();
  return (
    <section className="w-full flex">
      <div className="w-130 flex gap-2 p-5">
        {filters_items.map((item) => (
          <ButtonComp
            variant={"outline"}
            className={`flex-1 text-foreground w-full cursor-pointer p-0 h-8 ${
              item.title === selected ? "w-48" : ""
            }`}
            onClick={() =>
              setSelected((prev) => (item.title === prev ? "" : item.title))
            }
          >
            <div className={`h-2 w-2 rounded-full ${item.color}`}></div>
            {item.title}
            {selected === item.title && (
              <CircleX
                className="ml-2 size-3.5"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected("");
                }}
              />
            )}
          </ButtonComp>
        ))}
      </div>
    </section>
  );
};


