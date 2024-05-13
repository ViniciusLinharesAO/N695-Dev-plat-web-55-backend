import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import * as env from "../config/env";

namespace db {
    export async function connectToDatabase(targetCollection: string) {
        dotenv.config();

        console.log(env.MONGO_DB_CONN_STRING);
        const client: mongoDB.MongoClient = new mongoDB.MongoClient(
            "mongodb+srv://viniciusaoliveira:nSyqjGr6lqbOQfN7@n695-55.r2o3250.mongodb.net/?retryWrites=true&w=majority&appName=N695-55",
        );
        await client.connect();

        const db: mongoDB.Db = client.db(env.MONGO_DB_NAME);

        console.log(`Successfully connected to database: ${db.databaseName}`);

        const collection: mongoDB.Collection = db.collection(targetCollection);

        if (env.LOGGER_LEVEL === "DEBUG")
            console.log(`Successfully connected to database: ${db.databaseName} and collection: ${collection}`);

        return collection;
    }
}

export default db;
