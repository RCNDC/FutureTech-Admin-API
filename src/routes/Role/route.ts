import { Request, Response, Router } from "express";
import { RoleController } from "../../controllers/role.controller";
import AuthAPIKey from "../../middlewares/authAPIKey";
import AuthGuard from "../../middlewares/authGuard";

const roleController = new RoleController();

const roleRoutes = Router();

roleRoutes.get('/getAllRoles', [AuthAPIKey, AuthGuard], (req: Request, res: Response) => roleController.getAllRoles(req, res));
roleRoutes.post('/createRole', [AuthAPIKey, AuthGuard], (req: Request, res: Response) => roleController.createRole(req, res));
roleRoutes.patch('/update/:id', [AuthAPIKey, AuthGuard], (req: Request, res: Response) => roleController.editRole(req, res));
roleRoutes.delete('/delete/:id', [AuthAPIKey, AuthGuard], (req: Request, res: Response) => roleController.deleteRole(req, res));

export default roleRoutes;

