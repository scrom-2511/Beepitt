import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabItems = [
  { label: "Profile", value: "profile" },
  { label: "Account", value: "account" },
  { label: "Notification Controller", value: "notifications" },
  { label: "Team", value: "team" },
];

const Settings = () => {
  return (
    <section className="flex w-full">
      <Tabs defaultValue="account" className="w-full p-5">
        <TabsList className="w-1/2 mb-5">
          {tabItems.map((item) => (
            <TabsTrigger key={item.value} value={item.value} className="h-10">
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="profile">
          <Profile />
        </TabsContent>

        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>

        <TabsContent value="notifications">
          Notification settings here.
        </TabsContent>

        <TabsContent value="team">Team settings here.</TabsContent>
      </Tabs>
    </section>
  );
};

export default Settings;
