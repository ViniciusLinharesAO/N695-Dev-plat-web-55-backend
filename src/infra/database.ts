import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import { Env } from "./../config/env";

namespace db {
    export async function connectToDatabase(targetCollection: string) {
        dotenv.config();

        console.log(Env.MONGO_DB_CONN_STRING);
        const client: mongoDB.MongoClient = new mongoDB.MongoClient(Env.MONGO_DB_CONN_STRING);
        await client.connect();

        const db: mongoDB.Db = client.db(Env.MONGO_DB_NAME);
        console.log(`Successfully connected to database: ${db.databaseName}`);

        const collection: mongoDB.Collection = db.collection(targetCollection);
        console.log(`Successfully connected to db collection: ${targetCollection}`);

        return collection;
    }
}

export default db.connectToDatabase("users");
