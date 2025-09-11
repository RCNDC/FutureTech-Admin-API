import forgotEmailTemplate from "../mail/templates/forgotpassword";
import { User } from "../types/user";
import { db } from "../util/db";
import { generateId } from "../util/generateId";
import logger from "../util/logger";
import { JwtService } from "./jwt.service";
import { MailService } from "./mail.service";

export class UserService{
    private mailService;
    private jwtService;
    constructor(){
        this.mailService = new MailService()
        this.jwtService = new JwtService()
    }

    async getUserById(userId:string): Promise<User>{
        if(!userId){
            throw new Error("User id missing");
        }
        const user = await db.dashboard_user.findUnique({
            where:{
                id: userId
            },
            select:{
                email: true,
                createdAt: true,
                updatedAt: true,
                isLocked: true
            }
        });
        if(!user){
            throw new Error("user not found");
        }
        return user;
    }

    async getUserByEmail(email:string){
        if(!email){
            throw new Error("Email required");
        }
        const user = await db.dashboard_user.findUnique({
            where:{
                email: email
            }
        });
        if(!user){
            throw new Error("User not found");
        }
        if(user.isLocked){
            throw new Error("User is locked");
        }

        return user;


    }
    async sendResetEmail(email:string){
        try{
            const resetToken = this.jwtService.sign({userId: await generateId(), email}, 86400)
            const htmlContent = forgotEmailTemplate(email,`${process.env.FRONTEND_URL}/reset-password/${resetToken}`);
            await this.mailService.sendMail(email,"Forgot password", '',htmlContent);
            return 'success';
        }catch(error){
            return error;
        }
    }
    async verifyResetToken(token:string){
        if(!token){
            logger.error('token missing in verify reset');
            throw new Error('Token missing');
        }
        try{
            const verify =  this.jwtService.verify(token);
            return 'success';
         

        }catch(error){
            logger.error(error);
            return 'error';
        }
    }
}