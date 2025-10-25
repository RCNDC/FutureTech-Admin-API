import { menus } from "@prisma/client";
import { menuDTO } from "../types/menu";
import { db } from "../util/config/db";
import { generateId } from "../util/generateId";
import logger from "../util/logger";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class MenuService {
    constructor() { }

    async addMenu(menuDto: menuDTO) {
        if (!menuDto) {
            throw new Error('Missing values');
        }
        try {
            let submenu = '';

            const newMenu = await db.menus.create({
                data: {
                    menuName: menuDto.menuName,
                    route: menuDto.route,
                    parent: parseInt(menuDto.parent.toString()) || 0,
                    childmenus: '',
                    createdBy: menuDto.userId,
                    updatedBy: '',
                }
            });
            if (menuDto.parent) {
                const parentMenu = await db.menus.findFirst({
                    where: {
                        id: parseInt(menuDto.parent.toString())
                    }
                })
                if (parentMenu) {
                    submenu = parentMenu.childmenus || '';
                    submenu += ',' + newMenu.id
                    submenu = submenu.replace(',', '')
                    await db.menus.update({
                        where: {
                            id: parentMenu.id,
                        },
                        data: {
                            ...parentMenu,
                            childmenus: submenu
                        }
                    })
                }

            }
            return newMenu;
        } catch (err) {
            logger.error(err + '');
            throw new Error("Unable to create menu");
        }
    }

    async getMenus() {
        try {
            const menus = await db.menus.findMany();
            return menus;
        } catch (err) {
            throw new Error('Something went wrong. Please try again');
        }
    }

    async getMenusStructure() {
        try {
            const nestMenuData = (flatArray:any[], parentId:number = 0) => {
                const menuTree = [];
                
                // 1. Find all items that belong to the current parentId level
                const children = flatArray
                    .filter(item => item.parent === parentId)
                     // Sort them by the 'order' field
                
                // 2. Recursively process each child
                for (const item of children) {
                    // Clone the item to avoid modifying the original flat array objects
                    const nestedItem = { ...item };

                    // Find and assign the children for this current item
                    nestedItem.children = nestMenuData(flatArray, item.id);

                    menuTree.push(nestedItem);
                }

                return menuTree;
            };

            const allmenus = await db.menus.findMany();
            const menuStructure = nestMenuData(allmenus, 0)
            
            return menuStructure


        } catch (err) {
            logger.error(err + '');
            throw new Error('Something went wrong. Please try again!');
        }
    }

    async updateMenu(menu:Partial<menus>){
        if(!menu){
            throw new Error('missing values');
        }
        try{
            const selectedMenu = await db.menus.findFirst({
                where:{
                    id: menu.id,
                }
            });
            if(!selectedMenu){
                throw new Error('Menu not found');
            }
            const updatedMenu = await db.menus.update({
                where:{
                    id: menu.id
                },
                data:{
                    ...menu,
                    parent: parseInt(menu.parent?.toString() || '')
                }
            });
            return updatedMenu
        }catch(err){
            logger.error(err+'')
            if(err instanceof PrismaClientKnownRequestError){
                throw new Error('Something went wrong please try again');
            }
            throw err;
        }
    }

    async deleteMenu(menuId:number){
        if(!menuId){
            throw new Error('missing value');
        }
        try{
            const hasChild = await db.menus.findMany({
                where:{
                    parent: menuId
                }
            });
            if(hasChild){

                await db.menus.deleteMany({
                    where:{
                        id:{
                            in: hasChild.map((child)=>child.id)
                        }
                    }
                })
            }
            await db.menus.delete({
                where:{
                    id: menuId
                }
            });
        }catch(err){
            logger.error(err+'');

        }
    }

}