import { getOpenIncidentsHandler } from "@/requestHandler/incidents/getIncidents/getOpenIncidents.reqhandler";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { CircleX } from "lucide-react";
import { useState } from "react";
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

export const OpenIncidents = () => {
  return (
    <>
      <FilterSection />
      <IncidentCardsSection />
    </>
  );
};

const filters_items = [
  { title: "Critical", color: "bg-red-600" },
  { title: "High", color: "bg-red-500" },
  { title: "Low", color: "bg-yellow-600" },
];

const FilterSection = () => {
  const [selected, setSelected] = useState<string>();
  return (
    <section className="w-full flex">
      <div className="w-130 flex gap-2 p-5">
        {filters_items.map((item) => (
          <ButtonComp
            variant={"outline"}
            className={`flex-1 text-foreground w-full cursor-pointer p-0 h-8 ${
              item.title === selected ? "w-48" : ""
            }`}
          onClick={() =>
              setSelected((prev) => (item.title === prev ? "" : item.title))
            }
          >
            <div className={`h-2 w-2 rounded-full ${item.color}`}></div>
            {item.title}
            {selected === item.title && (
              <CircleX
                className="ml-2 size-3.5"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected("");
                }}
              />
            )}
          </ButtonComp>
        ))}
      </div>
    </section>
  );
};

const IncidentCardsSection = () => {
  const {
    data: incident_card_items,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["openIncidents"],
    queryFn: getOpenIncidentsHandler,
  });

  if (isLoading)
    return (
      <div className="text-white flex justify-center h-full w-full">
        <Loading title="Open Incidents" />
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
            <CardHeader className="p-0">
              <CardTitle className="line-clamp-2">
                {item.incidentName}
              </CardTitle>
              <CardDescription className="line-clamp-2">
                {item.incidentDesc}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 font-semibold text-sm flex flex-row gap-2 w-full my-5">
              <Button variant={"outline"} className="flex-1">
                {item.incidentDateAndTime.toString()}
              </Button>
              <Button variant={"outline"} className="flex-1">
                {item.incidentDateAndTime.toString()}
              </Button>
            </CardContent>
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
                  className={`h-2.5 w-2.5  mr-3 rounded-full ${
                    item.incidentPriority === "Critical"
                      ? "bg-red-600"
                      : item.incidentPriority === "High"
                        ? "bg-red-500"
                        : "bg-yellow-600"
                  }`}
                ></motion.div>
                {item.incidentPriority}
              </div>
              <ButtonComp
                className="h-10 w-full font-semibold cursor-pointer"
                onClick={() => {}}
              >
                Mark As Fixed
              </ButtonComp>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </section>
  );
};
