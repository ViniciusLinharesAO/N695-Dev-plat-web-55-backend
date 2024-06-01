import type { Server } from "http";

export const gracefulShutdown = (server: Server) => {
    const closeFn = (label: string) => {
        server.close(async (err) => {
            if (err) {
                console.error(`[${label}] - ${err?.name} - ${err?.message}`);
                process.exit(127);
            }
        });
    };

    process.on("SIGTERM", () => closeFn("SIGTERM"));
    process.on("SIGINT", () => closeFn("SIGINT"));
    process.on("uncaughtException", () => closeFn("uncaughtException"));
    process.on("unhandledRejection", () => closeFn("unhandledRejection"));
};
