import { Request, Response, NextFunction } from "express";
import { AppError } from "./../../errors/appErrors";
import { RegisterReqBody, RequestResponse } from "./auth.models";
import { AuthService } from "./auth.service";
import { StatusCode } from "../http/status-code";

export namespace AuthController {
    export const register = async (
        req: Request<any, any, RegisterReqBody>,
        res: Response<RequestResponse>,
        next: NextFunction,
    ) => {
        try {
            const { email, password } = req.body;
            const result = await AuthService.createUser(email, password);
            return res
                .status(StatusCode.OK)
                .json({ success: true, message: "usuário criado com sucesso", items: [{ userId: result }] });
        } catch (error: unknown) {
            console.error("Failed to register user", error);
            if (error instanceof AppError)
                return res.status(error.status === undefined ? StatusCode.INTERNAL_SERVER_ERROR : error.status).json({
                    success: false,
                    message: error.message,
                    items: [],
                });
            return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "unexpected error",
                items: [],
            });
        }
    };

    export const login = async (
        req: Request<any, any, RegisterReqBody>,
        res: Response<RequestResponse>,
        next: NextFunction,
    ) => {
        try {
            const { email, password } = req.body;
            const result = await AuthService.loginUser(email, password);
            return res
                .status(StatusCode.OK)
                .json({ success: true, message: "usuário logado com sucesso", items: [result] });
        } catch (error: unknown) {
            console.error("Failed to register user", error);
            if (error instanceof AppError)
                return res.status(error.status === undefined ? StatusCode.INTERNAL_SERVER_ERROR : error.status).json({
                    success: false,
                    message: error.message,
                    items: [],
                });
            return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "unexpected error",
                items: [],
            });
        }
    };
}
