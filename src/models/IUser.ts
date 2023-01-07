import { ROLES } from "../utils/ROLES.enum";

export interface IUser {
    email: string;
    password: string;
    role: ROLES;
}