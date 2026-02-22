import { roleMenu } from "@prisma/client";
import { db } from "../util/config/db";
import logger from "../util/logger";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class PermissionService {
    constructor() { }

    async getMenuByRoleId(roleId: number) {
        // Implementation to get menu by role ID
        if (!roleId) {
            throw new Error('Missing role Id');
        }
        try {
            const menus = await this.getMenuChildByRoleId(roleId);
            const parentmenus = await db.menus.findMany({
                where: {
                    parent: 0
                }
            })

            // Combine and filter duplicates by ID
            const combined = [...menus, ...parentmenus];
            const uniqueMenus = Array.from(new Map(combined.map(item => [item.id, item])).values());

            return uniqueMenus;
        } catch (err) {
            logger.error('Error fetching menus by role ID:', err);
            if (err instanceof PrismaClientKnownRequestError) {
                throw new Error('Database error occurred while fetching menus');
            }
            throw new Error('An unexpected error occurred');
        }
    }

    async getMenuChildByRoleId(roleId: number) {
        try {

            const roleMenus = await db.roleMenu.findMany({
                where: {
                    roleId: roleId,
                },
                include: {
                    menus: true
                }
            });
            const menus = roleMenus.map(rm => rm.menus);

            return menus
        } catch (err) {
            logger.error('Error fetching menus by role ID:', err);
            if (err instanceof PrismaClientKnownRequestError) {
                throw new Error('Database error occurred while fetching menus');
            }
            throw new Error('An unexpected error occurred');
        }

    }

    async assignMenuToRole(roleId: number, createdBy: string, menuIds: number[]) {
        if (!roleId || !menuIds || menuIds.length === 0) {
            throw new Error('Missing role Id or menu Ids');
        }
        try {
            const assignments: Omit<roleMenu, 'id'>[] = menuIds.map(menuId => ({
                roleId: roleId,
                menuId: menuId,
                createdBy: createdBy,
                updatedBy: '',
                createdAt: new Date(),
                updatedAt: new Date(),

            }));
            await db.roleMenu.deleteMany({
                where: {
                    roleId: roleId
                }
            })
            const result = await db.roleMenu.createMany({
                data: assignments,
                skipDuplicates: true,
            });
            return result;
        } catch (err) {
            logger.error('Error assigning menus to role:', err);
            if (err instanceof PrismaClientKnownRequestError) {
                throw new Error('Database error occurred while assigning menus to role');
            }
            throw new Error('An unexpected error occurred');
        }
    }


}