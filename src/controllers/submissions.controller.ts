import { Request, Response } from "express";
import { SubmissionService } from "../services/submission.service";

export class SubmissionsController {

    private submissionService: SubmissionService;
    constructor() {
        this.submissionService = new SubmissionService();
    }

    async getNGOSubmissions(req: Request, res: Response) {

        const submissions = await this.submissionService.getNGOSubmissions();
        res.status(200).json({ message: 'Submission fetched', data: submissions });
    }
    
    
    async getNGOSubmissionById(req: Request, res: Response) {
        const { id } = req.params;
        if (id) {
            const submission = await this.submissionService.getNGOSubmissionsById(BigInt(id as string));
            res.status(200).json({ message: 'fetched successful', data: submission });
            return;
        }
        res.status(400).json({ message: 'missing ID' });

    }
    
    
    async getLocalCompanySubmissions(req: Request, res: Response) {

        const submissions = await this.submissionService.getLocalCompanySubmissions();
        res.status(200).json({ message: 'Submission fetched', data: submissions });
    }
    
    
    async getLocalCompanySubmissionById(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: 'missing Id' });
            return;
        }
        const submission = await this.submissionService.getLocalCompanySubmissionById(BigInt(id));
        res.status(200).json({ message: 'Submission fetched', data: submission });
    }
    
    
    async getEmbassySubmissions(req: Request, res: Response) {

        const submissions = await this.submissionService.getEmabassySubmissions();
        res.status(200).json({ message: 'Submission fetched', data: submissions });
    }
    
    
    async getEmbassySubmissionsById(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: 'missing Id' });
            return;
        }
        const submission = await this.submissionService.getEmabassySubmissionsById(BigInt(id));
        res.status(200).json({ message: 'Submission fetched', data: submission });
    }


    async getInternationalCompanySubmissions(req: Request, res: Response) {

        const submissions = await this.submissionService.getInternationalCompanySubmissions();
        res.status(200).json({ message: 'Submission fetched', data: submissions });
    }
    
    
    async getInternationalCompanySubmissionById(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: 'missing Id' });
            return;
        }
        const submission = await this.submissionService.getInternationalCompanySubmission(BigInt(id));
        res.status(200).json({ message: 'Submission fetched', data: submission });
    }


    async getStartupSubmissions(req: Request, res: Response) {

        const submissions = await this.submissionService.getStartupSubmissions();
        res.status(200).json({ message: 'Submission fetched', data: submissions });
    }


    async getStartupSubmissionsById(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: 'missing Id' });
            return;
        }
        const submissions = await this.submissionService.getStartupSubmissionsById(BigInt(id));
        res.status(200).json({ message: 'Submission fetched', data: submissions });
    }
}