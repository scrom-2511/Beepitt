import axios from "axios";
import { kafka } from "./kafkaClient";

const consumer = kafka.consumer({
  groupId: "location-detector-consumer",
  maxWaitTimeInMs: 5000,
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
      for (const message of batch.messages) {
        ips_arr.push(message.value?.toString());
      }
      try {
        let res = await axios.post("http://ip-api.com/batch", ips_arr);
      } catch (error) {}
      const lastOffset = batch.messages[batch.messages.length - 1].offset;
      await consumer.commitOffsets([
        {
          partition: batch.partition,
          topic: batch.topic,
          offset: (Number(lastOffset) + 1).toString(),
        },
      ]);
      await heartbeat();
    },
  });
};

consumerConnect();
consumerLocationDetector();
