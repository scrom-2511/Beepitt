import express, { Express } from "express";
import { connectToDatabase } from "./database/Database";
import { userRouter } from "./routes/User.Route";


const app: Express = express();
connectToDatabase();

app.use(express.json());
app.use("/user", userRouter)

app.listen(3000)