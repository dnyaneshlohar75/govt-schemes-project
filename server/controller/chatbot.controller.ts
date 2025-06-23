import { Request, Response } from "express";

import dotenv from "dotenv";
dotenv.config();

export async function chatWith8n8(request: Request, response: Response) {
    
    try {
        let chatInput = request.body.chatInput;

        const resp = await fetch(process.env.N8N_WEBHOOK_URL || "https://dnyaneshlohar75.app.n8n.cloud/webhook-test/58b39116-7151-498d-ae43-d67491f03acc", {
            method: "POST",
            body: JSON.stringify({
                userId: request.body.userId || "dummy-id",
                chatInput,
                language: "mr"
            })
        });

        const data = await resp.json();

        response.status(200).json({ status: 'success', response: data });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Something went wrong.', message: error });
    }
}