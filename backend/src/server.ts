import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express } from "express";
import { appRouter } from "./routes/app.Route";
import { userRouter } from "./routes/user.Route";
const app: Express = express();

app.use(cookieParser())
app.use(express.json());
app.use(cors({origin: "http://localhost:5173", credentials: true}))
app.use("/user", userRouter)
app.use("/app", appRouter)

app.listen(3000)