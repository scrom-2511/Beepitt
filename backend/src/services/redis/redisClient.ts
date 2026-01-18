import { createClient } from 'redis';

const client = createClient();

client.on('error', console.error);

await client.connect();

export { client };
