import { Role } from "./role";

export interface User {
    id:number;
    firstName: string;
    lastName: string;
    userName: string;
    role: Role;
    token?: string;
}
