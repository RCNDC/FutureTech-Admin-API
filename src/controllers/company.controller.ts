import { Request, Response } from "express";
import { CompanyService } from "../services/company.service";
import logger from "../util/logger";

const ADMIN_ROLE = 3;
const LOCAL_SALES_ROLE = 25;
const INT_SALES_ROLE = 29;

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

            const roleId = Number(req.user?.role) || 0;
            if (![ADMIN_ROLE, LOCAL_SALES_ROLE, INT_SALES_ROLE].includes(roleId)) {
                return res.status(403).json({ message: "You are not allowed to create companies." });
            }
            if (roleId === LOCAL_SALES_ROLE && data.type !== "local") {
                return res.status(403).json({ message: "Local sales representatives can only create local companies." });
            }
            if (roleId === INT_SALES_ROLE && data.type !== "international") {
                return res.status(403).json({ message: "International sales representatives can only create international companies." });
            }

            const creatorId = req.user?.userId || "";
            const company = await this.companyService.createCompany(data, creatorId);
            res.status(201).json({ message: "Company created successfully", data: company });
        } catch (error: any) {
            logger.error(`Failed to create company: ${error.message}`, { stack: error.stack, error });
            const message = error instanceof Error ? error.message : "Failed to create company";
            let statusCode = 500;
            if (
                message.includes("required") ||
                message.includes("Invalid company type")
            ) {
                statusCode = 400;
            } else if (
                message.includes("already registered")
            ) {
                statusCode = 409;
            } else if (
                message.includes("can only create")
            ) {
                statusCode = 403;
            }

            res.status(statusCode).json({ message });
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
