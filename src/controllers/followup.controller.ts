import { Request, Response } from "express";
import { FollowUpDto } from "../types/followup";
import logger from "../util/logger";
import { PrismaClientInitializationError } from "@prisma/client/runtime/library";
import { FollowUpService } from "../services/followup.service";
import { FollowUpHistoryService } from "../services/followupHistory.service";

export class FollowUpController{
    private followUpService;
    private followUpHistoryService;
    constructor(){
        this.followUpService = new FollowUpService();
        this.followUpHistoryService = new FollowUpHistoryService();
    }

    async createFollowUp(req:Request, res:Response){
        const followUpDto:FollowUpDto = req.body;
        if(!followUpDto){
            res.status(400).json({message: 'missing values'});
            return;
        }
        try{
            const followup = await this.followUpService.createFollowup(followUpDto);
            if(followup){
                this.followUpHistoryService.createHistoryEntry({editedBy: req.user?.userId || '', followUpId:followup?.id, status:"Created"})
            }
            res.status(200).json({message:'followup created successfully', data: followup});
            return;
        }catch(err){
            logger.error(err+' error occured on followup');
            if(err instanceof PrismaClientInitializationError){
                res.status(500).json({message:'network error'});
                return;
            };
            res.status(500).json({message:'something went wrong. Please contact admin!'});

        }

    }

    async getFollowUpByEntryId(req:Request, res:Response){
        const {entry_id} = req.query;
        if(!entry_id){
            res.status(400).json({message: 'missing entry id'});
        }
        try{
            const followup = await this.followUpService.getFollowUpByEntry(parseInt(entry_id as string));
            res.status(200).json({message: 'fetched successful', data: followup});
            return;
        } catch(err){
            logger.error(err+ ' when getting followups');
            if(err instanceof PrismaClientInitializationError){
                res.status(500).json({message: 'network error'});
                return;
            }
            if(err instanceof Error){
                res.status(500).json({message: 'something went wrong. please try again!'});

            }
        }
    }

    async updateFollowStatus(req:Request, res:Response){
        const followUp = req.body;
        if(!followUp){
            res.status(400).json({message: 'missing values'});
            return;
        }
        console.log(followUp)
        followUp.editedBy = req.user?.userId;
        try{
            const updateFollowUp = await this.followUpService.updateFollowupStatus(followUp);
            res.status(200).json({message: 'updated successfully', data: updateFollowUp});
            return;
        }catch(error){
            logger.error(error);
            if(error instanceof Error){
                res.status(400).json({message: error.message});
                return;
            }
            res.status(500).json({message: 'something went wrong. Please try again'});
            return;
        }


    }

      
}