import { Request, Response, Router } from "express";
import AuthAPIKey from "../../middlewares/authAPIKey";
import AuthGuard from "../../middlewares/authGuard";
import { PartnersController } from "../../controllers/partners.controller";


const partnerRoute = Router();
const partnerController = new PartnersController();

partnerRoute.get('/getallpartners', [AuthAPIKey, AuthGuard], (req:Request, res:Response)=>partnerController.getAllPartners(req, res));

export default partnerRoute;