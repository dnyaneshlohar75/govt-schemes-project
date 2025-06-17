import { Request, Response } from "express";

export async function getUserDetailsById(request: Request, response: Response) {
    const { userId } = request.params;
}