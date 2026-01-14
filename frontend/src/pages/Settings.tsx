import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@radix-ui/react-label";

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

const Profile = () => {
  return (
    <section>
      <div className="w-full h-40 rounded-2xl grid grid-cols-[400px_auto]">
        <div className="flex flex-col h-full w-full p-10">
          <h1 className="text-foreground text-xl mb-2">Profile</h1>
          <p className="text-muted-foreground text-sm">
            Set your account details
          </p>
        </div>
        <div>
          <CardContent className="p-10">
            <form>
              <div className="flex flex-col gap-6 text-foreground text-sm">
                {/* First and Last Name */}
                <div className="flex w-full gap-5">
                  <div className="grid gap-2 flex-1">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="First Name"
                      required
                      className="py-6"
                    />
                  </div>

                  <div className="grid gap-2 flex-1">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Last Name"
                      required
                      className="py-6"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="username">Email</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Username"
                    required
                    className="py-6"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    className="py-6"
                  />
                </div>
              </div>
            </form>
          </CardContent>
        </div>
      </div>
    </section>
  );
};
