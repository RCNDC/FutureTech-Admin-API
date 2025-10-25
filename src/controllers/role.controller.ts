import { Request, Response } from "express";
import { RoleService } from "../services/role.service";
import logger from "../util/logger";

export class RoleController {
    private roleService;
    constructor() {
        this.roleService = new RoleService();
    }

    async getAllRoles(req: Request, res: Response) {
        const { query } = req.query;
        const filter = query as string;
        const roles = await this.roleService.getAllRoles(filter);
        res.status(200).json({ message: 'fetched successful', data: roles });
    }

    async createRole(req: Request, res: Response) {
        try {
            const newRole = await this.roleService.createRole(req.body, req.user?.userId as string);
            res.status(201).json({ message: 'role created successfully', data: newRole });
        } catch (error) {
            logger.error(error);
            res.status(400).json({ message: (error as Error).message });
        }
    }

    async editRole(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updatedRole = await this.roleService.editRole(parseInt(id), req.body, req.user?.userId as string);
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
            const deletedRole = await this.roleService.deleteRole(parseInt(id));
            res.status(200).json({ message: 'Role deleted successfully', data: deletedRole });
        } catch (error) {
            logger.error(error);
            res.status(400).json({ message: (error as Error).message });
        }
    }
}

