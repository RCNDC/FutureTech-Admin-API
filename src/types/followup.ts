export type FollowUpDto={
    
    entry_id:number;
    
}

export type FollowUpHistoryDto={
    followUpId:string;
    editedBy:string;
    status: 'Closed' | 'Created' | 'Open'
}