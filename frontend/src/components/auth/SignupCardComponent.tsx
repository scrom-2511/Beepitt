import type { AuthStep } from "@/pages/Authentication";
import { googleAuthHandler } from "@/requestHandler/auth/GoogleAuth.reqhandler";
import { signupHandler } from "@/requestHandler/auth/Signup.ReqHandler";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import ButtonComp from "../ButtonComp";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";

type SignupFormValues = {
  email: string;
  username: string;
  password: string;
};

const SignupCardComponent = ({
  setStep,
  setAnimate,
}: {
  setStep: React.Dispatch<React.SetStateAction<AuthStep>>;
  setAnimate: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const hiddenGoogleBtnRef = useRef<HTMLDivElement | null>(null);

  const { mutate: googleAuth } = useMutation({
    mutationFn: googleAuthHandler,
    onSuccess: (res) => {},
  });
  
  const handleGoogleLogin = async (response: any) => {
    const googleToken = response.credential;
    googleAuth({ token: googleToken });
  };

  useEffect(() => {
    if (!(window as any).google || !hiddenGoogleBtnRef.current) return;

    (window as any).google.accounts.id.initialize({
      client_id:
        "969855643592-at1i6a3m0u49i795b5csti15ls7bq42o.apps.googleusercontent.com",
      callback: handleGoogleLogin,
    });

    (window as any).google.accounts.id.renderButton(
      hiddenGoogleBtnRef.current,
      {
        theme: "outline",
        size: "large",
        shape: "rectangular",
        text: "sign_in_with",
        width: 280,
      },
    );
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>();

  const {
    mutate: signup,
    data,
    isPending,
  } = useMutation({
    mutationFn: signupHandler,
    onSuccess: (res) => {
      if (res.success) {
        setAnimate(false);
        setStep("otp");
      } else {
        console.log("bad");
      }
    },
  });

  const onSubmit: SubmitHandler<SignupFormValues> = (formData) => {
    signup({
      email: formData.email,
      username: formData.username,
      password: formData.password!,
    });
  };

  return (
    <Card className="w-full h-full justify-center py-0">
      <CardHeader>
        <CardTitle className="text-6xl font-montserrat font-medium">
          Create an account
        </CardTitle>

        <CardDescription className="font-montserrat mt-4">
          Have an account?
          <Button
            className="pl-2 underline cursor-pointer"
            variant="link"
            onClick={() => {
              setStep("signin");
            }}
          >
            Log in
          </Button>
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            {/* Email Field */}
            <div className="grid gap-2">
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                className="py-6"
                autoComplete="off"
                {...register("email", {
                  required: "Email is required",
                })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Username Field */}
            <div className="grid gap-2">
              <Input
                id="username"
                type="text"
                placeholder="Username"
                className="py-6"
                autoComplete="off"
                {...register("username", {
                  required: "Username is required",
                })}
              />
              {errors.username && (
                <span className="text-red-500 text-sm">
                  {errors.username.message}
                </span>
              )}
            </div>

            {/* Password Field */}
            <div className="grid gap-2">
              <Input
                id="password"
                type="password"
                placeholder="Password"
                className="py-6"
                autoComplete="off"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>

          <CardFooter className="flex-col mt-16 gap-6 p-0">
            <ButtonComp
              variant={isPending ? "secondary" : "default"}
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Loading" : "Create an account"}
            </ButtonComp>

            {/* Google button rendered here */}
            <div ref={hiddenGoogleBtnRef} style={{ display: "none" }} />
            <ButtonComp
              type="button"
              variant="outline"
              className="w-full py-6"
              onClick={() => {
                const btn = hiddenGoogleBtnRef.current?.querySelector(
                  "div[role=button]",
                ) as HTMLElement | null;

                btn?.click();
              }}
            >
              <FaGoogle />
              Continue with Google
            </ButtonComp>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignupCardComponent;
