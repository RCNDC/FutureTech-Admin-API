import { Request, Response } from "express";
import { addToMailQueue } from "../workers/mail.worker";
import { MessageService } from "../services/message.service";
import { Invitation } from "../mail/templates/invitation";
import defaultTemplate from "../mail/templates/defaulttemplate";

export class MailController{
    private messageService;
    constructor(){
        this.messageService = new MessageService();
    }

    async sendMail(req:Request, res:Response){
        const emails = req.body;
        try{
            if(!emails.data || !Array.isArray(emails.data) || emails.data.length === 0){
                res.status(400).json({message: 'malformed data or missing values'});
                return;
            }
            for(const email of emails.data){
                this.messageService.sendMessage({attachedTo: parseInt(email.attachedTo), body: email.body, title: email.title, reciver: email.reciver, sender: req.user?.email?req.user.email:'system@futuretech.com', sentAt: new Date(), sentBy: req.user?.userId?req.user?.userId:'0', status: 'Pending'});
                addToMailQueue({to: email.reciver, subject: email.title, body: email.body, html: defaultTemplate(email.body)});
            }
            //send email logic here
            res.status(200).json({message: 'emails sent successfully'});
        }catch(error){
            res.status(500).json({message: 'internal server error'});
        }
    }
}