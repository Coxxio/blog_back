import * as express from "express";
import { PostClickedEntity } from "../entities/PostClickedEntity";

export class PostClickedController {
  public async getCountCategories(req: express.Request, res: express.Response) {
    const categories = await PostClickedEntity.createQueryBuilder("metrics")
      .groupBy("metrics.post_category")
      .select("COUNT(post_category), metrics.post_category")
      .getRawMany();
    return res.status(200).send(categories);
  }

  public async getCountPost(req: express.Request, res: express.Response) {
    const categories = await PostClickedEntity.createQueryBuilder("metrics")
      .where("metrics.post_title IS NOT NULL")
      .groupBy("metrics.post_title")
      .select("COUNT((post_title)), metrics.post_title")
      .getRawMany();
    return res.status(200).send(categories);
  }

  public async getHoursPost(req: express.Request, res: express.Response) {
    const categories = await PostClickedEntity.createQueryBuilder("metrics")
      .select("DATE_TRUNC('hour',metrics.date), COUNT(*)")
      .groupBy("1")
      .orderBy("DATE_TRUNC('hour',metrics.date)")
      .getRawMany();
    return res.status(200).send(categories);
  }

  public async createPostClicked(req: express.Request, res: express.Response) {
    const postDada = req.body;
    const newPost = new PostClickedEntity();
    newPost.post_title = postDada.post_title;
    newPost.post_category = postDada.post_category;
    await newPost.save();
    return res.status(200).send("Data Saved");
  }
}
