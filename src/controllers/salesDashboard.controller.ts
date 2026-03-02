import { Request, Response } from "express";
import { SalesDashboardService } from "../services/salesDashboard.service";
import logger from "../util/logger";

const ADMIN_ROLE = 3;
const LOCAL_SALES_ROLE = 25;
const INT_SALES_ROLE = 29;

export class SalesDashboardController {
    private salesService: SalesDashboardService;

    constructor() {
        this.salesService = new SalesDashboardService();
    }

    /** GET /sales-dashboard/getAllSales
     *  Admin   → sees all sales records (filterable by query)
     *  Sales   → sees only their own record
     */
    async getAllSales(req: Request, res: Response) {
        try {
            const { query } = req.query;
            const userId = req.user?.userId || "";
            const roleId = Number(req.user?.role) || 0;
            logger.info("Fetching sales", { userId, roleId });
            const sales = await this.salesService.getAllSales(userId, roleId, query as string);
            res.status(200).json({ message: "Fetched successfully", data: sales });
        } catch (error) {
            logger.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    /** POST /sales-dashboard/createSales  — Admin only */
    async createSales(req: Request, res: Response) {
        try {
            const roleId = Number(req.user?.role) || 0;
            if (roleId !== ADMIN_ROLE) {
                return res.status(403).json({ message: "Only administrators can create sales accounts." });
            }
            const creatorId = req.user?.userId || "";
            const newSales = await this.salesService.createSales(req.body, creatorId);
            res.status(201).json({ message: "Sales representative created successfully", data: newSales });
        } catch (error) {
            logger.error(error);
            res.status(400).json({ message: (error as Error).message });
        }
    }

    /** PATCH /sales-dashboard/update/:id  — Admin only */
    async updateSales(req: Request, res: Response) {
        try {
            const roleId = Number(req.user?.role) || 0;
            if (roleId !== ADMIN_ROLE) {
                return res.status(403).json({ message: "Only administrators can update sales accounts." });
            }
            const { id } = req.params;
            const updatedSales = await this.salesService.updateSales(Number(id), req.body);
            res.status(200).json({ message: "Sales representative updated successfully", data: updatedSales });
        } catch (error) {
            logger.error(error);
            res.status(400).json({ message: (error as Error).message });
        }
    }

    /** DELETE /sales-dashboard/delete/:id  — Admin only.
     *  Soft-deletes the account (sets isActive=false, scrambles password).
     *  All profile data and registered companies remain visible to admins.
     */
    async deleteSales(req: Request, res: Response) {
        try {
            const roleId = Number(req.user?.role) || 0;
            if (roleId !== ADMIN_ROLE) {
                return res.status(403).json({
                    message: "Only administrators can deactivate sales accounts. If you wish to leave, use the self-deactivation option.",
                });
            }
            const { id } = req.params;
            const result = await this.salesService.adminDeactivateSales(Number(id));
            res.status(200).json({ message: "Sales account deactivated successfully", data: result });
        } catch (error) {
            logger.error(error);
            res.status(400).json({ message: (error as Error).message });
        }
    }

    /** PATCH /sales-dashboard/reactivate/:id — Admin only */
    async reactivateSales(req: Request, res: Response) {
        try {
            const roleId = Number(req.user?.role) || 0;
            if (roleId !== ADMIN_ROLE) {
                return res.status(403).json({ message: "Only administrators can reactivate accounts." });
            }
            const { id } = req.params;
            const result = await this.salesService.reactivateSales(Number(id));
            res.status(200).json({ message: "Sales account reactivated successfully", data: result });
        } catch (error) {
            logger.error(error);
            res.status(400).json({ message: (error as Error).message });
        }
    }

    /** DELETE /sales-dashboard/hard-delete/:id — Admin only */
    async hardDeleteSales(req: Request, res: Response) {
        try {
            const roleId = Number(req.user?.role) || 0;
            if (roleId !== ADMIN_ROLE) {
                return res.status(403).json({ message: "Only administrators can permanently delete accounts." });
            }
            const { id } = req.params;
            const result = await this.salesService.hardDeleteSales(Number(id));
            res.status(200).json({ message: "Sales account permanently deleted", data: result });
        } catch (error) {
            logger.error(error);
            res.status(400).json({ message: (error as Error).message });
        }
    }

    /** DELETE /sales-dashboard/leave
     *  A sales person can close their OWN account.
     *  The record (and all registered companies) is preserved for admins.
     *  The password is scrambled so they can no longer log in.
     */
    async selfDeactivate(req: Request, res: Response) {
        try {
            const roleId = Number(req.user?.role) || 0;
            const userId = req.user?.userId || "";

            // Only sales roles can use this endpoint
            if (roleId !== LOCAL_SALES_ROLE && roleId !== INT_SALES_ROLE) {
                return res.status(403).json({ message: "This action is only available to sales representatives." });
            }

            const salesId = Number(userId);
            if (isNaN(salesId)) {
                return res.status(400).json({ message: "Invalid account identifier." });
            }

            await this.salesService.selfDeactivate(salesId);
            res.status(200).json({
                message: "Your account has been deactivated. Your registered companies and profile are preserved for the admin records.",
            });
        } catch (error) {
            logger.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}
