import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: "beepitt_client",
  brokers: ["localhost:9092"],
});
