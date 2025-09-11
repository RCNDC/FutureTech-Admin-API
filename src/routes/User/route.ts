import { Request, Response, Router } from "express";
import { UserController } from "../../controllers/user.controller";
import AuthAPIKey from "../../middlewares/authAPIKey";

const userController = new UserController();

const userRoutes = Router();

userRoutes.post('/forgot-password', AuthAPIKey, (req:Request, res:Response)=>userController.forgotPassword(req, res));
userRoutes.post('/reset-password', AuthAPIKey, (req:Request, res:Response)=>userController.verifyResetToken(req, res));

export default userRoutes;