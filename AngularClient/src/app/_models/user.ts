import { Role } from "./role";

export interface User {
    id?:number;
    firstName?: string;
    lastName?: string;
    userName: string;
    email?: string;
    role: Role;
    token?: string;
    profilePicture?:string
}
