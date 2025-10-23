import { Request, Response } from "express";
import { FollowUpNoteService } from "../services/followupnote.service";

export class FollowNoteController{
    private followNoteService;
    constructor(){
        this.followNoteService = new FollowUpNoteService();
    }

    async createNote(req:Request, res:Response){
        const note = req.body;
        if(!note){
            res.status(400).json({message: 'missing values'});
            return;
        }
        try{
            const newNote = await this.followNoteService.create(note);
            res.status(200).json({message:'Note create successfully', data: newNote});
            return;
        }catch(err){
            res.status(400).json({message: err});
            return;
        }
    }

    async updateNote(req:Request, res:Response){
        const body = req.body;
        const {id} = req.params;
        if(!id){
            res.status(400).json({message: 'missing values'});
            return;
        }
        try{
            const updatedNote = await this.followNoteService.updateNoteStatus(id, body.isCompleted);
            res.status(200).json({message: 'note updated', data: updatedNote});
            return;
        }catch(err){
            res.status(400).json({message: err});
            return;
        }
    }

    async getNotes(req:Request, res:Response){
        const {followUpId} = req.params;
        if(!followUpId){
            res.status(400).json({message: 'missing values'});
            return;
        }
        try{
            const notes = await this.followNoteService.getNotes(followUpId);
           
            res.status(200).json({message: 'fetched successful', data: notes});
            return;

        }catch(err){
            res.status(500).json({message:'something went wrong. Please try again!'});
        }
    }

    async deleteNote(req:Request<{followUpNoteId:string}>, res:Response){
        const id = req.params.followUpNoteId;
        if(!id){
            res.status(400).json({message:'missing values'});
            return;
        }
        try{
            const deleted = await this.followNoteService.deleteNote(id);
            if(deleted){
                res.status(200).json({message:'deleted successful'});
                return;
            }else{
                res.status(200).json({message:'could not delete note'});
                return
            }
        }catch(err){
            res.status(500).json({message:err});
        }
    }

}