import * as fs from 'fs';
import csvParser, { CsvParser } from "csv-parser";

import { Request, Response } from "express";
import logger from '../util/logger';
import { PartnerService } from '../services/partner.service';
import { partners } from '@prisma/client';
import { generateId } from '../util/generateId';
import { FileService } from '../services/file.service';

export class PartnersController {
    private partnerService;
    private fileService;
    constructor() { 
        this.partnerService = new PartnerService();
        this.fileService = new FileService()
    }

    async uploadPartnersCSV(req: Request, res: Response) {
        if (!req.file) {
            res.status(400).json({ message: 'File Not Uploaded' });
            return;
        }

        // res.status(200).json({ message: 'File uploaded successful' })
        const file = req.file;
        const filePath = `${file.destination}${file.filename}`;
        this.fileService.readCsvFile(filePath, (result)=>{
            console.log(result[0]);
            if(!result[0]['company name'] || !result[0]['company email'] || !result[0]['phone number'] || !result[0]['interest']){
                res.status(400).json({message: 'Invaild file'})
                fs.rm(filePath,(err)=>{
                    if(err){
                        logger.error(`unable to remove file ${filePath} ${err.message}`)
                    }
                })
                return;
            }
            result.forEach(async(element) => {
                try{
                    const partnerDto:partners = {
                        id: await generateId(),
                        companyName: String(element['company name']).trim(),
                        email: String(element['company email']).trim(),
                        phoneNo: String(element['phone number']).trim(),
                        interest: String(element['interest']).trim(),
                        license: String(element['license']).trim(),
                        createdDate: new Date(),
                        updateDate: new Date(),
                        fullName: element['name'] || ''
                    }
                    
                     await this.partnerService.createPartner(partnerDto);
                }catch(err){
                    logger.error(err)
                    res.status(500).json({message: 'something went wrong'})
                    return
                }
                 
            });
        })
        logger.info(filePath)
        
        res.status(200).json({message:'file uploaded'})

    }

    async uploadPartnersExcel(req:Request, res:Response){
        if(!req.file){
            res.status(400).json({message: 'File Not uploaded'});
            return;
        }
        const file = req.file;
        const filePath = `${file.destination}${file.filename}`;
        this.fileService.readExcelFile(filePath, (result, err)=>{
            if(err){
                logger.error(''+err);
                res.status(500).json({message: 'something went wrong. Please try again'});
                return;
            }
            if(!result[0]['company name'] || !result[0]['company email'] || !result[0]['phone number'] || !result[0]['interset Area'] || !result[0]['name']){
                res.status(400).json({message: 'Invaild file'})
                fs.rm(filePath,(err)=>{
                    if(err){
                        logger.error(`unable to remove file ${filePath} ${err.message}`)
                    }
                })
                return;
            }
            result.forEach(async(element) => {
                try{
                    const partnerDto:partners = {
                        id: await generateId(),
                        companyName: element['company name'],
                        email: element['company email'],
                        phoneNo: element['phone number'],
                        interest: element['interset area'],
                        license: element['license'],
                        createdDate: new Date(),
                        updateDate: new Date(),
                        fullName: element['name']
                    }
                    
                     await this.partnerService.createPartner(partnerDto);
                }catch(err){
                    logger.error(err);
                    return
                }
                 
            });
        })
        res.status(200).json({message:'file imported successful'});

    }

    async getAllPartners(req:Request, res: Response){
        const partners = await this.partnerService.getAllPartners();
        if(!partners){
            res.status(200).json({message: 'no partners found', data:[]});
            return;
        }
        res.status(200).json({message: 'fetched successful', data:partners});
    }
}