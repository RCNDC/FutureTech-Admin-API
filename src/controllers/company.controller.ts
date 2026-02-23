import { Request, Response } from "express";
import { CompanyService } from "../services/company.service";
import logger from "../util/logger";

export class CompanyController {
    private companyService = new CompanyService();

    async create(req: Request, res: Response) {
        try {
            const data = { ...req.body };
            // Attach the uploaded file path if provided
            if (req.file) {
                data.uploadLicense = req.file.path;
            }

            if (!data.type) {
                return res.status(400).json({ message: "Company type ('local' or 'international') is required." });
            }

            const creatorId = req.user?.userId || "";
            const company = await this.companyService.createCompany(data, creatorId);
            res.status(201).json({ message: "Company created successfully", data: company });
        } catch (error: any) {
            logger.error(`Failed to create company: ${error.message}`, { stack: error.stack, error });
            res.status(500).json({
                message: "Failed to create company",
                error: error.message,
                details: error.stack
            });
        }
    }

    async getByType(req: Request, res: Response) {
        try {
            const { type } = req.query;
            if (!type) {
                return res.status(400).json({ message: "Query param 'type' is required." });
            }
            const companies = await this.companyService.getCompaniesByType(type as string);
            res.status(200).json({ data: companies });
        } catch (error) {
            logger.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const company = await this.companyService.getCompanyById(parseInt(id));
            if (!company) {
                return res.status(404).json({ message: "Company not found" });
            }
            res.status(200).json({ data: company });
        } catch (error) {
            logger.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
