import { Request, Response } from "express";
import { redis } from "../config/redis";
import bcrypt from 'bcrypt'
import { client } from "../config/twilio";
import { generateToken } from "../utils/functions";

export async function sendOneTimePassword(request: Request, response: Response) {
    const { aadharCardNumber } = request.body;
    const OTP_EXPIRY = parseInt(process.env.OTP_EXPIRY as string) || 300;
        
    if (!aadharCardNumber) {
        response.status(400).json({ error: "Aadhar card number is required" });
        return;
    }

    try {
        //find mobile number using aadhar card number
        const contactNumber = "+917499378600";

        const isOTPExist = await redis.get(aadharCardNumber);
        
        if (isOTPExist) {
            response.json({ message: "OTP already sent, please wait for the expiry time" }).status(400);
            return;
        }
        
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const encryptedOTP = bcrypt.hashSync(otp, 7);

        await redis.setex(aadharCardNumber, OTP_EXPIRY, encryptedOTP);

        client.messages.create({
            to: `+91${contactNumber}`,
            from: process.env.TWILIO_PHONE_NUMBER as string,
            body: `Hi User, Your One-Time Password is ${otp}`,
            messagingServiceSid: 'MGab6e0667c3b0d71fdccf8d1c0399de66',
        }).then(msg => console.log(msg.sid)).catch(err => console.log("[ERROR]", err));

        response.json({ message: "OTP sent successfully" }).status(200);

    } catch(error) {
        console.error("Error sending OTP:", error);
        response.status(500).json({ error: "Failed to send OTP" });
        return;
    }
}

export async function verifyOneTimePassword(request: Request, response: Response) {
    const {otp, aadharCardNumber} = request.body;

    try {
        const storedOTP = await redis.get(aadharCardNumber);

        if (!storedOTP) {
            response.json({ message: "OTP expired or not found" }).status(400);
            return;
        }

        const isUserExist = {
            userId: "12345",
            name: "John Doe",
            username: "johndoe",
            email: "abc@gmail.com"
        };

        if (bcrypt.compareSync(otp, storedOTP)) {
            
            const token = generateToken(isUserExist);
            response.json({ message: "User logged in", token, user: isUserExist }).status(200);

            await redis.del(aadharCardNumber);
            response.json({ message: "OTP verified successfully" }).status(200);

            return;
        } else {
            response.json({ message: "Invalid OTP, try again" }).status(400);
            return;
        }
    } catch (error) {
        response.json({ error: error, message: "Something went wrong" }).status(500);
    }  
}