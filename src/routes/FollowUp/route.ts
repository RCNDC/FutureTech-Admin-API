import { Request, Response, Router } from "express";
import AuthAPIKey from "../../middlewares/authAPIKey";
import { FollowUpController } from "../../controllers/followup.controller";
import AuthGuard from "../../middlewares/authGuard";

const followRoute = Router();
const followController = new FollowUpController();

followRoute.post('/followup/create', [AuthAPIKey, AuthGuard], (req:Request, res:Response)=>followController.createFollowUp(req, res))
followRoute.get('/followup', [AuthAPIKey, AuthGuard], (req:Request, res:Response)=>followController.getFollowUpByEntryId(req, res))

export default followRoute;