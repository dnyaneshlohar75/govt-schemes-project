import cors from "cors";
import dotenv from "dotenv";
dotenv.config()

const port = 5000

import express from 'express';
import userRoute from "./routes/user";
import { welcome } from "./controller/public.controller";
import authRoute from "./routes/auth";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth/", authRoute);
app.use('/api/user/', userRoute);

app.get("/", welcome);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})