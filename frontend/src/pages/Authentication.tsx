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
import { Label } from "@radix-ui/react-label";
import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { FaGithub, FaGoogle } from "react-icons/fa";

type FormValues = {
  email: string;
  username?: string;
  password: string;
};

const Authentication = () => {
  const [signup, setSignup] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div className="w-full h-full grid grid-cols-2 overflow-hidden">
      <motion.div
        ref={cardRef}
        animate={{
          x: signup ? "100%" : "0%",
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
        <CardComponent signup={signup} setSignup={setSignup} />
      </motion.div>

      <motion.div
        animate={{
          x: signup ? "-100%" : "0%",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-black order-2"
      />
    </motion.div>
  );
};

export default Authentication;

const CardComponent = ({
  signup,
  setSignup,
}: {
  signup: boolean;
  setSignup: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form Submitted:", data);
    // Add your login/signup logic here
  };

  const CardTitleAndButtonText = signup ? "Create An Account" : "Log In";
  const CardDescText = signup ? "Have an account?" : "Don't have an account?";
  const CreateOrSign = signup ? "Log In" : "Create an account";

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="text-6xl font-montserrat font-medium">
          {CardTitleAndButtonText}
        </CardTitle>

        <CardDescription className="font-montserrat mt-4">
          {CardDescText}
          <Button
            className="pl-2 underline cursor-pointer"
            variant="link"
            onClick={() => setSignup((prev) => !prev)}
          >
            {CreateOrSign}
          </Button>
        </CardDescription>
      </CardHeader>

      <CardContent className="my-16">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            {/* Email Field */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                className="py-6"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email.message}</span>
              )}
            </div>

            {/* Username (signup) or Password (login) */}
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor={signup ? "username" : "password"}>
                  {signup ? "Username" : "Password"}
                </Label>
                {!signup && (
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Reset Password
                  </a>
                )}
              </div>
              {signup ? (
                <Input
                  id="username"
                  type="text"
                  className="py-6"
                  {...register("username", { required: "Username is required" })}
                />
              ) : (
                <Input
                  id="password"
                  type="password"
                  className="py-6"
                  {...register("password", { required: "Password is required" })}
                />
              )}
              {errors.username && (
                <span className="text-red-500 text-sm">{errors.username.message}</span>
              )}
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password.message}</span>
              )}
            </div>
          </div>

          <CardFooter className="flex-col gap-2 mt-24 p-0">
            <ButtonComp variant={"default"} type="submit">
              {CardTitleAndButtonText}
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
