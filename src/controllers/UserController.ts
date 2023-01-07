import * as express from "express";
import { UserEntity } from "../entities/UserEntity";

export class UserController {

  public async createUser(req: express.Request, res: express.Response) {
    const userData = req.body;
    const emailExist = await UserEntity.findOneBy({ email: userData.email });
    if (emailExist != null) {
      return res.status(400).send({ message: "Email already registered" });
    }
    if (userData.password.length < 8) {
      return res.status(400).send({ message: "Password to short" });
    }
    const user = new UserEntity();
    user.email = userData.email;
    user.password = userData.password; // This should be encrypted!
    user.save();
    return res.status(200).send("User created successfully");
  }

  public async getAllUsers(req: express.Request, res: express.Response) {
    const users = await UserEntity.find();
    return res.send(users);
  }

  public async getUser(req: express.Request, res: express.Response) {
    const client = await UserEntity.findOneBy({ id: req.params.id });
    return res.send(client);
  }

  public async updateUser(req: express.Request, res: express.Response) {
    const updateUser = req.body;
    const user = await UserEntity.findOneBy({ id: req.params.id });
    const emailExist = await UserEntity.findOneBy({email: updateUser.email})
    if (user !== null) {
      UserEntity.merge(user, updateUser);
      await UserEntity.save(user);
      return res.status(200).send({ message: "User updated correctly" });
    }

    return res.status(404).send({ message: "User not found" });
  }

  public async deleteUser(req: express.Request, res: express.Response) {
    await UserEntity.delete(req.params.id).then((response) => {
        if (response.affected == 0){
            return res.status(404).send({ message: "User not found" });
        } else {
            return res.status(200).send({ message: "User deleted successfully" });
        }
    }).catch((err) => {
        return res.status(500).send({ message: err.message });
    });

  }
}
