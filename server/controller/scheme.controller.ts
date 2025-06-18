import { Request, Response } from "express";
import db from "../config/db";

export async function getEligibleSchemes(request: Request, response: Response): Promise<void> {
    const { userId } = request.params;

    try {
        const user = await db.user_table.findFirst({
            where: { user_id: userId },
            include: { documents: true },
        });

        if (!user) {
            response.status(404).json({
                message: "User not found",
                response: false,
                timestamp: new Date(),
            });
            return;
        }

        const userDocs = user.documents.map((doc) => doc.name.toLowerCase().trim());

        const schemes = await db.scheme_table.findMany({
            include: { required_documents: true },
        });

        const eligibilityResults = schemes.map((scheme) => {
            const requiredDocs = scheme.required_documents.map((doc) => doc.document_name.toLowerCase().trim());

            const submittedDocs = userDocs.filter((doc) => requiredDocs.includes(doc));
            const missingDocs = requiredDocs.filter((doc) => !userDocs.includes(doc));

            const eligibilityScore = Math.round((submittedDocs.length / requiredDocs.length) * 100);
            const isEligible = missingDocs.length === 0;

            return {
                scheme: {
                    scheme_id: scheme.scheme_id,
                    scheme_name: scheme.name,
                    description: scheme.description,
                    benefits: scheme.benefits,
                    beneficiary: scheme.beneficiary,
                    owner: scheme.owner,
                },
                isEligible,
                eligibilityScore,
                missingDocuments: missingDocs,
                requiredDocuments: requiredDocs,
            };
        });

        response.status(200).json({
            message: "Eligibility check completed",
            response: true,
            timestamp: new Date(),
            results: eligibilityResults,
        });

    } catch (error) {
        console.error("[ERROR] Error checking eligibility:", error);
        response.status(500).json({
            message: "Internal server error",
            error,
            response: false,
            timestamp: new Date(),
        });
    }

}