import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
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
      <Separator/>

      <div className="w-full h-auto rounded-2xl grid grid-cols-[400px_auto]">
        <div className="flex flex-col h-full w-full p-10">
          <h1 className="text-foreground text-xl mb-2">Profile</h1>
          <p className="text-muted-foreground text-sm">
            Set your account details
          </p>
        </div>
        <div>
          <CardContent className="p-10">
            <form>
              <div className="flex flex-col gap-6 text-muted-foreground text-sm">
                {/* First and Last Name */}
                <div className="flex w-full gap-5">
                  <div className="grid gap-2 flex-1">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="First Name"
                      required
                      className="py-6 text-foreground"
                    />
                  </div>

                  <div className="grid gap-2 flex-1">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Last Name"
                      required
                      className="py-6 text-foreground"
                    />
                  </div>
                </div>

                {/* Username */}
                <div className="grid gap-2">
                  <Label htmlFor="username">Email</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Username"
                    required
                    className="py-6 text-foreground"
                  />
                </div>

                {/* Email */}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={"something"}
                    className="py-6 text-foreground"
                  />
                </div>
              </div>
            </form>
          </CardContent>
        </div>
      </div>

      <Separator/>

      {/* TimeZone And Preferences */}
      <div className="w-full h-40 rounded-2xl grid grid-cols-[400px_auto]">
        <div className="flex flex-col h-full w-full p-10">
          <h1 className="text-foreground text-xl mb-2">
            Timezone And Preferences
          </h1>
          <p className="text-muted-foreground text-sm">
            Set your timezone and format
          </p>
        </div>
        <div>
          <CardContent className="p-10">
            <form>
              <div className="flex flex-col gap-6 text-muted-foreground text-sm">
                <div className="flex w-full gap-5">
                  {/* City */}
                  <div className="grid gap-2 flex-1">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      type="text"
                      placeholder="Enter your city"
                      required
                      className="py-6 text-foreground"
                    />
                  </div>

                  {/* Timezone */}
                  <div className="grid gap-2 flex-1">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Input
                      id="timezone"
                      type="text"
                      placeholder="e.g. UTC, GMT+1, America/New_York"
                      required
                      className="py-6 text-foreground"
                    />
                  </div>

                  {/* Date Format */}
                  <div className="grid gap-2 flex-1">
                    <Label htmlFor="dateTimeFormat">Date & Time Format</Label>
                    <Input
                      id="dateTimeFormat"
                      type="text"
                      placeholder="e.g. DD/MM/YYYY HH:mm"
                      required
                      className="py-6 text-foreground"
                    />
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
        </div>
      </div>


      <Separator/>



    </section>
  );
};
