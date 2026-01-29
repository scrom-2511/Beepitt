import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express } from 'express';
import { appRouter } from './routes/app.Route';
import { userRouter } from './routes/user.Route';
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
      "https://justin-delivers-final-newton.trycloudflare.com",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get('/user/__debug', (req, res) => {
  res.send('THIS IS MY SERVER');
});

app.use('/user', userRouter);
app.use('/app', appRouter);

// await connectProducer();
// await consumerConnect();
// await consumerLocationDetector();

app.listen(3000, '0.0.0.0', () => {
  console.log('WSL server listening');
});
