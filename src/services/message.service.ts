import { Message } from "../types/message";
import { db } from "../util/config/db";
import { generateId } from "../util/generateId";
import logger from "../util/logger";

export class MessageService{
    constructor(){}

    async sendMessage(message:Message){
        //logic to send message
        try{
            await db.messages.create({
                data:{
                    ...message,
                    id: await generateId(),
                }
            });
            return true;
        }catch(error){
            logger.error(error+' message service');
            return false;
        }
    }
}