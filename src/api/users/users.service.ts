import { ObjectId } from "mongodb";
import userDB from "./../../infra/database";
import { AppError } from "../../errors/appErrors";
import { StatusCode } from "../http/status-code";
import { ErrorCodes } from "../common/errors";

export namespace UsersService {
    export const updateUser = async (id: string, name: string, email: string, password: string) => {
        const filter = { _id: new ObjectId(id) };
        const result = await (await userDB).findOneAndReplace(filter, { _id: new ObjectId(id), name, email, password });
        if (result == null) {
            throw new AppError(StatusCode.NOT_FOUND, "usuário não encontrado", ErrorCodes.API.NotFound);
        }
        return { _id: result!._id.toString(), name: result!.name, email: result!.email };
    };

    export const deleteUser = async (id: string) => {
        const filter = { _id: new ObjectId(id) };
        const result = await (await userDB).findOneAndDelete(filter);
        if (result == null) {
            throw new AppError(StatusCode.NOT_FOUND, "usuário não encontrado", ErrorCodes.API.NotFound);
        }
        return result!.email;
    };

    export const listUsers = async (
        pageNumber: number,
        pageSize: number,
    ): Promise<Array<{ _id: string; email: string }>> => {
        const results = await (
            await userDB
        )
            .find()
            .sort("_id")
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .toArray();

        return results.map((result) => {
            return { _id: result._id.toString(), name: result.name, email: result.email };
        });
    };

    export const countUsers = async () => {
        return await (await userDB).countDocuments();
    };
}
