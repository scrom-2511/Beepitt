import { profileDetailsUpdateHandler } from "@/requestHandler/auth/ProfileDetailsUpdater.reqHandler";
import { useMutation } from "@tanstack/react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ButtonComp from "../ButtonComp";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";

type ProfileDetailsForm = {
  firstName: string;
  lastName: string;
};

const ProfileDetailsInputComponent = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileDetailsForm>();

  const {
    mutate: profileDetailsUpdate,
    data,
    isPending,
  } = useMutation({
    mutationFn: profileDetailsUpdateHandler,
    onSuccess: (res) => {
      if (res.success) {
        navigate("/dashboard");
      }
    },
  });

  const onSubmit: SubmitHandler<ProfileDetailsForm> = (formData) => {
    profileDetailsUpdate(formData);
  };
  return (
    <Card className="w-full h-full py-0 justify-center">
      <CardHeader>
        <CardTitle className="text-6xl font-montserrat font-medium">
          Your Profile
        </CardTitle>

        <CardDescription className="font-montserrat mt-4">
          Enter your first name and last name
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6 py-32">
            {/* First name Field */}
            <div className="grid gap-2">
              <Input
                id="firstName"
                type="text"
                placeholder="First name"
                className="py-6"
                autoComplete="off"
                {...register("firstName", {
                  required: "First name is required",
                })}
              />
              {errors.firstName && (
                <span className="text-red-500 text-sm">
                  {errors.firstName.message}
                </span>
              )}
            </div>

            {/* Last name Field */}
            <div className="grid gap-2">
              <Input
                id="lastName"
                type="text"
                placeholder="Last name"
                className="py-6"
                autoComplete="off"
                {...register("lastName", {
                  required: "Lastname name is required",
                })}
              />
              {errors.lastName && (
                <span className="text-red-500 text-sm">
                  {errors.lastName.message}
                </span>
              )}
            </div>
          </div>
          <CardFooter className="flex-col gap-2 mt-16 p-0">
            <ButtonComp
              variant={isPending ? "secondary" : "default"}
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Setting up your profile" : "Sumbit"}
            </ButtonComp>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileDetailsInputComponent;
