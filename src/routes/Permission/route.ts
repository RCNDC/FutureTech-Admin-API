import { Request, Response, Router } from "express";

import { PermissionController } from "../../controllers/permission.controller";
import AuthAPIKey from "../../middlewares/authAPIKey";
import AuthGuard from "../../middlewares/authGuard";

const permissionRoutes = Router();
const permissionController = new PermissionController();


permissionRoutes.post('/assignmenustorole', [AuthAPIKey, AuthGuard], (req:Request, res:Response) => permissionController.createRoleMenuAssignment(req, res));
permissionRoutes.get('/getmenutreebyrole/:roleId', [AuthAPIKey, AuthGuard], (req:Request, res:Response)=>permissionController.getMenusByRoleId(req, res));
permissionRoutes.get('/getmenubyrole/:roleId', [AuthAPIKey, AuthGuard], (req:Request, res:Response)=>permissionController.getRoleMenu(req, res));

export default permissionRoutes;