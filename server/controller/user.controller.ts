import { Request, Response } from "express";
import db from "../config/db";

export async function getUserDetailsById(request: Request, response: Response) {
    const { userId } = request.params;

    try {
        const user = await db.user_table.findFirst({
            where: { user_id: userId },
            include: { documents: true }
        });

        if (!user) {
            response.status(404).json({ message: "User not found" });
            return;
        }

        const userDetails = {
            userId: user.user_id,
            name: user.name,
            email: user.email_id,
            uidaiNumber: user.uidai_number,
            mobileNumber: user.mobile_number,
            documents: user.documents.map(doc => ({
                id: doc.user_document_id,
                name: doc.name,
                type: doc.type,
                size: doc.size,
                url: doc.document_url,
                approved: doc.is_verified                                                                            
            }))
        }

        response.status(200).json({
            message: "User details retrieved successfully",
            response: true,
            timestamp: new Date(Date.now()),
            user: userDetails
        });
    } catch (error) {
        console.error("[ERROR] Error retrieving user details:", error);
        response.status(500).json({ message: "Internal server error", error, response: false, timestamp: new Date(Date.now()) });
    }
}