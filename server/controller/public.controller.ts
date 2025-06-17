import { Request, Response } from "express";
import db from "../config/db";

export async function welcome(request: Request, response: Response) {
    response.json({
        message: "Welcome to the Express server!",
        env: process.env.NODE_ENV || "development",
        version: process.env.VERSION || "1.0.0",
        timeStamp: new Date().toLocaleString()
    });
}