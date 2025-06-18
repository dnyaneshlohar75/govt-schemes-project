import cors from "cors";
import dotenv from "dotenv";
dotenv.config()

const port = 5000

import express from 'express';
import userRoute from "./routes/user";
import { welcome } from "./controller/public.controller";
import authRoute from "./routes/auth";
import db from "./config/db";
import schemeRoute from "./routes/schemes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth/", authRoute);
app.use('/api/user/', userRoute);
app.use('/api/schemes/', schemeRoute);

app.get("/", welcome);

app.listen(port, () => {
  console.log("[INFO] Express server started on port", port);
  console.log("[INFO] Environment:", process.env.NODE_ENV || "development");
  console.log("[INFO] Version:", process.env.VERSION || "1.0.0");
  console.log("[INFO] Timestamp:", new Date().toLocaleString());

  db.$connect()
  .then(() => console.log("[INFO] Postgres Server connected"))
  .catch((error: any) => console.error("[ERROR] Database server connection failed:", error?.message));
})