import axios from 'axios';
import { prisma } from '../../../database/prismaClient';
import { kafka } from '../kafkaClient';

interface LocationResponse {
  status: string;
  city: string;
  timezone: string;
}

const consumer = kafka.consumer({
  groupId: 'location-detector-consumer',
  minBytes: 1000000,
  maxWaitTimeInMs: 10000,
});

export const consumerConnect = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'location-detector' });
};

export const consumerLocationDetector = async () => {
  console.log('this is now working');
  await consumer.run({
    autoCommit: false,
    eachBatch: async ({ batch, heartbeat }) => {
      console.log('this is from consumer location detector');
      const ips_arr = [];
      const userIds = [];
      if (batch.messages.length === 0) return;
      for (const message of batch.messages) {
        const parsed = JSON.parse(message.value?.toString() || '{}');
        if (parsed.ip) {
          ips_arr.push(parsed.ip.toString());
          userIds.push(Number(message.key));
        }
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

      console.log(ips_arr);

      try {
        const res = await axios.post(
          'http://ip-api.com/batch?fields=status,city,timezone',
          ips_arr,
        );

        console.log(res.data);

        const res_data_arr: LocationResponse[] = res.data;

        if (res_data_arr.length !== userIds.length) {
          throw new Error('API response size mismatch');
        }

        await prisma.$transaction(
          userIds.map((userId, i) => {
            const r = res_data_arr[i];
            if (r.status !== 'success')
              return prisma.user.update({
                where: { id: userId },
                data: { city: null, timezone: null },
              });

            return prisma.user.update({
              where: { id: userId },
              data: { city: r.city, timezone: r.timezone },
            });
          }),
        );

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
