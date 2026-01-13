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
          cardRef.current!.style.filter = "blur(5px)";
        }}
        onAnimationComplete={() => {
          cardRef.current!.style.filter = "blur(0px)";
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
        <form>
          <div className="flex flex-col gap-6">
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

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Reset Password
                </a>
              </div>
              <Input id="password" type="password" required className="py-6" />
            </div>
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex-col gap-2">
        <Button className="w-full py-6 font-semibold">
          {CardTitleAndButtonText}
        </Button>
        <div className="flex w-full m-10 gap-10">
          <Button variant={"outline"} className="flex-1 py-6 font-light">
            Continue with Google
          </Button>
          <Button variant={"outline"} className="flex-1 py-6 font-light">
            Continue with Github
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
