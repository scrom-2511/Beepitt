import { motion } from "framer-motion";
import ButtonComp from "./ButtonComp";
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
const error_card_items = [
  {
    id: "err_001",
    title: "Database Connection Failed",
    errorDesc:
      "The application was unable to connect to the primary database after multiple retry attempts, resulting in request timeouts.",
    type: "critical",
    date: "2026-01-05",
    time: "08:12 AM",
  },
  {
    id: "err_002",
    title: "High Memory Usage Detected",
    errorDesc:
      "Memory consumption exceeded the safe threshold, which may lead to degraded performance or unexpected application restarts.",
    type: "high",
    date: "2026-01-06",
    time: "02:34 PM",
  },
  {
    id: "err_003",
    title: "Authentication Token Expired",
    errorDesc:
      "User authentication failed because the access token had expired and was no longer valid at the time of the request.",
    type: "high",
    date: "2026-01-06",
    time: "06:51 PM",
  },
  {
    id: "err_004",
    title: "API Response Timeout",
    errorDesc:
      "A third-party service API took longer than expected to respond, causing the request to exceed the configured timeout limit.",
    type: "critical",
    date: "2026-01-07",
    time: "11:09 AM",
  },
  {
    id: "err_005",
    title: "Disk Space Warning",
    errorDesc:
      "Available disk space has dropped below the recommended threshold, which may impact file writes and logging operations.",
    type: "low",
    date: "2026-01-08",
    time: "04:27 AM",
  },
  {
    id: "err_006",
    title: "Background Job Delay",
    errorDesc:
      "Several scheduled background jobs are executing later than expected due to increased queue size and worker saturation.",
    type: "low",
    date: "2026-01-09",
    time: "09:45 AM",
  },
  {
    id: "err_007",
    title: "Configuration Mismatch",
    errorDesc:
      "A mismatch was detected between environment variables and application configuration, potentially causing inconsistent behavior.",
    type: "high",
    date: "2026-01-10",
    time: "01:56 PM",
  },
  {
    id: "err_008",
    title: "Service Restart Required",
    errorDesc:
      "The service entered an unstable state and requires a restart to restore normal operation and prevent further failures.",
    type: "critical",
    date: "2026-01-11",
    time: "07:38 PM",
  },
  {
    id: "err_009",
    title: "Cache Synchronization Issue",
    errorDesc:
      "Cached data is out of sync with the source of truth, which may result in stale or incorrect information being served.",
    type: "low",
    date: "2026-01-12",
    time: "10:14 AM",
  },
  {
    id: "err_010",
    title: "Permission Denied",
    errorDesc:
      "An operation failed because the requesting user or service does not have sufficient permissions to access the resource.",
    type: "high",
    date: "2026-01-13",
    time: "03:22 PM",
  },
];

const ErrorCardsSection = () => {
  return (
    <section className="grid grid-cols-3 p-5 gap-5">
      {error_card_items.map((item) => (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, ease: "easeIn" }}
          className="cursor-pointer"
        >
          <Card className="bg-card p-10">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="line-clamp-2">{item.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {item.errorDesc}
              </CardDescription>
            </CardHeader>
            <div>
              <CardDescription className="text-foreground p-0 m-0">
                Error Occured At:{" "}
              </CardDescription>
              <CardContent className="p-0 font-semibold text-sm flex flex-row gap-2 w-full my-2">
                <Button variant={"outline"} className="flex-1">
                  {item.date}
                </Button>
                <Button variant={"outline"} className="flex-1">
                  {item.time}
                </Button>
              </CardContent>
            </div>
            <div>
              <CardDescription className="text-foreground p-0 m-0">
                Error Fixed At:{" "}
              </CardDescription>
              <CardContent className="p-0 font-semibold text-sm flex flex-row gap-2 w-full my-2 mb-6">
                <Button variant={"outline"} className="flex-1">
                  {item.date}
                </Button>
                <Button variant={"outline"} className="flex-1">
                  {item.time}
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
