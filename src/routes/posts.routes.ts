import * as express from "express";
import * as passport from "passport";
import { PostController } from "../controllers/PostContoller";
import { ROLES } from "../utils/ROLES.enum";
import { checkIsInRole } from "../utils/utils";
import { validateInput } from "./validate.routes";

export class PostRoutes {
  public path = "/post";
  public router: express.Router = express.Router();

  constructor(public readonly PostController: PostController) {
    this.initializeRoutes();
  }
  public initializeRoutes() {
    this.router.use(validateInput);

    this.router.get(
      this.path,
      passport.authenticate("jwt", { session: false }),
      this.PostController.getAllPost
    );
    
    this.router.get(
      this.path + "/:id",
      passport.authenticate("jwt", { session: false }),
      this.PostController.getOnePost
    );

    this.router.post(
      this.path,
      passport.authenticate("jwt", { session: false }),
      checkIsInRole(ROLES.ADMIN),
      this.PostController.createPost
    );


    this.router.put(
      this.path + "/:id",
      passport.authenticate("jwt", { session: false }),
      checkIsInRole(ROLES.ADMIN),
      this.PostController.updatePost
    );

    this.router.delete(
      this.path + "/:id",
      passport.authenticate("jwt", {session: false}),
      checkIsInRole(ROLES.ADMIN),
      this.PostController.deletePost
    )
  }
}
