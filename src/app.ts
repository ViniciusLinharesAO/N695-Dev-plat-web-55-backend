import express, { Application, Express } from "express";
import { Server as HttpServer } from "http";
import cors from "cors";
import helmet from "helmet";
import routes from "./api/routes";

export type ServerType = { http: HttpServer; express: Express };

export namespace Server {
    export function init() {
        const app = express();
        app.use(helmet()).use(cors()).use(express.json()).use(routes);
        return app;
    }

    export function listen(app: Application, port: number, callback?: () => void) {
        return app.listen(port, callback);
    }
}
