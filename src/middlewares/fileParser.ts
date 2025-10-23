import { NextFunction, Request, Response } from "express";
import { FileService } from "../services/file.service";
import * as fs from 'fs';
import logger from "../util/logger";

const fileService = new FileService();
export const fileParser = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
        res.status(400).json({ message: 'File not provided' });
        return;
    }
    const mimeType = req.file.mimetype;
    const file = req.file;
    const filePath = `${file.destination}${file.filename}`;

    const parser = (data:any[], error:Error | undefined | unknown)=>{
        if (!error) {
                req.body = { ...req.body, fileData: data };
                fs.rm(filePath,(err)=>{
                    if(err){
                        logger.error(`unable to remove file ${filePath} ${err.message}`)
                        
                    }
                });
                next();
        }
    }


    if (mimeType === 'text/csv') {
        fileService.readCsvFile(filePath, parser)
    } else if (mimeType === 'application/vnd.ms-excel' || mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        const file = req.file;
        const filePath = `${file.destination}${file.filename}`;
        fileService.readExcelFile(filePath, parser)
    } else {
        res.status(400).json({ message: 'unsupported file' });
        return;
    }
   
    // res.status(400).json({message: 'something went wrong. please try again'})
}