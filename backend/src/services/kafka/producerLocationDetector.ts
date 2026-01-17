import { ProducerMessage } from "../../types/dataTypes";
import { kafka } from "./kafkaClient";

const producer = kafka.producer();

export const connectProducer = async () => {
  await producer.connect();
};

export const locationDetectorProducerSend = async (message: ProducerMessage) => {
  try {
    await producer.send({
      topic: "location-detector",
      messages: [message],
    });
  } catch (error) {
    console.error("Kafka producer error:", error);
  }
};
