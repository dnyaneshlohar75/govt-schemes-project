import { Router } from "express";
import { sendOneTimePassword, verifyOneTimePassword } from "../controller/auth.controller";

const authRoute = Router();

authRoute.post("/otp/send", sendOneTimePassword);
authRoute.post("/otp/verify", verifyOneTimePassword);

export default authRoute;