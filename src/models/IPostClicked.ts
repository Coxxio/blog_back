import { PostEntity } from "../entities/PostEntity";

export interface IPostClicked {
    post_title: string;
    post_category: string;
    date: Date;
}
