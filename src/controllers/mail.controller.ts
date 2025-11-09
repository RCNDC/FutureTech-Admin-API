import { Request, Response } from "express";
import { addToMailQueue, mailWorker } from "../workers/mail.worker";
import { MessageService } from "../services/message.service";
import { Invitation } from "../mail/templates/invitation";
//import defaultTemplate from "../mail/templates/defaulttemplate";
import logger from "../util/logger";

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
                const message = await this.messageService.sendMessage({attachedTo: parseInt(email.attachedTo), body: email.body, title: email.title, reciver: email.reciver, sender: req.user?.email?req.user.email:'attendees@futuretechaddis.com', sentAt: new Date(), sentBy: req.user?.userId?req.user?.userId:'0', status: 'Pending'});
                if(message){
                    addToMailQueue({to: email.reciver, subject: email.title, body: email.body, id: message.id});
                    mailWorker.on('completed', (job, result)=>{
                        if(result && Array.isArray(result.rejected) && result.rejected.length === 0){
                            this.messageService.updateMessageStatus(job.data.id, 'Completed');

                        }else{
                            this.messageService.updateMessageStatus(job.data.id, 'Failed');
                        }
                    })
                }
                mailWorker.on('failed',(job,err)=>{
                     this.messageService.updateMessageStatus(job?.data.id, 'Failed');
                     logger.error(`job failed sending to ${job?.data.to}`)
                })
            }
            //send email logic here56]V%;5s0+.)mEpK
            res.status(200).json({message: 'emails sent successfully'});
        }catch(error){
            res.status(500).json({message: 'internal server error'});
        }
    }

    async getMessages(req:Request, res:Response){
        try{
            const messages = await this.messageService.getMessages();
            res.status(200).json({message: 'submitted successful', data: messages});
            return;
        }catch(err){
            res.status(500).json({message: 'something went wrong. Please try again'});
            return;
        }
    }
}
