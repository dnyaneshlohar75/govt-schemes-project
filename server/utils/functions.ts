import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || "EK_MULAKAT_ZAROORI_HAI_SANAM";

export const generateToken = (payload: string, expiresIn = "1h"): string => {
  return jwt?.sign(payload, SECRET_KEY);
};

export const verifyToken = (token: string): any | null => {
  return jwt.verify(token, SECRET_KEY);
};