import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express } from 'express';
import { appRouter } from './routes/app.Route';
import { appWebhook } from './routes/app.webhooks';
import { userRouter } from './routes/user.Route';
import { discordClient } from './utils/discordBeep.util';
const app: Express = express();

app.use(cookieParser());
app.use(express.json());

app.use((req, res, next) => {
  console.log('ORIGIN:', req.headers.origin);
  res.setHeader('X-CORS-DEBUG', 'MAIN_APP');
  next();
});

app.use(
  cors({
    origin: [
      "https://filtering-designed-jun-mayor.trycloudflare.com",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get('/user/__debug', (req, res) => {
  res.send('THIS IS MY SERVER');
});

discordClient.once('clientReady', () => {
  console.log(`Discord bot logged in as ${discordClient.user?.tag}`);
});

app.use('/user', userRouter);
app.use('/app', appRouter);
app.use('/app/webhook', appWebhook);

app.listen(3000, '0.0.0.0', () => {
  console.log('WSL server listening');
});
