import { Role } from "../services/role.service";

export type User = {
    email:string,
    password: string,
    isLocked: number,
    createdAt: Date,
    updatedAt: Date,
    isNew: number,
    Role?: Role | null,
    roleId?: number | null
}
