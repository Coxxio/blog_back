import * as express from "express";
import * as passport from "passport";
import { UserController } from "../controllers/UserController";
import { ROLES } from "../utils/enums/ROLES.enum";
import { checkIsInRole } from "../utils/utils";
import { validateInput } from "./validate.routes";

class UserRoutes {
  public path = "/user";
  public router: express.Router = express.Router();

  constructor(public readonly UserController: UserController) {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.use(validateInput);

    // Controller endpoints
    this.router.post(
      this.path,
      passport.authenticate("jwt", { session: false }),
      checkIsInRole(ROLES.ADMIN),
      this.UserController.createUser
    );
    this.router.get(
      this.path,
      passport.authenticate("jwt", { session: false }),
      checkIsInRole(ROLES.ADMIN),
      this.UserController.getAllUsers
    );
    this.router.get(
      this.path + "/:id",
      passport.authenticate("jwt", { session: false }),
      checkIsInRole(ROLES.ADMIN),
      this.UserController.getUser
    );

    this.router.put(
      this.path + "/:id",
      passport.authenticate("jwt", { session: false }),
      checkIsInRole(ROLES.ADMIN),
      this.UserController.updateUser
    );

    this.router.delete(
      this.path + "/:id",
      passport.authenticate("jwt", { session: false }),
      checkIsInRole(ROLES.ADMIN),
      this.UserController.deleteUser
    );
  }
}

export default UserRoutes;
