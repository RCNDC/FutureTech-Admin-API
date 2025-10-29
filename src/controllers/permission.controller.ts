import { Request, Response } from "express";
import { PermissionService } from "../services/permission.service";
import logger from "../util/logger";
import { MenuService } from "../services/menu.service";

export class PermissionController{
    private permissionService;
    private menuService;
    constructor(){
        this.permissionService = new PermissionService();
        this.menuService = new MenuService();
    }

    async createRoleMenuAssignment(req:Request, res:Response){
        console.log(req.body)
        const {roleId, menus} = req.body;
        if(!roleId || !menus || menus.length === 0){
            res.status(400).json({message: 'Bad Request: Missing roleId or menus'});
            return;
        }
        try{
            const permission = await this.permissionService.assignMenuToRole(roleId, req.user?.userId || '', menus);
            res.status(201).json({data: permission, message: 'Menus assigned to role successfully'});
        }catch(err){
            logger.error('Error in createRoleMenuAssignment:', err);
            res.status(500).json({message: 'Internal Server Error'});
            return;
        }
    }

    async getMenusByRoleId(req:Request, res:Response){
        const { roleId } = req.params;
        if(!roleId){
            res.status(400).json({message: 'Bad Request: Missing roleId'});
            return;
        }
        try{
            const menus = await this.permissionService.getMenuByRoleId(parseInt(roleId));
            const menuTree = this.menuService.nestMenuData(menus);
            console.log(menuTree)
            res.status(200).json({data: menuTree, message: 'Menus fetched successfully'});
        }catch(err){
            logger.error('Error in getMenusByRoleId:', err);
            res.status(500).json({message: 'Internal Server Error'});
            return;
        }
    }

    async getRoleMenu(req:Request, res:Response){
        const { roleId } = req.params;
        if(!roleId){
            res.status(400).json({message: 'Bad Request: Missing roleId'});
            return;
        }
        try{
            const menus = await this.permissionService.getMenuByRoleId(parseInt(roleId));
            console.log(menus)
            res.status(200).json({data: menus, message: 'Role menus fetched successfully'});
        }catch(err){
            logger.error('Error in getRoleMenu:', err);
            res.status(500).json({message: 'Internal Server Error'});
            return;
        }
    }

}