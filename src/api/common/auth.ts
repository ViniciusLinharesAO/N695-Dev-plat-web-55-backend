import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { StatusCode } from "../http/status-code";

export const SECRET_KEY: Secret = "your-secret-key-here";

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new Error();
        }

        const decoded = jwt.verify(token, SECRET_KEY);
        (req as CustomRequest).token = decoded;

        next();
    } catch (err) {
        res.status(StatusCode.UNAUTHORIZED).json({
            success: false,
            message: "UNAUTHORIZED",
            items: [],
        });
    }
};
