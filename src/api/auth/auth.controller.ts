import { Request, Response, NextFunction } from "express";
import { Logger } from "../../infra/logger";
import { AppError } from "./../../errors/appErrors";
import { RegisterReqBody } from "./auth.models";
import { AuthService } from "./auth.service";

export namespace AuthController {
    export const register = async (req: Request<RegisterReqBody>, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;
            await AuthService.createUser(email, password);
            return res.status(200).json({ success: true, message: "" });
        } catch (error: unknown) {
            if (error instanceof AppError) {
                Logger.error(error);
                if (error instanceof AppError)
                    return res.status(error.status === undefined ? 500 : error.status).json({
                        success: false,
                        message: error.message,
                        ids: [{ id: null, name: null }],
                    });
                throw error;
            }
        }
    };

    export const login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await AuthService.listUsers();
            console.log(users);
            return res.status(200).json({ success: true, message: "", itens: users });
        } catch (error: unknown) {
            if (error instanceof AppError) {
                Logger.error(error);
                if (error instanceof AppError)
                    return res.status(error.status === undefined ? 500 : error.status).json({
                        success: false,
                        message: error.message,
                        ids: [{ id: null, name: null }],
                    });
                throw error;
            }
        }
    };
}
