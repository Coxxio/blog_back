import * as express from "express";
import * as passport from "passport";
import { UserController } from "../controllers/UserController";
import { ROLES } from "../utils/ROLES.enum";
import { checkIsInRole } from "../utils/utils"

class UserRoutes {
  public path = "/user";
  public router: express.Router = express.Router();

  constructor(public readonly UserController: UserController) {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    // UserController middleware
    this.router.use(this.validateInput);

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

  public validateInput(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const params = { id: req.url.split("/")[2] };
    switch (req.method) {
      case "GET":
        break;
      case "DELETE":
        if (!params.id) {
          return res.status(400).send({ message: "Id is required" });
        }
        break;
      case "POST":
        if (Object.keys(req.body).length === 0) {
          return res
            .status(400)
            .send({ message: "Request body can't be empty" });
        }
        break;
      case "PUT":
        if (!params.id) {
          return res.status(400).send({ message: "Id is required" });
        }
        if (Object.keys(req.body).length === 0) {
          return res
            .status(400)
            .send({ message: "Request body can't be empty" });
        }
        break;
    }
    next();
  }
}

export default UserRoutes;
