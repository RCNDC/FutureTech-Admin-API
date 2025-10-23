import { NextFunction, Request, Response } from "express";


export const localCompanyFileHandler = (req:Request, res:Response, next:NextFunction)=>{
    if(!req.file){
        res.status(400).json({message: 'File Not Uploaded'});
        return;
    }

    
}