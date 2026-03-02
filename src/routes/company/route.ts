import { Router } from "express";
import { CompanyController } from "../../controllers/company.controller";
import { upload } from "../../util/config/multer";
import AuthAPIKey from "../../middlewares/authAPIKey";
import AuthGuard from "../../middlewares/authGuard";

const companyRoute = Router();
const companyController = new CompanyController();

companyRoute.post('/create', [AuthAPIKey, AuthGuard, upload.single('uploadLicense')], (req: any, res: any) => companyController.create(req, res));
companyRoute.get('/list', [AuthAPIKey, AuthGuard], (req: any, res: any) => companyController.getByType(req, res));
companyRoute.get('/:id', [AuthAPIKey, AuthGuard], (req: any, res: any) => companyController.getById(req, res));

export default companyRoute;
