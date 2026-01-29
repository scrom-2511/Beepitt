import { Loading } from "@/components/Loading";
import ProfileForm from "@/components/settings/ProfileForm";
import TimezoneAndPreferencesForm from "@/components/settings/TimezoneAndPreferencesForm";
import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProfileDetailsAndPreferences } from "@/requestHandler/settings/getProfileDetailsAndPreferences.reqhandler";
import { useQuery } from "@tanstack/react-query";

const tabItems = [
  { label: "Profile", value: "profile" },
  { label: "Account", value: "account" },
  { label: "Notification Controller", value: "notifications" },
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

const ProfileSection = () => {
  const {
    data: profile,
    isPending,
    isLoading,
  } = useQuery({
    queryKey: ["profileDetailsAndPreferences"],
    queryFn: getProfileDetailsAndPreferences,
  });

  const sections = [
    {
      title: "Profile",
      description: "Set your account details",
      content: <ProfileForm profile={profile} />,
    },
    {
      title: "Timezone & Preferences",
      description: "Set your timezone and format",
      content: <TimezoneAndPreferencesForm profile={profile} />,
    },
  ];

  if (isPending || isLoading) {
    return <Loading title="Profile Details" />;
  }

  return (
    <section>
      {sections.map((section, index) => (
        <div key={section.title}>
          {index !== 0 && <Separator />}

          <div className="w-full h-auto rounded-2xl grid grid-rows-[100px_auto] mb-5">
            <div className="flex flex-col h-full w-full p-5 lg:p-10">
              <h1 className="text-foreground text-xl mb-2">{section.title}</h1>
              <p className="text-muted-foreground text-sm">
                {section.description}
              </p>
            </div>

            <div>
              <CardContent className="p-5 lg:p-10">
                {section.content}
              </CardContent>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
