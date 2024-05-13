import { Request, Response, NextFunction } from "express";
import { Logger } from "../../infra/logger";
import { AppError } from "./../../errors/appErrors";
import { CreateUserReqBody, RequestParams, RequestResponse, PaginatedResponse, PaginateQuery } from "./users.models";
import { UsersService } from "./users.service";

export namespace UserController {
    export const updateUser = async (
        req: Request<RequestParams, any, CreateUserReqBody>,
        res: Response<RequestResponse>,
        next: NextFunction,
    ) => {
        try {
            const { id } = req.params;
            const { email, password } = req.body;
            const result = await UsersService.updateUser(id, email, password);
            return res.status(200).json({ success: true, message: "", items: [result] });
        } catch (error: unknown) {
            Logger.error("Failed to update user", error);
            if (error instanceof AppError)
                return res.status(error.status === undefined ? 500 : error.status).json({
                    success: false,
                    message: error.message,
                    items: [],
                });
            throw error;
        }
    };

    export const deleteUser = async (
        req: Request<RequestParams>,
        res: Response<RequestResponse>,
        next: NextFunction,
    ) => {
        try {
            const { id } = req.params;
            await UsersService.deleteUser(id);
            return res.status(200).json({ success: true, message: "", items: [] });
        } catch (error: unknown) {
            Logger.error("Failed to update user", error);
            if (error instanceof AppError)
                return res.status(error.status === undefined ? 500 : error.status).json({
                    success: false,
                    message: error.message,
                    items: [],
                });
            throw error;
        }
    };

    export const listAllUsers = async (
        req: Request<any, any, any, PaginateQuery>,
        res: Response<PaginatedResponse>,
        next: NextFunction,
    ) => {
        try {
            const { pageNumber, pageSize } = req.query;
            const [users, totalItems] = await Promise.all([
                await UsersService.listUsers(pageNumber, pageSize),
                await UsersService.countUsers(),
            ]);
            return res.status(200).json({
                success: true,
                message: "",
                items: users,
                pageNumber,
                pageSize,
                totalItems,
            });
        } catch (error: unknown) {
            Logger.error("Failed to update user", error);
            if (error instanceof AppError)
                return res.status(error.status === undefined ? 500 : error.status).json({
                    success: false,
                    message: error.message,
                    items: [],
                    pageNumber: 0,
                    pageSize: 0,
                    totalItems: 0,
                });
            throw error;
        }
    };
}
