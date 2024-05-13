const env = process.env;
export const requiredEnvs: string[] = [];

const requiredEnv = (envName: string) => {
    requiredEnvs.push(envName);
    return env[envName]!;
};

export const checkRequiredEnvs = () =>
    requiredEnvs.reduce<Error[]>((result, env) => {
        const errors = [...result];
        if (!(env in process.env)) errors.push(new Error(`Missing required env: ${env}`));

        return errors;
    }, []);

export const NODE_ENV = env.NODE_ENV || "development";
export const LOGGER_LEVEL = env.LOGGER_LEVEL || "info";
export const MONGO_DB_CONN_STRING = requiredEnv("MONGO_DB_CONN_STRING");
export const MONGO_DB_NAME = requiredEnv("MONGO_DB_NAME");
