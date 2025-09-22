import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { FollowUpHistoryDto } from "../types/followup";
import { db } from "../util/db";
import { generateId } from "../util/generateId";
import logger from "../util/logger";

export class FollowUpHistoryService{
    constructor(){}
    async createHistoryEntry(history:FollowUpHistoryDto){
        const newHistory = await db.followuphistory.create({
            data:{
                editedBy: history.editedBy,
                id: await generateId(),
                followupId: history.followUpId,
                status: history.status
            }
        });
        return newHistory;
    }

    
}