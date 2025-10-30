import { Request, Response } from "express";
import { RoleService } from "../services/role.service";
import logger from "../util/logger";

export class RoleController {
    private roleService: RoleService;
    constructor(roleService?: RoleService) {
        this.roleService = roleService || new RoleService();
    }

    async getAllRoles(req: Request, res: Response) {
        try {
            const { filter } = req.query;
            const roles = await this.roleService.getAllRoles(filter as string || '');
            res.status(200).json({ message: 'fetched successful', data: roles });
        } catch (error) {
            logger.error(error);
            res.status(500).json({ message: "Something went wrong. Please try again" });
        }
    }

    async createRole(req: Request, res: Response) {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const newRole = await this.roleService.createRole(req.body, userId);
            res.status(201).json({ message: 'role created successfully', data: newRole });
        } catch (error) {
            logger.error(error);
            res.status(400).json({ message: (error as Error).message });
        }
    }

    async editRole(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const parsedId = parseInt(id, 10);
            if (isNaN(parsedId)) {
                return res.status(400).json({ message: "Invalid role ID" });
            }

            const userId = req.user?.userId;
            if (!userId) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const updatedRole = await this.roleService.editRole(parsedId, req.body, userId);
            res.status(200).json({ message: 'role updated successfully', data: updatedRole });
        } catch (error) {
            logger.error(error);
            res.status(400).json({ message: (error as Error).message });
        }
    }

    async deleteRole(req: Request, res: Response) {
        logger.info('Delete role request received', req.params.id);
        try {
            const { id } = req.params;
            const parsedId = parseInt(id, 10);
            if (isNaN(parsedId)) {
                return res.status(400).json({ message: "Invalid role ID" });
            }
            const deletedRole = await this.roleService.deleteRole(parsedId);
            res.status(200).json({ message: 'Role deleted successfully', data: deletedRole });
        } catch (error) {
            logger.error(error);
            res.status(400).json({ message: (error as Error).message });
        }
    }
}

