import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { FollowUpDto } from "../types/followup";
import { db } from "../util/db";
import { generateId } from "../util/generateId";
import logger from "../util/logger";
import { FollowUpHistoryService } from "./followupHistory.service";

export class FollowUpService{
    
    constructor(){
    }

    async createFollowup(followupDto:FollowUpDto){
        
        try{
            const followUp = await db.followup.findFirst({
                where:{
                    entry_id: typeof followupDto.entry_id === 'string'?parseInt(followupDto.entry_id): followupDto.entry_id 
                }
            });
            if(followUp){
                return followUp;
            }
            console.log(typeof followupDto.entry_id)
            const newFollowUp = await db.followup.create({
                data: {
                    entry_id: typeof followupDto.entry_id === 'string'?parseInt(followupDto.entry_id): followupDto.entry_id,
                    id: await generateId(),
                    status:'NotStarted'
                }
            });
            
            
            return newFollowUp;
        }catch(err){
            console.log(err)
            logger.error(err + '');
            if(err instanceof PrismaClientValidationError){
                throw new Error('Missing values');
            }

        }
    }
    async getFollowUpByEntry(entry_id: number){
        if(!entry_id){
            throw new Error('missing entry id');
        }
        try{
            const followup = await db.followup.findFirst({
                where:{
                    entry_id: entry_id
                }
            });
            return followup;
        }catch(error){
            if(error instanceof PrismaClientValidationError){
                logger.error(error);
            }
        }

    }
    
}