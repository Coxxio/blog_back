import * as express from "express";
import { PostClickedController } from "../controllers/PostClickedController";

export class MetricsRoutes {
  public path = "/metrics";
  public router: express.Router = express.Router();

  constructor(public readonly PostClickedController: PostClickedController) {
    this.initializeRoutes();
  }
  public initializeRoutes() {
    this.router.get(this.path, this.PostClickedController.getCountCategories);
    this.router.get(
      this.path + "-most-popular",
      this.PostClickedController.getCountPost
    );
    this.router.get(
      this.path + "-most-rate-hour",
      this.PostClickedController.getHoursPost
    );
    this.router.post(
      this.path + "/post_clicked",
      this.PostClickedController.createPostClicked
    );
  }
}
