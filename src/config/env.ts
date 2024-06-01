declare global {
    namespace NodeJS {
        interface ProcessEnv {
            HTTP_PORT?: string;
            MONGO_DB_CONN_STRING?: string;
            MONGO_DB_NAME?: string;

            LOGGER_LEVEL: "silent" | "info" | "warn" | "error" | "fatal";
        }
    }
}

export namespace Env {
    export const requiredEnvs: string[] = [];

    const requiredEnv = (envName: string) => {
        requiredEnvs.push(envName);
        return process.env[envName] ?? envName;
    };

    export const checkRequiredEnvs = () => {
        const errors = requiredEnvs.reduce((result, env) => {
            if (!(env in process.env)) result.push(new Error(`Missing required env: ${env}`));
            return result;
        }, new Array<Error>());
        for (const error of errors) console.error(error);
        if (errors.length !== 0) process.exit(1);
    };

    export const HTTP_PORT = Number.parseInt(process.env.HTTP_PORT ?? "4000", 10);
    export const LOGGER_LEVEL = process.env.LOGGER_LEVEL ?? "info";
    export const MONGO_DB_CONN_STRING = requiredEnv("MONGO_DB_CONN_STRING") ?? "";
    export const MONGO_DB_NAME = requiredEnv("MONGO_DB_NAME") ?? "";
}
