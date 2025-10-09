import type{ Address, Attachment } from "nodemailer/lib/mailer";
import logger from "../util/logger";
import { mailTransporter } from "../util/mail";
import { SentMessageInfo } from "nodemailer";
export class MailService{
    constructor(){}

    async sendMail(to: string, subject?:string, body?:string, htmlContent?:any, attachments?:Attachment[]):Promise<SentMessageInfo>{
        logger.info('Sending email to ' + to);
        if(!to){
            logger.error('Email Address Required');
            throw new Error('Email address is required');
        }
        try{
           const sent = await mailTransporter.sendMail({
                from: process.env.MAIL_USER,
                to,
                subject: subject || 'No Subject',
                text: body || 'No Content',
                html: htmlContent,
                attachments: attachments || [] as Attachment[],
                
            });
            return sent;
        }catch(err){
            logger.error('Error sending email: ' + (err as Error).message);
            throw new Error('Error sending email: ' + (err as Error).message)    
        }

    }
}