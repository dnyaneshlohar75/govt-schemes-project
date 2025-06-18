import { Router } from "express";
import { authenticate } from "../middleware/middleware";
import { createNewUser, getUserDetailsById } from "../controller/user.controller";

const userRoute = Router();

userRoute.post('/create', createNewUser);
userRoute.get("/:id", authenticate, getUserDetailsById);

export default userRoute;