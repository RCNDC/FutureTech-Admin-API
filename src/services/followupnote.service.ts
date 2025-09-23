import { followupnotes } from "@prisma/client";
import { FollowUpNoteDto, FollowUpNoteUpdateDto } from "../types/followup";
import { db } from "../util/db";
import { generateId } from "../util/generateId";
import logger from "../util/logger";

export class FollowUpNoteService{
    constructor(){}

        async create(followupNoteDto:FollowUpNoteDto){
        if(!followupNoteDto){
            throw new Error('missing values');
        }
        try{
           
            const newNote = await db.followupnotes.create({
                data:{
                    description: followupNoteDto.description,
                    followUpDate: new Date(followupNoteDto.followUpDate),
                    followUpId: followupNoteDto.followUpId,
                    Id: await generateId(),
                    title: followupNoteDto.title,
                    isCompleted: 0,
                }
            });
             
            return newNote;
        }catch(err){
            logger.error(err +'');
            if(err instanceof Error){
                throw err;
            }
        }
    }

    async getNotes(followUpId:string){
        if(!followUpId){
            throw new Error('missing value');
        }
        try{
            const notes = db.followupnotes.findMany({
                where:{
                    followUpId: followUpId
                }
            });
            return notes;
        }catch(err){
            logger.error(err)
        }
    }

    async deleteNote(followUpNoteId: string){
        if(!followUpNoteId){
            throw new Error('missing values');
        }
        try{
            await db.followupnotes.delete({
                where:{
                    Id: followUpNoteId
                }
            });
            return true;
        }catch(err){
            logger.error(err);
            if(err instanceof Error){
                throw err;
            }
        }
    }

    async updateNoteStatus(id:string, isCompleted: number){
        if(!id){
            throw new Error('mission value');
        }
        try{
            const note = await db.followupnotes.findFirst({
                where:{
                    Id: id
                }
            });
            if(!note) throw new Error("note not found");
            note.isCompleted = isCompleted;
            console.log(note);
            const updatedNote = await db.followupnotes.update({
                where:{
                    Id: note.Id,
                },
                data:note
            });
            return updatedNote;
        }catch(err){
            logger.error(err);
            if(err instanceof Error){
                throw err;
            }
        }
    }
}