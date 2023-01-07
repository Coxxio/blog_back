import * as express from "express";
import * as jsonwebtoken from "jsonwebtoken";
import { compareSync } from "bcrypt";
import { UserEntity } from "../entities/UserEntity";
import { use } from "passport";

class AuthController {
  public path = "/admin";
  public router: express.Router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post(this.path + "/login", this.login);
  }

  public async login(req: express.Request, res: express.Response) {
    const loginData = req.body;
    const user = await UserEntity.findOneBy({
      email: loginData.email,
    });
    try {
      if (user && compareSync(loginData.password, user.password)) {
          // res.set(
          const jwt = jsonwebtoken.sign(
            { id: user.id, email: user.email },
            process.env.SECRET,
            { expiresIn: process.env.TOKEN_EXP }
          );
          // );
          res.status(200);
          return res.json({"jwt": jwt});
      } else {
        res.status(401);
        return res.json({"msg": "Wrong Credentials"});
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default AuthController;
