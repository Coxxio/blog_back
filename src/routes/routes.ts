import UserRoutes from "./users.routes";
import AuthController from "../controllers/AuthController";
import { PostRoutes } from "./posts.routes";
import { PostController } from "../controllers/PostContoller";
import { UserController } from "../controllers/UserController";
import { MetricsRoutes } from "./metricts.routes";
import { PostClickedController } from "../controllers/PostClickedController";

export const routes = [
  new UserRoutes(new UserController()),
  new PostRoutes(new PostController()),
  new MetricsRoutes(new PostClickedController()),
  new AuthController(),
];
