import { Request, Response } from "express";
import { MenuService } from "../services/menu.service";

export class MenuController{
    private menuService;
    constructor(){
        this.menuService = new MenuService();
    }

    async addMenu(req:Request, res:Response){
        const data = req.body;
        if(!data){
            res.status(400).json({message: 'Bad Request'});
            return;
        } 
        try{
            const menuDto = {
                ...data,
                userId: req.user?.userId,
            }
            const newMenu = await this.menuService.addMenu(menuDto);
            res.status(201).json({data: newMenu, message: 'Menu created successful'});
            return
        }catch(err){
            res.status(500).json({message:err});
            return;
        }
    }
    async getMenu(req:Request, res:Response){
        try{
            const menu = await this.menuService.getMenus();
            
            res.status(200).json({data: menu, message: 'Menu Fetched Successful'});
            return;

        }catch(err){
            res.status(500).json({message: 'Something went wrong. Please try again!'});
        }
    }
    async getMenusStructure(req:Request, res:Response){
        try{
            const menuStructure = await this.menuService.getMenusStructure();
            res.status(200).json({data: menuStructure, message: 'Menu structure successful'});
            return;
        }catch(err){
            res.status(500).json({message: 'Something went wrong. Please try again'});
        }
    }
    async updateMenu(req:Request, res:Response){
        const menu = req.body;
        if(!menu){
            res.status(400).json({message: 'Bad request'});
            return;
        }
        try{
            const updatedMenu = this.menuService.updateMenu(menu);
            res.status(200).json({message: 'menu updated', data: updatedMenu})
            return;
        }catch(err){
            res.status(500).json({message:'unable to update menu'});
            return;
        }
    }

    async deleteMenu(req:Request, res:Response){
        const id = parseInt(req.params.id);
        if(!id){
            res.status(400).json({message: 'Bad request'});
            return;
        }
        try{
            this.menuService.deleteMenu(id);
            res.status(200).json({message: 'menu deleted'});
            return;
        }catch(err){
            res.status(500).json({message: 'unable to delete menu'});
            return
        }
    }
}