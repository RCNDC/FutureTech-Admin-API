import { messages_status } from "@prisma/client";
import { Message } from "../types/message";
import { db } from "../util/config/db";
import { generateId } from "../util/generateId";
import logger from "../util/logger";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class MessageService{
    constructor(){}

    async sendMessage(message:Message){
        //logic to send message
        try{
            const newMessage = await db.messages.create({
                data:{
                    ...message,
                    id: await generateId(),
                }
            });
            return newMessage;
        }catch(error){
            logger.error(error+' message service');
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code === 'P1001'){
                    throw new Error('Something went wrong. Please try again later')
                }
            }
            return;
        }
    }
    async getMessages(){
        try{
            const messages = await db.messages.findMany();
            return messages;
        }catch(err){
            logger.error(err);
            throw err;
        }
    }

    async updateMessageStatus(id:string, status:messages_status){
        try{
            const message = await db.messages.findFirst({
                where:{
                    id: id
                }
            });
            if(message){

                const updatedMessages = await db.messages.update({
                    where:{
                        id: message.id
                    },
                    data:{
                        ...message,
                        status: status
                    }
                });
                return updatedMessages;
            }
            
            
        }catch(error){
            logger.error(error);
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code === 'P2025'){
                    throw error.message
                }
            }
            throw new Error('something went wrong. Please try again');
        }
    }
}