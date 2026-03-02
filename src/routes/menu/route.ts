import { Request, Response, Router } from "express";
import { MenuController } from "../../controllers/menu.controller";
import AuthAPIKey from "../../middlewares/authAPIKey";
import AuthGuard from "../../middlewares/authGuard";

const menuRoute = Router();

const menuController = new MenuController();
menuRoute.post('/create', [AuthAPIKey, AuthGuard], (req:Request, res:Response)=>menuController.addMenu(req,res));
menuRoute.get('/getallmenus', [AuthAPIKey, AuthGuard], (req:Request, res:Response)=>menuController.getMenu(req, res));
menuRoute.get('/getmenustructure', [AuthAPIKey, AuthGuard], (req:Request, res:Response)=>menuController.getMenusStructure(req, res));
menuRoute.put('/update', [AuthAPIKey, AuthGuard], (req:Request, res:Response)=>menuController.updateMenu(req, res));
menuRoute.delete('/delete/:id', [AuthAPIKey, AuthGuard], (req: Request, res:Response)=>menuController.deleteMenu(req, res));
export default menuRoute;