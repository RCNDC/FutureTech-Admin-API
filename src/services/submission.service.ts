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

export class SubmissionService {
    constructor() { }

    async getNGOSubmissions() {
        const submissions = await db.$queryRawTyped(ngoSubmission());
        return CastBigIntFromJson(submissions)


    }

    async getNGOSubmissionsById(entry_id: bigint) {
        const submission = await db.$queryRawTyped(ngoSubmissionById(entry_id));
        return CastBigIntFromJson(submission);
    }

    async getLocalCompanySubmissions() {
        const submissions = await db.$queryRawTyped(localCompanySubmission());
        
        return CastBigIntFromJson(submissions)


    }
    async getLocalCompanySubmissionById(entry_id: bigint) {
        const submission = await db.$queryRawTyped(localCompanySubmissionById(entry_id));
        return CastBigIntFromJson(submission);
    }
    
    async getInternationalCompanySubmissions() {
        const submissions = await db.$queryRawTyped(internationalCompanySubmission());
        return CastBigIntFromJson(submissions)


    }
    async getInternationalCompanySubmission(entry_id: bigint) {
        const submission = await db.$queryRawTyped(internationalCompanySubmissionById(entry_id));
        return CastBigIntFromJson(submission)


    }
    async getEmabassySubmissions() {
        const submissions = await db.$queryRawTyped(embassySubmission());
        return CastBigIntFromJson(submissions)


    }
    async getEmabassySubmissionsById(entry_id: bigint) {
        const submission = await db.$queryRawTyped(embassySubmissionById(entry_id));
        return CastBigIntFromJson(submission)


    }
    async getStartupSubmissions() {
        const submissions = await db.$queryRawTyped(startupSubmission());
        return CastBigIntFromJson(submissions)


    }
    async getStartupSubmissionsById(entry_id:bigint) {
        const submissions = await db.$queryRawTyped(startupSubmissionById(entry_id));
        return CastBigIntFromJson(submissions)


    }
}