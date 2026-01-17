import { ProducerMessage } from "../../types/dataTypes";
import { kafka } from "./kafkaClient";

const producer = kafka.producer({ allowAutoTopicCreation: true });

const connectProducer = async () => {
  await producer.connect();
};

export const produceMessageForMessageSender = async (
  message: ProducerMessage
) => {
  try {
    await producer.send({ topic: "message-sender", messages: [message] });
  } catch (error) {
    console.error(error);
  }
};
