import { ProducerMessage } from '../../../types/dataTypes';
import { producer } from '../producer';

export const locationDetectorProducerSend = async (
  message: ProducerMessage,
) => {
  try {
    console.log("this is from producer location detector");
    await producer.send({
      topic: 'location-detector',
      messages: [message],
    });
  } catch (error) {
    console.error('Kafka producer error:', error);
  }
};
