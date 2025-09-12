import { Request, response, Response } from "express";
import { UserService } from "../services/user.service";
import { MailService } from "../services/mail.service";
import logger from "../util/logger";

export class UserController{
    private userService;
    constructor(){
        this.userService = new UserService();
    }

    async forgotPassword(req:Request, response:Response){
        const { email } = req.body;
        try{
            if(!email){
                response.status(400).json({message: 'Email required'});
                return;
            }
            const userExists = await this.userService.getUserByEmail(email);
            if(!userExists){
                response.status(404).json({message: "Email doesn't exist"});
                return;
            }
            this.userService.sendResetEmail(userExists.email);
            response.status(200).json({message: 'Email sent successfully'});

        }catch(error){
            response.status(400).json({message:`${error}`})
        }
        
    }
    async verifyResetToken(req:Request, response:Response){
        const {token} = req.params;
    
        if(!token){
            response.status(400).json({message:'missing token'});
            return;
        }
        const verify = await this.userService.verifyResetToken(token);
        if(verify === 'success'){
           
            response.status(200).json({message: 'success'});
            return;
        }
        logger.error('something went wrong verifing token');
        response.status(400).json({message: 'something went wrong!'})
    }
    async resetPassword(req:Request, res:Response){
        const {token} = req.params;
        const {password} = req.body;
        if(!token){
            response.status(401).json({message: 'unauthorized'});
            return;
        }
        const verify = await this.userService.verifyResetToken(token);
        if(!verify)
        {
            response.status(401).json({message: 'unathorized'});
            return;
        }
        const payload = await this.userService.tokenPayload(token);
        if(payload){
            response.status(401).json({message: 'unauthorized'});
        }
        try{
            const result = this.userService.updatePasswordByEmail(payload?.email || '', password);
            response.status(200).json({message: 'password updated'});
        }catch(error){
            logger.error(error);
            response.status(500).json({message: 'something went wrong'});
        }
    }

}