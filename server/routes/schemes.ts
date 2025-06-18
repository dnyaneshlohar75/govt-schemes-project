import { Router } from "express";
import { authenticate } from "../middleware/middleware";
import { getEligibleSchemes } from "../controller/scheme.controller";

const schemeRoute = Router();

schemeRoute.post('/all', authenticate, getEligibleSchemes);


export default schemeRoute;