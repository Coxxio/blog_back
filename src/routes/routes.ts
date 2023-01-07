import UserRoutes from "./users.routes";
import AuthController from "../controllers/AuthController";
import { UserController } from "../controllers/UserController";
export const routes = [new UserRoutes(new UserController), new AuthController()];