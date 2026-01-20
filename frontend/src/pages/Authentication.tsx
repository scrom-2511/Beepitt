import OtpComponent from "@/components/auth/OtpComponent";
import ProfileDetailsInputComponent from "@/components/auth/ProfileDetailsInputComponent";
import SigninCardComponent from "@/components/auth/SigninCardComponent";
import SignupCardComponent from "@/components/auth/SignupCardComponent";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

export type AuthStep = "signin" | "signup" | "otp" | "profile";

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
        {step === "otp" && <OtpComponent setStep={setStep} />}

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
