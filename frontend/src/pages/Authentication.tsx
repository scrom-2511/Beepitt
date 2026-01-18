import ButtonComp from "@/components/ButtonComp";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { otpValidatorHandler } from "@/requestHandler/OtpValidator.ReqHandler";
import { profileDetailsUpdateHandler } from "@/requestHandler/ProfileDetailsUpdater.reqHandler";
import { signinHandler } from "@/requestHandler/Signin.ReqHandler";
import { signupHandler } from "@/requestHandler/Signup.ReqHandler";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type AuthStep = "signin" | "signup" | "otp" | "profile";

const Authentication = () => {
  const [step, setStep] = useState<AuthStep>("signin");
  const [animate, setAnimate] = useState<boolean>(true);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div className="w-full h-full grid grid-cols-2 overflow-hidden">
      <motion.div
        ref={cardRef}
        animate={{
          x: animate ? (step === "signup" ? "100%" : "0%") : "",
        }}
        onAnimationStart={() => {
          if (cardRef.current) cardRef.current.style.filter = "blur(5px)";
        }}
        onAnimationComplete={() => {
          if (cardRef.current) cardRef.current.style.filter = "blur(0px)";
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="w-full h-full order-1"
      >
        {step === "signup" && (
          <SignupCardComponent setStep={setStep} setAnimate={setAnimate} />
        )}

        {step === "signin" && (
          <SigninCardComponent setStep={setStep} setAnimate={setAnimate} />
        )}
        {step === "otp" && <OtpComp setStep={setStep} />}

        {step === "profile" && <ProfileDetailsInputComponent />}
      </motion.div>

      <motion.div
        animate={{
          x: animate ? (step === "signup" ? "-100%" : "0%") : "",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-black order-2"
      />
    </motion.div>
  );
};

export default Authentication;

type SigninFormValues = {
  email: string;
  password: string;
};

const SigninCardComponent = ({
  setStep,
  setAnimate,
}: {
  setStep: React.Dispatch<React.SetStateAction<AuthStep>>;
  setAnimate: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormValues>();

  const {
    mutate: signin,
    data,
    isPending,
  } = useMutation({
    mutationFn: signinHandler,
    onSuccess: (res) => {
      if (res.success) {
        console.log("hey wowww");
      } else {
        console.log("hey baddd");
      }
    },
  });

  const onSubmit: SubmitHandler<SigninFormValues> = (formData) => {
    signin({
      email: formData.email,
      password: formData.password!,
    });
  };

  return (
    <Card className="w-full h-full py-0 justify-center">
      <CardHeader>
        <CardTitle className="text-6xl font-montserrat font-medium">
          Log in
        </CardTitle>

        <CardDescription className="font-montserrat mt-4">
          Don't have an account?
          <Button
            className="pl-2 underline cursor-pointer"
            variant="link"
            onClick={() => {
              setStep("signup");
            }}
          >
            Create an account
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
                placeholder="Email"
                className="py-6"
                autoComplete="off"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <div className="flex items-center">
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Reset Password
                </a>
              </div>
              <Input
                id="password"
                type="text"
                placeholder="Password"
                className="py-6"
                autoComplete="off"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>

          <CardFooter className="flex-col gap-2 mt-16 p-0">
            <ButtonComp variant={isPending? "secondary" : "default"} type="submit" disabled={isPending}>
              {isPending ? "Loading" : "Log in"}
            </ButtonComp>

            <div className="flex w-full m-10 gap-10">
              <ButtonComp
                variant={"outline"}
                className="w-full py-6 font-light cursor-pointer"
              >
                <FaGoogle color="#e2e8f0" />
                Continue with Google
              </ButtonComp>
              <ButtonComp
                variant={"outline"}
                className="w-full py-6 font-light cursor-pointer"
              >
                <FaGithub color="#e2e8f0" />
                Continue with Github
              </ButtonComp>
            </div>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

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

          <CardFooter className="flex-col mt-16 gap-2 p-0">
            <ButtonComp variant={isPending? "secondary" : "default"} type="submit" disabled={isPending}>
              {isPending ? "Loading" : "Create an account"}
            </ButtonComp>

            <div className="flex w-full m-10 gap-10">
              <ButtonComp
                variant={"outline"}
                className="w-full py-6 font-light cursor-pointer"
              >
                <FaGoogle color="#e2e8f0" />
                Continue with Google
              </ButtonComp>
              <ButtonComp
                variant={"outline"}
                className="w-full py-6 font-light cursor-pointer"
              >
                <FaGithub color="#e2e8f0" />
                Continue with Github
              </ButtonComp>
            </div>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

const OtpComp = ({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<AuthStep>>;
}) => {
  const [otpValue, setOtpValue] = useState<string>("");
  const maxLength = 4;
  const {
    mutate: otpValidator,
    data,
    isPending,
  } = useMutation({
    mutationFn: otpValidatorHandler,
    onSuccess: (res) => {
      if (res.success) {
        setStep("profile");
      } else {
      }
    },
  });
  return (
    <div className="h-full w-full flex flex-col justify-between px-16 py-32">
      <div className="flex flex-col">
        <CardTitle className="text-6xl font-montserrat font-medium text-foreground">
          Verify Code
        </CardTitle>
        <CardDescription className="font-montserrat mt-4 mb-20">
          We sent you a verification code to you mail address
        </CardDescription>
        <InputOTP
          maxLength={maxLength}
          className="h-full w-full"
          value={otpValue}
          onChange={(value) => {
            if (value.length === maxLength) {
            }
            setOtpValue(value);
            console.log(otpValue);
          }}
        >
          <InputOTPGroup className="text-foreground h-full w-full">
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <ButtonComp
        variant={isPending? "secondary" : "default"}
        onClick={() => otpValidator({ otp: otpValue })}
      >
        {isPending ? "Checking otp" : "Submit"}
      </ButtonComp>
    </div>
  );
};

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
            <ButtonComp variant={isPending? "secondary" : "default"} type="submit" disabled={isPending}>
              {isPending ? "Setting up your profile" : "Sumbit"}
            </ButtonComp>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};
