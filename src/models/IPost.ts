import { UserEntity } from "../entities/UserEntity";
import { CATEGORY } from "../utils/enums/CATEGORY.enum";

export interface IPost {
  title: string;
  resume: string;
  content: string;
  pub_date: Date;
  category: CATEGORY;
  author: UserEntity;
}
