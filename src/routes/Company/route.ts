import { Router } from "express";
import { CompanyController } from "../../controllers/company.controller";
import { upload } from "../../util/config/multer";
import AuthAPIKey from "../../middlewares/authAPIKey";

const companyRoute = Router();
const companyController = new CompanyController();

companyRoute.post('/create', [AuthAPIKey, upload.single('uploadLicense')], (req: any, res: any) => companyController.create(req, res));
companyRoute.get('/list', AuthAPIKey, (req: any, res: any) => companyController.getByType(req, res));
companyRoute.get('/:id', AuthAPIKey, (req: any, res: any) => companyController.getById(req, res));

export default companyRoute;
