import { Request, Response } from "express";
import { CompanyService } from "../services/company.service";
import logger from "../util/logger";

export class CompanyController {
    private companyService = new CompanyService();

    async create(req: Request, res: Response) {
        try {
            const data = req.body;
            // File upload handling would be here if using multer
            if (req.file) {
                data.uploadLicense = req.file.path;
            }

            const company = await this.companyService.createCompany(data);
            res.status(201).json({ message: "Company created successfully", data: company });
        } catch (error) {
            logger.error(error);
            res.status(400).json({ message: "Failed to create company", error: (error as Error).message });
        }
    }

    async getByType(req: Request, res: Response) {
        try {
            const { type } = req.query;
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
