import { NextFunction, Request, Response } from "express";
import { PartnersController } from "../controllers/partners.controller";
import logger from "../util/logger";


const partnersController = new PartnersController();
export const partnerFileHandler = (req:Request, res:Response, next:NextFunction)=>{
    if(!req.file){
        res.status(400).json({message: 'File Not Uploaded'});
        return;
    }
    const mimeType = req.file.mimetype;
    if(mimeType === 'text/csv'){
        try{
            partnersController.uploadPartnersCSV(req, res);
        }catch(error){
            logger.error(error)
            res.status(500).json({message:'Something went wrong. Please try again!'})
        }
    }else if(mimeType === 'application/vnd.ms-excel' || mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
        try{
            partnersController.uploadPartnersExcel(req, res);
        }catch(error){
             logger.error(error)
                res.status(500).json({message:'Something went wrong. Please try again!'})
        }

    }else{
        res.status(400).json({message: 'Unsupported file'});
    }
}

