import { Request, Response } from "express";
import { redis } from "../config/redis";
import bcrypt from 'bcrypt'
import { client } from "../config/twilio";
import { generateToken } from "../utils/functions";
import db from "../config/db";

export async function sendOneTimePassword(request: Request, response: Response) {
    const { aadharCardNumber } = request.body;
    const OTP_EXPIRY = parseInt(process.env.OTP_EXPIRY as string) || 300;

    if (!aadharCardNumber) {
        response.status(400).json({ error: "Aadhar card number is required" });
        return;
    }

    try {
        const user = await db.user_table.findFirst({
            where: { uidai_number: aadharCardNumber },
            select: { mobile_number: true, name: true }
        });

        if (!user?.mobile_number) {
            response.json({ message: "Your mobile number is not linked with aadhar card." }).status(400);
            return;
        }

        const isOTPExist = await redis.get(user?.mobile_number);

        if (isOTPExist) {
            response.json({ message: "OTP already sent, please wait for the expiry time" }).status(400);
            return;
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const encryptedOTP = bcrypt.hashSync(otp, 7);

        await redis.setex(user?.mobile_number, OTP_EXPIRY, encryptedOTP);

        client.messages.create({
            to: `+91${user?.mobile_number}`,
            from: process.env.TWILIO_PHONE_NUMBER as string,
            body: `Hi ${user.name}, Your One-Time Password is ${otp}`,
            messagingServiceSid: 'MGab6e0667c3b0d71fdccf8d1c0399de66',
        }).then(msg => console.log(msg.sid)).catch(err => console.log("[ERROR]", err));

        response.json({ message: "OTP sent successfully" }).status(200);

    } catch (error) {
        console.error("Error sending OTP:", error);
        response.status(500).json({ message: "Failed to send OTP" });
        return;
    }
}

export async function verifyOneTimePassword(request: Request, response: Response) {
    const { otp, aadharCardNumber } = request.body;

    try {
        const isUserExist = await db.user_table.findFirst({ where: { uidai_number: aadharCardNumber } });
        const storedOTP = await redis.get(isUserExist?.mobile_number as string);

        if (!storedOTP) {
            response.json({ message: "OTP expired or not found" }).status(400);
            return;
        }

        if (bcrypt.compareSync(otp, storedOTP)) {
            const token = generateToken(isUserExist?.user_id as string);

            await redis.del(isUserExist?.mobile_number as string);

            response.status(200).json({
                message: "OTP verified successfully",
                token,
                user: isUserExist,
            });
        } else {
            response.status(400).json({ message: "Invalid OTP, try again" });
        }
    } catch (error) {
        response.json({ error: error, message: "Something went wrong" }).status(500);
    }
}