import { Router } from "express";
import { authenticate } from "../middleware/middleware";
import multer from 'multer';
import { chatWith8n8 } from "../controller/chatbot.controller";

const upload = multer({ dest: 'uploads/' });

const chatbotRoute = Router();

chatbotRoute.post('/', upload.single('audio'), chatWith8n8);

export default chatbotRoute;