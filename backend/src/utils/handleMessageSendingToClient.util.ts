import { produceMessageForMessageSender } from "../services/kafka/producerMessageSender";
import { ProducerMessage } from "../types/dataTypes.ts";

interface InputData {
  errorName: string;
  errorDesc: string;
  userId: number;
}

export const handleMessageSendingToClient = async(data: InputData) => {
  const dataToSend: ProducerMessage = {
    key: data.userId.toString(),
    value: JSON.stringify(data),
  };
  await produceMessageForMessageSender(dataToSend);
};