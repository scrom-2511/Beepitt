import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getUnseenIncidentsHandler } from "@/requestHandler/incidents/getIncidents/getUnseenIncidents.reqhandler";
import {
    updateIncidentPriorityHandler,
    type UpdateIncidentPriorityEnum,
} from "@/requestHandler/incidents/updateIncidents/updateIncidentPriority.reqhandler";
import { useMutation, useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import ButtonComp from "../ButtonComp";
import { Loading } from "../Loading";
import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";

export const UnseenIncidents = () => {
  return (
    <>
      <IncidentCardsSection />
    </>
  );
};

const IncidentCardsSection = () => {
  const [priorities, setPriorities] = useState<
    Record<string, UpdateIncidentPriorityEnum>
  >({});

  const {
    data: incident_card_items,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["unseenIncidents"],
    queryFn: getUnseenIncidentsHandler,
  });

  const { mutate: updateIncidentPriority } = useMutation({
    mutationFn: updateIncidentPriorityHandler,
    onSuccess: (res) => {},
  });

  const onSumitSetPriority = (incidentId: number) => {
    const priority = priorities[incidentId];
    if (!priority) return;
    updateIncidentPriority({ newPriority: priority });
  };

  if (isLoading)
    return (
      <div className="text-white flex justify-center h-full w-full">
        <Loading title="Unseen Incidents" />
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
                Date
              </Button>
              <Button variant={"outline"} className="flex-1">
                Time
              </Button>
            </CardContent>
            <CardFooter className="p-0 flex flex-col items-start gap-5">
              <Select
                value={priorities[item.id]}
                onValueChange={(value) =>
                  setPriorities((prev) => ({
                    ...prev,
                    [item.id]: value as UpdateIncidentPriorityEnum,
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>

              <ButtonComp
                className="h-10 w-full font-semibold cursor-pointer"
                onClick={() => onSumitSetPriority(item.id)}
              >
                Set Priority
              </ButtonComp>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </section>
  );
};
