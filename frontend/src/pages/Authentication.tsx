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
import { signinHandler } from "@/requestHandler/Signin.ReqHandler";
import { signupHandler } from "@/requestHandler/Signup.ReqHandler";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { FaGithub, FaGoogle } from "react-icons/fa";

const Authentication = () => {
  const [signinComp, setSigninComp] = useState(false);
  const [signupComp, setSignupComp] = useState(false);
  const [otpComp, setOtpComp] = useState(true);
  const [animate, setAnimate] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div className="w-full h-full grid grid-cols-2 overflow-hidden">
      <motion.div
        ref={cardRef}
        animate={{
          x: animate ? (signupComp ? "100%" : "0%") : "",
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
        {signupComp && (
          <SignupCardComponent
            setSigninComp={setSigninComp}
            setSignupComp={setSignupComp}
            setOtpComp={setOtpComp}
            setAnimate={setAnimate}
          />
        )}

        {signinComp && (
          <SigninCardComponent
            setSigninComp={setSigninComp}
            setSignupComp={setSignupComp}
            setOtpComp={setOtpComp}
          />
        )}

        {otpComp && <OtpComp />}
      </motion.div>

      <motion.div
        animate={{
          x: animate ? (signupComp ? "-100%" : "0%") : "",
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
  setSignupComp,
  setSigninComp,
  setOtpComp,
}: {
  setSignupComp: React.Dispatch<React.SetStateAction<boolean>>;
  setSigninComp: React.Dispatch<React.SetStateAction<boolean>>;
  setOtpComp: React.Dispatch<React.SetStateAction<boolean>>;
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
              setSigninComp((prev) => !prev);
              setSignupComp((prev) => !prev);
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
            <ButtonComp variant={"default"} type="submit" disabled={isPending}>
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
  setSignupComp,
  setSigninComp,
  setOtpComp,
  setAnimate,
}: {
  setSignupComp: React.Dispatch<React.SetStateAction<boolean>>;
  setSigninComp: React.Dispatch<React.SetStateAction<boolean>>;
  setOtpComp: React.Dispatch<React.SetStateAction<boolean>>;
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
        setSigninComp(false);
        setSignupComp(false);
        setAnimate(false);
        setOtpComp(true);
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
              setSigninComp((prev) => !prev);
              setSignupComp((prev) => !prev);
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
            <ButtonComp variant={"default"} type="submit" disabled={isPending}>
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

