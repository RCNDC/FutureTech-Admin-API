import logger from "../util/logger";
import { mailTransporter } from "../util/mail";
export class MailService{
    constructor(){}

    async sendMail(to: string, subject?:string, body?:string):Promise<void>{
        logger.info('Sending email to ' + to);
        if(!to){
            logger.error('Email Address Required');
            throw new Error('Email address is required');
        }
        try{
            await mailTransporter.sendMail({
                from: process.env.MAIL_USER,
                to,
                subject: subject || 'No Subject',
                text: body || 'No Content',
            });
        }catch(err){
            logger.error('Error sending email: ' + (err as Error).message);
            throw new Error('Error sending email: ' + (err as Error).message)    
        }

    }
}