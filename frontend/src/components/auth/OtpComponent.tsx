import type { AuthStep } from "@/pages/Authentication";
import { otpValidatorHandler } from "@/requestHandler/auth/OtpValidator.ReqHandler";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import ButtonComp from "../ButtonComp";
import { CardDescription, CardTitle } from "../ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

const OtpComponent = ({
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
        variant={isPending ? "secondary" : "default"}
        onClick={() => otpValidator({ otp: otpValue })}
      >
        {isPending ? "Checking otp" : "Submit"}
      </ButtonComp>
    </div>
  );
};

export default OtpComponent;
