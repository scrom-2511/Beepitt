import ButtonComp from "@/components/ButtonComp";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { razorPayCreateOrderHandler } from "@/requestHandler/payment/RazorpayPayment.reqhandler";
import { useMutation } from "@tanstack/react-query";
import { Check } from "lucide-react";

enum Tier {
  free = "free",
  premium = "premium",
}

interface FeaturesItems {
  featureItem: string;
}

interface PriceCardItems {
  tier: Tier;
  title: string;
  price: string;
  features: FeaturesItems[];
}

const items: PriceCardItems[] = [
  {
    tier: Tier.free,
    title: "Basic Plan",
    price: "Free",
    features: [
      { featureItem: "Validity - 3 Days" },
      { featureItem: "Upto 1 member" },
      {
        featureItem:
          "Notification Channels: Discord, Telegram (will be adding more soon)",
      },
    ],
  },
  {
    tier: Tier.premium,
    title: "Premium Plan",
    price: "$8",
    features: [
      { featureItem: "Validity - 30 Days" },
      { featureItem: "Upto 4 members" },
      {
        featureItem:
          "Notification Channels: Discord, Telegram (will be adding more soon)",
      },
    ],
  },
];

const Pricing = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: razorPayCreateOrderHandler,
    onSuccess: (res) => {
      if (!res.success) return;

      if (typeof window === "undefined") return;

      const options = {
        key: "rzp_test_S5dfQBnwZhdrTq",
        amount: res.data.amount,
        currency: "INR",
        name: "Beepitt",
        description: "Test Transaction",
        order_id: res.data.orderId,
        prefill: {
          name: "user2",
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
        theme: {
          color: "#6366f1",
        },
        method: {
          card: true,
          upi: true,
          netbanking: false,
          wallet: false,
          emi: false,
          paylater: false,
        },
        handler: function async(response: any) {
          console.log("Payment success", response);
          
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    },
  });

  const onSubmit = (id: string) => {
    console.log(id);
    mutate({ id });
  };

  return (
    <div className="h-full w-full bg-background grid grid-rows-[200px_auto]">
      <div className="flex h-full w-full justify-center items-end">
        <h1 className="font-montserrat text-foreground text-5xl font-medium">
          One price. That's all you need.
        </h1>
      </div>
      <div className="h-full w-full flex px-30 py-40 gap-8 justify-center">
        {items.map((item) => (
          <Card
            key={item.tier}
            className="bg-card flex-1 h-auto justify-center py-0"
          >
            <CardHeader className="p-0">
              <CardTitle className="font-light mb-3 text-muted-foreground">
                {item.title}
              </CardTitle>
              <CardTitle className="text-5xl font-light">
                {item.price}
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="py-5 px-0">
              <div className="flex flex-col gap-3">
                {item.features.map((feature) => (
                  <div
                    key={feature.featureItem}
                    className="flex flex-row text-md text-muted-foreground items-center gap-2"
                  >
                    <Check className="size-5" />
                    {feature.featureItem}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <ButtonComp
                variant={"default"}
                onClick={() => onSubmit(item.tier)}
              >
                Activate Now
              </ButtonComp>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
