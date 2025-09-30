import { Job, Queue, Worker } from "bullmq";
import redis from "../util/config/redis";
import { MailService } from "../services/mail.service";
import { MailOptions } from "../types/mail";
import fs from 'fs/promises';

const mailQueue = new Queue("mailQueue", {
    connection: redis, 
});

export const addToMailQueue = async(data:MailOptions)=>{
    await mailQueue.add("sendMail", data);
}
const mailService = new MailService();

export const mailWorker = new Worker("mailQueue", async(job:Job)=>{
    if(job.name === "sendMail"){
        await mailService.sendMail(job.data.to, job.data.subject, job.data.body, job.data?.html, job.data?.attachments);
        //send mail logic here
        console.log("Sending mail to: ", job.data.to);
        //simulate mail sending delay
        await new Promise((resolve)=>setTimeout(resolve, 2000));
        console.log("Mail sent to: ", job.data.to);
    }
},{
    connection: redis,
});

mailWorker.on("completed", (job)=>{
    console.log(`Job ${job.id} completed`);
    fs.rm(job.data.attachments[0].filename, { maxRetries: 3 });
    console.log(job.data)
});

mailWorker.on("failed", (job, err)=>{
    console.log(`Job ${job?.id} failed with error ${err.message}`);
});

mailWorker.on("error", (err)=>{
    console.log(`Worker error: ${err.message}`);
});