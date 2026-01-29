import { kafka } from "./kafkaClient";

const producer = kafka.producer();
let isConnected = false;

export const connectProducer = async () => {
  if (!isConnected) {
    await producer.connect();
    isConnected = true;
  }
};

export { producer };
