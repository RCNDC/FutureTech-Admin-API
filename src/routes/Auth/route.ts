import { Request, Response, Router } from "express";
import { AuthenticationController } from "../../controllers/authentication.controller";
import AuthAPIKey from "../../middlewares/authAPIKey";
import { SignupDto } from "../../types/signupdto";

const authController = new AuthenticationController();

const authRoutes = Router();

authRoutes.post('/signup', AuthAPIKey, (req:Request<SignupDto>, res:Response)=>authController.signUp(req, res));

export default authRoutes;
