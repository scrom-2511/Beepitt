import { getClosedIncidentsHandler } from "@/requestHandler/incidents/getIncidents/getClosedIncidents.reqhandler";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import ButtonComp from "./ButtonComp";
import { Loading } from "./Loading";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
const ClosedIncidents = () => {
  return <ErrorCardsSection />;
};

export default ClosedIncidents;

const ErrorCardsSection = () => {
  const {
    data: incident_card_items,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["closedIncidents"],
    queryFn: getClosedIncidentsHandler,
  });

  if (isLoading)
    return (
      <div className="text-white flex justify-center h-full w-full">
        <Loading title="Closed Incidents" />
      </div>
    );

  return (
    <section className="grid grid-cols-3 p-5 gap-5">
      {incident_card_items?.map((item) => (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, ease: "easeIn" }}
          className="cursor-pointer"
        >
          <Card className="bg-card p-10">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="line-clamp-2">
                {item.incidentName}
              </CardTitle>
              <CardDescription className="line-clamp-2">
                {item.incidentDesc}
              </CardDescription>
            </CardHeader>
            <div>
              <CardDescription className="text-foreground p-0 m-0">
                Error Occured At:{" "}
              </CardDescription>
              <CardContent className="p-0 font-semibold text-sm flex flex-row gap-2 w-full my-2">
                <Button variant={"outline"} className="flex-1">
                  Date
                </Button>
                <Button variant={"outline"} className="flex-1">
                  Date
                </Button>
              </CardContent>
            </div>
            <div>
              <CardDescription className="text-foreground p-0 m-0">
                Error Fixed At:{" "}
              </CardDescription>
              <CardContent className="p-0 font-semibold text-sm flex flex-row gap-2 w-full my-2 mb-6">
                <Button variant={"outline"} className="flex-1">
                  Date
                </Button>
                <Button variant={"outline"} className="flex-1">
                  Time
                </Button>
              </CardContent>
            </div>
            <CardFooter className="p-0 flex flex-col items-start gap-5">
              <div className="flex flex-row items-center">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      "0 0px 2px rgba(255, 0, 0, 0.2)",
                      "0 0px 8px rgba(255, 0, 0, 0.6)",
                      "0 0px 2px rgba(255, 0, 0, 0.2)",
                    ],
                  }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className={`h-2.5 w-2.5  mr-3 rounded-full bg-green-500`}
                ></motion.div>
                Fixed
              </div>
              <ButtonComp className="h-10 w-full font-semibold cursor-pointer">
                Mark As Unfixed
              </ButtonComp>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </section>
  );
};
