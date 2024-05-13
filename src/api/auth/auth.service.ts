import db from "./../../infra/database";

export namespace AuthService {
    const userDB = db.connectToDatabase("users");

    export const createUser = async (email: string, password: string) => {
        const result = await (await userDB).insertOne({ email, password });
        return result;
    };

    export const listUsers = async () => {
        const result = await (await userDB).find().toArray();
        return result;
    };
}
