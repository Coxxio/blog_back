import * as express from "express";
import * as cors from "cors";
import { Conection } from "./conection";
import "reflect-metadata";
import passport = require("passport");
import JWTStrategy from "./middleware/passport-jwt";

class App {
  public app: express.Application;
  public port: number;

  // The constructor receives an array with instances of the controllers for the application and an integer to designate the port number.
  constructor(controllers: any[], port: number) {
    this.app = express();
    this.port = port;
    this.initializeModels();
    this.initializeMiddlewares();
    this.initializeCors();
    this.initializeControllers(controllers);
  }

  private async initializeModels() {
    await Conection.initialize()
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  }

  // Here we can add all the global middlewares for our application. (Those that will work across every contoller)
  private initializeMiddlewares() {
    this.app.use(express.json());
    passport.use(JWTStrategy);
  }

  private initializeControllers(controllers: any[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  private initializeCors() {
    this.app.use(
      cors({
        origin: "http://localhost:3000",
      })
    );
  }

  // Boots the application
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

export default App;
