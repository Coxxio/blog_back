import { UserEntity } from "../entities/UserEntity";

export interface IPost {
  title: string;
  resume: string;
  content: string;
  pub_date: Date;
  author: UserEntity;
}
