import ButtonComp from "@/components/ButtonComp";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";

interface FeaturesItems {
  featureItem: string;
}
interface PriceCardItems {
  title: string;
  price: string;
  features: FeaturesItems[];
}

const items: PriceCardItems[] = [
  {
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
    title: "Premium Plan",
    price: "$5",
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
  return (
    <div className="h-full w-full bg-background grid grid-rows-[300px_auto]">
      <div className="flex h-full w-full justify-center items-end">
        <h1 className="font-montserrat text-foreground text-5xl font-medium">
          One price. That's all you need.
        </h1>
      </div>
      <div className="h-full w-full flex p-30 gap-8 justify-center">
        {items.map((item) => (
          <Card key={item.title} className="bg-card flex-1 p-10 justify-center">
            <CardHeader className="p-0">
              <CardTitle className="font-light mb-3 text-muted-foreground">
                {item.title}
              </CardTitle>
              <CardTitle className="text-5xl font-light">
                {item.price}
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="py-4 px-0">
              <div className="flex flex-col gap-3">
                {item.features.map((feature) => (
                  <div className="flex flex-row text-lg text-muted-foreground items-center gap-2">
                    <Check />
                    {feature.featureItem}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <ButtonComp variant={"default"}>Create an account</ButtonComp>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
