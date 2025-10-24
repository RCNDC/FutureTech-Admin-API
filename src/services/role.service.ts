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
        const roles = await db.role.findMany({
            where: {
                name: {
                    contains: filter
                }
            }
        });
        return roles;
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
        const newRole = await db.role.create({
            data: {
                name: role.name,
                createdBy: userId,
            }
        });
        return newRole;
    }

    async isRoleAssigned(roleId: number): Promise<boolean> {
        const users = await db.dashboard_user.findMany({
            where: {
                roleId: roleId
            }
        });
        return users.length > 0;
    }

    async deleteRole(roleId: number): Promise<Role> {
        logger.info('Deleting role with id', roleId);
        if (!roleId) {
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
        if (!roleId) {
            throw new Error("Role id is missing")
        }

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

        try {
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
        } catch (e) {
            logger.error(e);
            throw new Error("Something went wrong. Please try again");
        }
    }
  }
