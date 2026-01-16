import { kafka } from "./kafkaClient";

const producer = kafka.producer();

interface Message {
  key: string;
  value: string;
}

export const connectProducer = async () => {
  await producer.connect();
};

export const locationDetectorProducerSend = async (message: Message) => {
  try {
    await producer.send({
      topic: "location-detector",
      messages: [message],
    });
  } catch (error) {
    console.error("Kafka producer error:", error);
  }
};
