import { Request } from "express";

export const getPaginationParams = (req:Request)=>{
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    if(page <= 0 || limit <= 0){
        throw new Error("Page and limit must be positive integer");
    }
    return {page, limit};
}