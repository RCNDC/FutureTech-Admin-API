import { LocalCompanyDTO } from "../types/submissions";
import { db } from "../util/config/db";
import { generateId } from "../util/generateId";
import logger from "../util/logger";


export class LocalCompanyService{
    constructor(){}

    async createLocalCompany(localCompanyDto: LocalCompanyDTO){
        if(!localCompanyDto){
            throw new Error('missing value');
        }
        try{
            
            const newLocalCompany = await db.localcompany.create({
                data:{
                    ...localCompanyDto,
                    id: await generateId()
                }
            });
            return newLocalCompany;
        }catch(err){
            logger.error(err+'');
        }
    }

    async getLocalCompanies(){
        try{
            const localCompanies = await db.localcompany.findMany();
            return localCompanies;
        }catch(err){
            logger.error(err+'');
        }
    }

    async getLocalCompanyById(id:string){
        if(!id){
            throw new Error('id required');
        }
        try{
            const localCompany = await db.localcompany.findUnique({
                where:{
                    id: id
                }
            });
            return localCompany;
        }catch(err){
            logger.error(err+'');
        }
    }

    async updateLocalCompany(){
        
    }
}