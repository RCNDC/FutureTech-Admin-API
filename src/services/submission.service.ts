import { ngoSubmission, 
    localCompanySubmission, 
    embassySubmission, 
    internationalCompanySubmission, 
    startupSubmission, 
    ngoSubmissionById, 
    localCompanySubmissionById,
    internationalCompanySubmissionById,
    embassySubmissionById,
    startupSubmissionById
} from '@prisma/client/sql'

import { db } from "../util/db";
import { CastBigIntFromJson } from '../util/parsejson';
import logger from '../util/logger';

export class SubmissionService {
    constructor() { }

    async getNGOSubmissions() {
        try{
            const submissions = await db.$queryRawTyped(ngoSubmission());
            return CastBigIntFromJson(submissions)

        }catch(err){
            logger.error(err+'');
        }


    }

    async getNGOSubmissionsById(entry_id: bigint) {
        try{
            const submission = await db.$queryRawTyped(ngoSubmissionById(entry_id));
            return CastBigIntFromJson(submission);

        }catch(err){
            logger.error(err+'');
        }
    }

    async getLocalCompanySubmissions() {
        try{
            const submissions = await db.$queryRawTyped(localCompanySubmission());
            return CastBigIntFromJson(submissions)

        }catch(err){
            logger.error(err+'');
        }


    }
    async getLocalCompanySubmissionById(entry_id: bigint) {
        try{
            const submission = await db.$queryRawTyped(localCompanySubmissionById(entry_id));
            return CastBigIntFromJson(submission);

        }catch(err){
            logger.error(err+'');
        }
    }
    
    async getInternationalCompanySubmissions() {
        try{
            const submissions = await db.$queryRawTyped(internationalCompanySubmission());
            return CastBigIntFromJson(submissions)

        }catch(err){
            logger.error(err+'');
        }


    }
    async getInternationalCompanySubmission(entry_id: bigint) {
        try{
            const submission = await db.$queryRawTyped(internationalCompanySubmissionById(entry_id));
            return CastBigIntFromJson(submission)

        }catch(err){
            logger.error(err+'');
        }


    }
    async getEmabassySubmissions() {
        try{
            const submissions = await db.$queryRawTyped(embassySubmission());
            return CastBigIntFromJson(submissions)

        }catch(err){
            logger.error(err+'');
        }


    }
    async getEmabassySubmissionsById(entry_id: bigint) {
        try{
            const submission = await db.$queryRawTyped(embassySubmissionById(entry_id));
            return CastBigIntFromJson(submission)

        }catch(err){
            logger.error(err+'');
        }


    }
    async getStartupSubmissions() {
        try{
            const submissions = await db.$queryRawTyped(startupSubmission());
            return CastBigIntFromJson(submissions)

        }catch(err){
            logger.error(err+'');
        }


    }
    async getStartupSubmissionsById(entry_id:bigint) {
        try{
            const submissions = await db.$queryRawTyped(startupSubmissionById(entry_id));
            return CastBigIntFromJson(submissions)

        }catch(err){
            logger.error(err+'');
        }


    }
}