import ButtonComp from "@/components/ButtonComp";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ProfileDetailsAndPrefernces } from "@/requestHandler/settings/getProfileDetailsAndPreferences.reqhandler";
import { updateTimeZoneAndPreferencesHandler } from "@/requestHandler/settings/preferencesAndCityUpdater.reqhandler";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type TimezoneFormValues = {
  city: string;
  timezone: string;
};

export const TimezoneAndPreferencesForm = ({
  profile,
}: {
  profile?: ProfileDetailsAndPrefernces;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isDirty, isSubmitting },
  } = useForm<TimezoneFormValues>();

  useEffect(() => {
    if (profile) {
      reset({
        city: profile.city,
        timezone: profile.timezone,
      });
    }
  }, [profile, reset]);

  const { mutate: updatePreferencesAndCity, isPending } = useMutation({
    mutationFn: updateTimeZoneAndPreferencesHandler,
    onSuccess: (res) => {
      toast.success("Updated Successfuly!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: TimezoneFormValues) => {
    updatePreferencesAndCity(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6 text-muted-foreground text-sm">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              className="py-4 sm:py-6 mt-2 text-foreground"
              {...register("city", { required: true })}
            />
          </div>

          <div className="flex-1">
            <Label htmlFor="timezone">Timezone</Label>
            <Input
              id="timezone"
              className="py-4 sm:py-6 mt-2 text-foreground"
              {...register("timezone", { required: true })}
            />
          </div>
        </div>

        {isDirty && (
          <div className="w-full flex justify-center pt-4">
            <ButtonComp
              type="submit"
              variant={isPending ? "ghost" : "default"}
              disabled={isSubmitting || isPending}
            >
              Save
            </ButtonComp>
          </div>
        )}
      </div>
    </form>
  );
};

export default TimezoneAndPreferencesForm;
