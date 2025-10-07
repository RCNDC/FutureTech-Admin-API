import type { partners } from "@prisma/client";
import { db } from "../util/config/db";
import logger from "../util/logger";

export class PartnerService {
    constructor() { }

    async createPartner(partnerDto: partners) {
        try {
            const partner = await db.partners.findFirst({
                where: {
                    AND: [
                        {
                            email: partnerDto.email,
                        },
                        {
                            companyName: partnerDto.companyName
                        }

                    ],

                }
            });

            if(partner){
                return partner;
            }

            const newPartner = await db.partners.create({
                data: partnerDto,
            });

            return newPartner;

        }catch(err){
            logger.error(err+' partner service');
            throw err;
        }
    }

    async getAllPartners(){
        try{
            const partners = await db.partners.findMany();
            return partners;
        }catch(error){
            logger.error(error);
        }
    }

    
}