import { Job, Queue, Worker } from "bullmq";
import redis from "../util/config/redis";
import { MailService } from "../services/mail.service";
import { MailOptions } from "../types/mail";
import logger from "../util/logger";

const mailQueue = new Queue("mailQueue", {
    connection: redis, 
});

export const addToMailQueue = async(data:MailOptions)=>{
    await mailQueue.add("sendMail", data);
}
const mailService = new MailService();

export const mailWorker = new Worker("mailQueue", async(job:Job)=>{
    if(job.name === "sendMail"){
        const sent = await mailService.sendMail(job.data.to, job.data.subject, job.data.body, job.data?.html, job.data?.attachments);
        //send mail logic here
        logger.info(`message sent to ${job.data.to}`)
        //simulate mail sending delay
        return sent;
        
    }
},{
    connection: redis,
});

mailWorker.on("completed", (job)=>{
    
    logger.info(`Job ${job.id} completed`);
    
    
});

mailWorker.on("failed", (job, err)=>{
    logger.warn(`Job ${job?.id} failed with error ${err.message}`);
});

mailWorker.on("error", (err)=>{
    logger.error(`Worker error: ${err.message}`);
});