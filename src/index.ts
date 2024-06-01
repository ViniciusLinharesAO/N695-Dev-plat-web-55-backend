import { Env } from "./config/env";
import { gracefulShutdown } from "./lib/graceful-shutdown";
import { Server } from "./app";

Env.checkRequiredEnvs();

async function main() {
    const app = Server.init();
    const server = app.listen(Env.HTTP_PORT, () => console.log(`Server is running on port: ${Env.HTTP_PORT}`));

    gracefulShutdown(server);
}

main().catch(console.error);
