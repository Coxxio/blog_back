import * as express from "express";
import { PostEntity } from "../entities/PostEntity";
import { UserEntity } from "../entities/UserEntity";
import { ROLES } from "../utils/ROLES.enum";

export class PostController {
  public async getAllPost(req: express.Request, res: express.Response) {
    const posts = await PostEntity.find();
    return res.send(posts);
  }

  public async getOnePost(req: express.Request, res: express.Response) {
    const post = await PostEntity.findOneBy({ id: req.params.id });
    if (!post) {
      return res.status(404).send("Post not found");
    }
    return res.status(200).json(post);
  }

  public async createPost(req: express.Request, res: express.Response) {
    const postDada = req.body;
    const user: any = req.user;
    const newPost = new PostEntity();
    newPost.title = postDada.title;
    newPost.resume = postDada.resume;
    newPost.content = postDada.content;
    newPost.author = user.id;
    await newPost.save();
    return res.status(200).send("Post created successfully");
  }

  public async updatePost(req: express.Request, res: express.Response) {
    const updatePost = req.body;
    const user: any = req.user;
    const userIsAdmin = await UserEntity.findOneBy({ id: user.id });
    const post = await PostEntity.findOneBy({ id: req.params.id });
    if (!userIsAdmin) {
      return res.status(404).send("User not fount");
    } else if (
      userIsAdmin.role != ROLES.ADMIN ||
      userIsAdmin.id != post.author.id
    ) {
      return res.status(401).send("Unauthorized");
    }
    updatePost.author = user.id;
    PostEntity.merge(post, updatePost);
    await PostEntity.save(post);
    return res.status(200).send({ message: "Post updated correctly" });
  }

  public async deletePost(req: express.Request, res: express.Response) {
    const user: any = req.user;
    const userIsAdmin = await UserEntity.findOneBy({ id: user.id });
    const post = await PostEntity.findOneBy({ id: req.params.id });
    if (!userIsAdmin) {
      return res.status(404).send("User not fount");
    } else if (
      userIsAdmin.role != ROLES.ADMIN ||
      userIsAdmin.id != post.author.id
    ) {
      return res.status(401).send("Unauthorized");
    }
    await PostEntity.delete(req.params.id)
      .then((response) => {
        if (response.affected == 0) {
          return res.status(404).send({ message: "Post not found" });
        } else {
          return res.status(200).send({ message: "Post deleted successfully" });
        }
      })
      .catch((err) => {
        return res.status(500).send({ message: err.message });
      });
  }
}
