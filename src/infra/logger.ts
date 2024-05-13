import pino from "pino";
import { LOGGER_LEVEL } from "./../config/env";
enum Environment {
    Development = "development",
    Production = "production",
    Test = "test"
}

enum LoggerLevel {
    Fatal = "fatal",
    Error = "error",
    Warn = "warn",
    Info = "info",
    Debug = "debug",
    Trace = "trace",
    Silent = "silent",
}

export type LoggerOptions = {
    name?: string;
    level?: LoggerLevel;
    environment?: Environment;
};

export const Logger = pino({
    name: "21-app",
    level: LOGGER_LEVEL as LoggerLevel,
});
