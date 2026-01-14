import ButtonComp from "@/components/ButtonComp";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const tabItems = [
  { label: "Profile", value: "profile" },
  { label: "Account", value: "account" },
  { label: "Notification Controller", value: "notifications" },
  { label: "Team", value: "team" },
];

const Settings = () => {
  return (
    <section className="flex w-full">
      <Tabs defaultValue="profile" className="w-full p-5">
        <TabsList className="w-1/2 mb-5">
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
  const [dataChangedProfile, setDataChangedProfile] = useState(false);
  const [dataChangedTimezone, setDataChangedTimezone] = useState(false);

  // These refs will allow SaveButton to trigger form submission
  const [profileSubmit, setProfileSubmit] = useState<() => void>(
    () => () => {}
  );
  const [timezoneSubmit, setTimezoneSubmit] = useState<() => void>(
    () => () => {}
  );

  return (
    <section>
      <Separator />

      {/* Profile Form Section */}
      <div className="w-full h-auto rounded-2xl grid grid-cols-[400px_auto] mb-5">
        <div className="flex flex-col h-full w-full p-10">
          <h1 className="text-foreground text-xl mb-2">Profile</h1>
          <p className="text-muted-foreground text-sm">
            Set your account details
          </p>
        </div>
        <div>
          <CardContent className="p-10">
            <ProfileForm
              onDataChange={setDataChangedProfile}
              setSubmitFn={setProfileSubmit}
            />
          </CardContent>
        </div>
        {dataChangedProfile && <SaveButton onClick={profileSubmit} />}
      </div>

      <Separator />

      {/* Timezone & Preferences Section */}
      <div className="w-full h-40 rounded-2xl grid grid-cols-[400px_auto]">
        <div className="flex flex-col h-full w-full p-10">
          <h1 className="text-foreground text-xl mb-2">
            Timezone & Preferences
          </h1>
          <p className="text-muted-foreground text-sm">
            Set your timezone and format
          </p>
        </div>
        <div>
          <CardContent className="p-10">
            <TimezonePreferencesForm
              onDataChange={setDataChangedTimezone}
              setSubmitFn={setTimezoneSubmit}
            />
          </CardContent>
        </div>
        {dataChangedTimezone && <SaveButton onClick={timezoneSubmit} />}
      </div>
    </section>
  );
};

type ProfileFormValues = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
};

interface ProfileFormProps {
  onDataChange?: (changed: boolean) => void;
  setSubmitFn?: (submitFn: () => void) => void;
}

export const ProfileForm = ({
  onDataChange,
  setSubmitFn,
}: ProfileFormProps) => {
  const form = useForm<ProfileFormValues>({
    defaultValues: { email: "something" },
  });

  const { register, handleSubmit, formState } = form;

  const onSubmit = (data: ProfileFormValues) => {
    console.log("Profile Data:", data);
    onDataChange?.(false);
  };

  // Expose submit function to parent SaveButton

  useEffect(() => {
    if (!setSubmitFn) return;

    setSubmitFn(() => handleSubmit(onSubmit));
  }, [handleSubmit, onSubmit, setSubmitFn]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6 text-muted-foreground text-sm">
        <div className="flex w-full gap-5">
          <div className="grid gap-2 flex-1">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              placeholder="First Name"
              className="py-6 text-foreground"
              {...register("firstName", { required: "First name is required" })}
              onChange={() => onDataChange?.(true)}
            />
          </div>

          <div className="grid gap-2 flex-1">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              placeholder="Last Name"
              className="py-6 text-foreground"
              {...register("lastName", { required: "Last name is required" })}
              onChange={() => onDataChange?.(true)}
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="Username"
            className="py-6 text-foreground"
            {...register("username", { required: "Username is required" })}
            onChange={() => onDataChange?.(true)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            className="py-6 text-foreground"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            onChange={() => onDataChange?.(true)}
          />
        </div>
      </div>
    </form>
  );
};

type TimezoneFormValues = {
  city: string;
  timezone: string;
  dateTimeFormat: string;
};

interface TimezoneFormProps {
  onDataChange?: (changed: boolean) => void;
  setSubmitFn?: (submitFn: () => void) => void;
}

export const TimezonePreferencesForm = ({
  onDataChange,
  setSubmitFn,
}: TimezoneFormProps) => {
  const form = useForm<TimezoneFormValues>();
  const { register, handleSubmit } = form;

  const onSubmit = (data: TimezoneFormValues) => {
    console.log("Timezone & Preferences:", data);
    onDataChange?.(false);
  };

  // Expose submit function to parent SaveButton

  useEffect(() => {
    if (!setSubmitFn) return;

    setSubmitFn(() => handleSubmit(onSubmit));
  }, [handleSubmit, onSubmit, setSubmitFn]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6 text-muted-foreground text-sm">
        <div className="flex w-full gap-5">
          <div className="grid gap-2 flex-1">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              placeholder="Enter your city"
              className="py-6 text-foreground"
              {...register("city", { required: "City is required" })}
              onChange={() => onDataChange?.(true)}
            />
          </div>

          <div className="grid gap-2 flex-1">
            <Label htmlFor="timezone">Timezone</Label>
            <Input
              id="timezone"
              placeholder="e.g. UTC, GMT+1, America/New_York"
              className="py-6 text-foreground"
              {...register("timezone", { required: "Timezone is required" })}
              onChange={() => onDataChange?.(true)}
            />
          </div>

          <div className="grid gap-2 flex-1">
            <Label htmlFor="dateTimeFormat">Date & Time Format</Label>
            <Input
              id="dateTimeFormat"
              placeholder="e.g. DD/MM/YYYY HH:mm"
              className="py-6 text-foreground"
              {...register("dateTimeFormat", {
                required: "Date & time format is required",
              })}
              onChange={() => onDataChange?.(true)}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

interface SaveButtonProps {
  onClick?: () => void;
}

const SaveButton = ({ onClick }: SaveButtonProps) => {
  return (
    <div className="col-span-2 w-full flex items-center justify-center mb-5">
      <div className="w-50">
        <ButtonComp onClick={onClick}>Save</ButtonComp>
      </div>
    </div>
  );
};
