import { roleMenu } from "@prisma/client";
import { db } from "../util/config/db";
import logger from "../util/logger";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class PermissionService {
    constructor() { }

    async getMenuByRoleId(roleId: number) {
        if (!roleId) {
            throw new Error('Missing role Id');
        }
        try {
            // Get menus specifically assigned to this role
            const assignedMenus = await this.getMenuChildByRoleId(roleId);

            // Collect all assigned menus and their parents to build a complete path
            const menuMap = new Map<number, any>();

            for (const menu of assignedMenus) {
                if (!menu) continue;
                menuMap.set(menu.id, menu);

                // Recursively fetch parents if they aren't in the map yet
                let currentParentId = menu.parent;
                while (currentParentId !== 0 && currentParentId !== null) {
                    if (currentParentId === undefined) break;
                    if (menuMap.has(currentParentId)) break;

                    const parent = await db.menus.findUnique({
                        where: { id: currentParentId as number }
                    });

                    if (parent) {
                        menuMap.set(parent.id, parent);
                        currentParentId = parent.parent;
                    } else {
                        break;
                    }
                }
            }

            return Array.from(menuMap.values());
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