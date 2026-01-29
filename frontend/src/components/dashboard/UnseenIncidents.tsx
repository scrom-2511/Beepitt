import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getUnseenIncidentsHandler,
  type Incident,
} from "@/requestHandler/incidents/getIncidents/getUnseenIncidents.reqhandler";
import {
  updateIncidentPriorityHandler,
  type UpdateIncidentPriorityEnum,
} from "@/requestHandler/incidents/updateIncidents/updateIncidentPriority.reqhandler";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { CircleAlert, PartyPopper } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
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
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";

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
    error,
    refetch,
  } = useQuery({
    queryKey: ["unseenIncidents"],
    queryFn: getUnseenIncidentsHandler,
  });

  const queryClient = useQueryClient();

  const { mutate: updateIncidentPriority } = useMutation({
    mutationFn: updateIncidentPriorityHandler,
    onSuccess: (_, variables) => {
      queryClient.setQueryData(["unseenIncidents"], (oldData: Incident[]) => {
        return oldData.filter(
          (incident) => incident.id !== variables.incidentId,
        );
      });
    },
  });

  const onSumitSetPriority = (incidentId: number) => {
    const priority = priorities[incidentId];
    if (!priority) return;
    updateIncidentPriority({ newPriority: priority, incidentId });
  };

  if (isError) {
    toast.error(error.message);
    return (
      <Empty className="h-full">
        <EmptyHeader className="flex flex-row items-center justify-center">
          <EmptyMedia variant="icon" className="m-0">
            <CircleAlert color="red" />
          </EmptyMedia>
          <EmptyTitle className="text-foreground ">
            Error fetching data
          </EmptyTitle>
        </EmptyHeader>
        <EmptyContent>
          <ButtonComp className="w-50 font-bold" onClick={() => refetch()}>
            Refetch
          </ButtonComp>
        </EmptyContent>
      </Empty>
    );
  }

  if (incident_card_items?.length === 0) {
    return (
      <Empty className="h-full">
        <EmptyHeader className="flex flex-row items-center justify-center">
          <EmptyMedia variant="icon" className="m-0">
            <PartyPopper className="text-muted-foreground" />
          </EmptyMedia>
          <EmptyTitle className="text-muted-foreground">
            Woohoo, zero unseen incidents!
          </EmptyTitle>
        </EmptyHeader>
      </Empty>
    );
  }

  if (isLoading)
    return (
      <div className="text-white flex justify-center h-full w-full">
        <Loading title="Unseen Incidents" />
      </div>
    );

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 p-5 gap-5">
      {incident_card_items?.map((item, i) => (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 * i, ease: "easeIn" }}
          className="cursor-pointer"
        >
          <Card className="bg-card p-5 sm:p-10">
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
