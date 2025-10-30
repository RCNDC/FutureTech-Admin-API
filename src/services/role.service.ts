import { db } from "../util/config/db";
import { generateId } from "../util/generateId";
import logger from "../util/logger";

export interface Role {
    id?: number;
    name: string;
    createdBy?: string | null;
    createdDate?: Date;
    updatedBy?: string | null;
    updatedAt?: Date;
}

export class RoleService {

    async getAllRoles(filter: string): Promise<Role[]> {
        try {
            const roles = await db.role.findMany({
                where: {
                    name: {
                        contains: filter
                    }
                }
            });
            return roles;
        } catch (e) {
            logger.error(e);
            throw new Error("Something went wrong. Please try again");
        }
    }

    async createRole(role: Role, userId: string): Promise<Role> {
        const roleExists = await db.role.findUnique({
            where: {
                name: role.name
            }
        });
        if (roleExists) {
            throw new Error("Role already exists");
        }
        try {
            const newRole = await db.role.create({
                data: {
                    name: role.name,
                    createdBy: userId,
                }
            });
            return newRole;
        } catch (e) {
            logger.error(e);
            throw new Error("Something went wrong. Please try again");
        }
    }

    async isRoleAssigned(roleId: number): Promise<boolean> {
        try {
            const users = await db.dashboard_user.findMany({
                where: {
                    roleId: roleId
                }
            });
            return users.length > 0;
        } catch (e) {
            logger.error(e);
            throw new Error("Something went wrong. Please try again");
        }
    }

    async deleteRole(roleId: number): Promise<Role> {
        if (roleId == null) {
            throw new Error("Role id is missing");
        }

        if (await this.isRoleAssigned(roleId)) {
            throw new Error("Role is already assigned");
        }

        try {
            const deletedRole = await db.role.delete({
                where: {
                    id: roleId
                }
            });
            logger.info('Role deleted successfully', deletedRole);
            return deletedRole;
        } catch (e) {
            logger.error(e);
            throw new Error("Something went wrong. Please try again");
        }
    }

    async editRole(roleId: number, data: Role, userId: string): Promise<Role> {
        logger.info('Editing role with id', roleId);
        if (roleId == null) {
            throw new Error("Role id is missing")
        }

        try {
            const roleExists = await db.role.findFirst({
                where: {
                    name: data.name,
                    id: {
                        not: roleId
                    }
                }
            });

            if (roleExists) {
                throw new Error("Role already exists");
            }

            const updatedRole = await db.role.update({
                where: {
                    id: roleId
                },
                data: {
                    name: data.name,
                    updatedBy: userId,
                    updatedAt: new Date()
                }
            });
            logger.info('Role edited successfully', updatedRole);
            return updatedRole;
        } catch (e: any) {
            logger.error(e);
            if (e.message === "Role already exists") {
                throw e;
            }
            throw new Error("Something went wrong. Please try again");
        }
    }
  }
