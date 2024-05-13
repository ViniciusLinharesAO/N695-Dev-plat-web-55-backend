import db from "./../../infra/database";

export namespace UsersService {
    const userDB = db.connectToDatabase("users");

    export const updateUser = async (id: string, email: string, password: string) => {
        const filter = { id };
        return await (await userDB).findOneAndUpdate(filter, { id, email, password });
    };

    export const deleteUser = async (id: string) => {
        const filter = { id };
        return await (await userDB).deleteOne(filter);
    };

    export const listUsers = async (pageNumber: number, pageSize: number) => {
        return await (
            await userDB
        )
            .find()
            .sort("id")
            .skip(pageNumber * pageSize)
            .limit(pageSize)
            .toArray();
    };

    export const countUsers = async () => {
        return await (await userDB).countDocuments();
    };
}
