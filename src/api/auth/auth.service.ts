import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AppError } from "../../errors/appErrors";
import { ErrorCodes } from "../common/errors";
import { StatusCode } from "../http/status-code";
import userDB from "./../../infra/database";
import { MongoServerError } from "mongodb";
import { SECRET_KEY } from "./../common/auth";

export namespace AuthService {
    export const createUser = async (name: string, email: string, password: string): Promise<string> => {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await (await userDB).insertOne({ name, email, password: hashedPassword });
            return result.insertedId.toString();
        } catch (error) {
            if (error instanceof MongoServerError) {
                throw new AppError(StatusCode.BAD_REQUEST, error.message, ErrorCodes.API.Validation);
            }
            throw error;
        }
    };

    export const loginUser = async (
        email: string,
        password: string,
    ): Promise<{ user: { _id: string; name: string; email: string }; token: string }> => {
        try {
            const filter = { email };
            const result = await (await userDB).findOne(filter);
            const validPassword = await bcrypt.compare(password, result!.password);
            if (validPassword === false) {
                throw new AppError(StatusCode.UNAUTHORIZED, "email ou senha errados", ErrorCodes.API.Unauthorized);
            }
            const token = jwt.sign({ _id: result!._id?.toString(), email: result!.email }, SECRET_KEY, {
                expiresIn: "2 days",
            });

            return { user: { _id: result!._id?.toString(), name: result!.name, email: result!.email }, token: token };
        } catch (error) {
            if (error instanceof MongoServerError) {
                throw new AppError(StatusCode.BAD_REQUEST, error.message, ErrorCodes.API.Validation);
            }
            throw error;
        }
    };
}
