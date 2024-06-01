import { Router } from "express";
import { UserController } from "./users/users.controller";
import { AuthController } from "./auth/auth.controller";
import { auth } from "./common/auth";

const authRouter = Router() //
    .post("/register", AuthController.register) //
    .post("/login", AuthController.login);

const visualizationRouter = Router()
    .use(auth) //
    .get("/", UserController.listAllUsers)
    .patch("/:id", UserController.updateUser) //
    .delete("/:id", UserController.deleteUser);

const v1Routes = Router().use("/users", visualizationRouter).use("/auth", authRouter);

export default Router().use("/v1", v1Routes);
