import { Router } from "express";
import { authenticate } from "../middleware/middleware";
import { getUserDetailsById } from "../controller/user.controller";

const userRoute = Router();

userRoute.get("/:id", authenticate, getUserDetailsById);

export default userRoute;
