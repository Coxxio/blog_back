import * as express from "express";
import { PostEntity } from "../entities/PostEntity";
import { UserEntity } from "../entities/UserEntity";
import { CATEGORY } from "../utils/enums/CATEGORY.enum";
import { ROLES } from "../utils/enums/ROLES.enum";

export class PostController {
  public async getAllPost(req: express.Request, res: express.Response) {
    const category_find = Object.values(CATEGORY);
    const pagination = {
      limit: 0,
      page: null,
    };
    const category = category_find.find(
      (category) => req.query.category === category
    );
    console.log(req.query);

    if (req.query !== undefined) {
      pagination.limit = Number(req.query.limit);
      pagination.page = (Number(req.query.page) - 1) * 5;
    }

    if (category !== undefined) {
      const total = await PostEntity.createQueryBuilder()
        .where("category = :category", { category: category })
        .getCount();
      const posts = await PostEntity.createQueryBuilder()
        .where("category = :category", { category: category })
        .limit(pagination.limit)
        .offset(pagination.page)
        .orderBy("pub_date", "DESC")
        .getMany();
      const response = { posts, total };
      return res.send(response);
    } else if (pagination.page !== null) {
      const total = await PostEntity.createQueryBuilder().getCount();
      const posts = await PostEntity.createQueryBuilder()
        .limit(pagination.limit)
        .offset(pagination.page)
        .orderBy("pub_date", "DESC")
        .getMany();
      const response = { posts, total };
      return res.send(response);
    } else {
      const posts = await PostEntity.find({ order: { pub_date: "DESC" } });
      return res.send(posts);
    }
  }

  // public async tucupita(req: express.Request, res: express.Response) {
  //   const respo = Conection.getRepository(PostEntity);

  //   // const query: PaginateQuery = {
  //   //   page: Number(req.query.page),
  //   //   limit: Number(req.query.limit),
  //   //   path: "Pimga"
  //   // };

  //   console.log(query)

  //   return paginate(query, respo, {
  //     sortableColumns: ["id"],
  //     defaultSortBy: [["id", "DESC"]],
  //   });
  // }

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
    newPost.category = postDada.category;
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
