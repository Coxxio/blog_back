import { PostEntity } from "../entities/PostEntity";
import { ROLES } from "../utils/enums/ROLES.enum";

export interface IUser {
    email: string;
    password: string;
    role: ROLES;
    post: PostEntity[];
}