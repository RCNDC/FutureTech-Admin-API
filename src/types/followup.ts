import { type followup_status } from "@prisma/client";

export type FollowUpDto={
    
    entry_id:number;
    
}

export type FollowUpHistoryDto={
    followUpId:string;
    editedBy:string;
    status: 'Closed' | 'Created' | 'Open'
}

export type FollowUpStatusUpdateDto = {
    followUpId:string;
    editedBy:string;
    status: followup_status
}

export type FollowUpNoteDto = {
    title: string;
    description: string;
    followUpId: string;
    followUpDate: string;
}

export type FollowUpNoteParam = {
    followUpNoteId:string;
}

export type FollowUpNoteUpdateDto = {
    id:string;
    isCompleted: number; 
}