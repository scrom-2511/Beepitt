import { CalendarCheck } from "lucide-react";
import ButtonComp from "../ButtonComp";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

const Billing = () => {
  return (
    <section className="grid grid-cols-2 p-5 gap-5">
      <div>
        <Card className="bg-card justify-center p-12 m-0">
          <div className="flex justify-between">
            <CardHeader className="p-0">
              <CardTitle className="font-light mb-3 text-muted-foreground">
                Valid Till
              </CardTitle>
              <CardTitle className="text-5xl font-semibold">10/12/32</CardTitle>
            </CardHeader>
            <CalendarCheck strokeWidth={"1"} className="size-20" />
          </div>
          <CardFooter className="p-0 mt-5">
            <ButtonComp>Renew Now</ButtonComp>
          </CardFooter>
        </Card>
      </div>
      <div>
        <Card className="bg-card p-12 h-full">
          <CardHeader className="p-0 w-full grid grid-rows-[10px_auto] h-full">
            <CardTitle className="font-light mb-3 text-muted-foreground">
              Payment Details Of Last Month
            </CardTitle>
            <div className="flex flex-row items-center justify-center h-full">
              <div className="flex-1 flex flex-col items-center">
                <CardTitle className="font-light mb-3 text-muted-foreground">
                  Date
                </CardTitle>
                <CardDescription className="text-foreground text-lg">
                  10/12/32
                </CardDescription>
              </div>
              <div className="w-px h-10 bg-foreground opacity-25" />
              <div className="flex-1 flex flex-col items-center">
                <CardTitle className="font-light mb-3 text-muted-foreground">
                  Subscription Type
                </CardTitle>
                <CardDescription className="text-foreground text-lg">
                  Premium
                </CardDescription>
              </div>
              <div className="w-px h-10 bg-foreground opacity-25" />
              <div className="flex-1 flex flex-col items-center">
                <CardTitle className="font-light mb-3 text-muted-foreground">
                  Status
                </CardTitle>
                <CardDescription className="text-foreground text-lg">
                  Success
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
      <Card className="bg-card p-12 h-full col-span-2">
        <CardHeader className="p-0 mb-5">
          <CardTitle className="font-semibold text-lg text-foreground">
            Reward Timeline
          </CardTitle>
          <CardDescription className="font-light text-muted-foreground">
            Subscribe for five consecutive months and get your sixth month free!
            The free month will be automatically added to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="px-28 flex items-center my-10">
          {/* Step 1 */}
          <div className="h-3 w-3 bg-green-500 rounded-full z-10" />
          <div className="flex-1 h-px bg-green-500" />

          {/* Step 2 */}
          <div className="h-3 w-3 bg-green-500 rounded-full z-10" />
          <div className="flex-1 h-px bg-muted-foreground" />

          {/* Step 3 */}
          <div className="h-3 w-3 bg-red-50 rounded-full z-10" />
          <div className="flex-1 h-px bg-muted-foreground" />

          {/* Step 4 */}
          <div className="h-3 w-3 bg-red-50 rounded-full z-10" />
          <div className="flex-1 h-px bg-muted-foreground" />

          {/* Step 5 */}
          <div className="h-3 w-3 bg-red-50 rounded-full z-10" />
        </CardContent>
      </Card>
    </section>
  );
};

export default Billing;
