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
        const { fileData } = req.body;
        if (!fileData[0]['company name'] || !fileData[0]['company email'] || !fileData[0]['phone number'] || !fileData[0]['interest']) {
            res.status(400).json({ message: 'Invaild file' })
            return;
        }
        fileData.forEach(async (element: any) => {
            try {
                const partnerDto: partners = {
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
            } catch (err) {
                logger.error(err)
                res.status(500).json({ message: 'something went wrong' })
                return
            }

        });
        res.status(200).json({ message: 'file uploaded' })

    }

    async getAllPartners(req: Request, res: Response) {
        const partners = await this.partnerService.getAllPartners();
        if (!partners) {
            res.status(200).json({ message: 'no partners found', data: [] });
            return;
        }
        res.status(200).json({ message: 'fetched successful', data: partners });
    }
}