import axios from "axios";
import { kafka } from "./kafkaClient";

const consumer = kafka.consumer({
  groupId: "location-detector-consumer",
  minBytes: 1000000,
  maxWaitTimeInMs: 10000,
});

const consumerConnect = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "location-detector" });
};

const consumerLocationDetector = async () => {
  await consumer.run({
    autoCommit: false,
    eachBatch: async ({ batch, heartbeat }) => {
      let ips_arr = [];
      if (batch.messages.length === 0) return;
      for (const message of batch.messages) {
        const parsed = JSON.parse(message.value?.toString() || "{}");
        if (parsed.ip) ips_arr.push(parsed.ip.toString());
      }

      if (!ips_arr.length) {
        const lastOffset = batch.messages[batch.messages.length - 1].offset;

        await consumer.commitOffsets([
          {
            topic: batch.topic,
            partition: batch.partition,
            offset: (Number(lastOffset) + 1).toString(),
          },
        ]);
        return;
      }

      try {
        await heartbeat();
        let res = await axios.post("http://ip-api.com/batch", ips_arr);
        await heartbeat();
        const lastOffset = batch.messages[batch.messages.length - 1].offset;
        await consumer.commitOffsets([
          {
            partition: batch.partition,
            topic: batch.topic,
            offset: (Number(lastOffset) + 1).toString(),
          },
        ]);
      } catch (error) {
        console.error(error);
        consumer.pause([{ topic: batch.topic, partitions: [batch.partition] }]);

        await heartbeat();
        await new Promise((resolve) => setTimeout(resolve, 10000));
        await heartbeat();

        consumer.resume([
          { topic: batch.topic, partitions: [batch.partition] },
        ]);
      }
    },
  });
};

consumerConnect();
consumerLocationDetector();
