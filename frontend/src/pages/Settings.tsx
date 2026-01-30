import ProfileSection from "@/components/settings/profile/ProfileSection";
import TeamSection from "@/components/settings/team/TeamSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabItems = [
  { label: "Profile", value: "profile" },
  { label: "Team", value: "team" },
];

const Settings = () => {
  return (
    <section className="flex w-full">
      <Tabs defaultValue="profile" className="w-full p-0 sm:p-5">
        <TabsList className="xl:w-1/2 w-full my-5 overflow-scroll flex gap-5 justify-start items-center">
          {tabItems.map((item) => (
            <TabsTrigger key={item.value} value={item.value} className="h-10">
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="profile">
          <ProfileSection />
        </TabsContent>

        <TabsContent value="team">
          <TeamSection />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Settings;
