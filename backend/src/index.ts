import express, { Express } from "express";
import { connectToDatabase } from "./database/Database";
import { userRouter } from "./routes/User.Route";
import { appRouter } from "./routes/App.Router";
import cors from "cors"

const app: Express = express();
connectToDatabase();


app.use(express.json());
app.use(cors())
app.use("/user", userRouter)
app.use("/app", appRouter)

app.listen(3000)