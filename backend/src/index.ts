import express, { Express } from "express";
import { connectToDatabase } from "./database/Database";
import { userRouter } from "./routes/User.Route";
import { appRouter } from "./routes/App.Router";
import cors from "cors"
import cookieParser from "cookie-parser"
const app: Express = express();
connectToDatabase();

app.use(cookieParser())
app.use(express.json());
app.use(cors({origin: "http://localhost:5173", credentials: true}))
app.use("/user", userRouter)
app.use("/app", appRouter)

app.listen(3000)