import { Router } from "express";
import { UserController } from "./api/users/users.controller";
import { AuthController } from "./api/auth/auth.controller";

const authRouter = Router() //
    .post("/register", AuthController.register) //
    .post("/login", AuthController.login);

const visualizationRouter = Router() //
    .get("/users", UserController.listAllUsers)
    .patch("/:id", UserController.updateUser) //
    .delete("/:id", UserController.deleteUser);

const v1Routes = Router().use("/user", visualizationRouter).use("/auth", authRouter);

export default Router().use("/v1", v1Routes);
