import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { MailService } from "../services/mail.service";

export class UserController{
    private userService;
    private mailService;
    constructor(){
        this.userService = new UserService();
        this.mailService = new MailService();
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
            this.mailService.sendMail(email,"Forgot password", "test email");
            response.status(200).json({message: 'Email sent successfully'});

        }catch(error){
            response.status(400).json({message:`${error}`})
        }
        
    }
}