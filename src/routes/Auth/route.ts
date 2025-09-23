import { Request, Response, Router } from "express";
import { AuthenticationController } from "../../controllers/authentication.controller";
import AuthAPIKey from "../../middlewares/authAPIKey";
import { SignupDto } from "../../types/signupdto";
import { LoginDto } from "../../types/logindto";


const authController = new AuthenticationController();


const authRoutes = Router();


authRoutes.post('/signup', AuthAPIKey, (req:Request<SignupDto>, res:Response)=>authController.signUp(req, res));
authRoutes.post('/login', AuthAPIKey, (req:Request<LoginDto>, res:Response)=>authController.logIn(req, res));
authRoutes.post('/refresh-token', AuthAPIKey, (req:Request, res:Response)=>authController.refreshToken(req, res));
authRoutes.post('/logout', AuthAPIKey, (req:Request, res:Response)=>authController.logOut(req, res));

export default authRoutes;
